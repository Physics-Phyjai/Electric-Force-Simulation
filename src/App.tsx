import { MouseEvent, useEffect, useLayoutEffect, useState } from "react";
import Button from "./components/Button";
import ChargeCard from "./components/ChargeCard";
import { renderChargeInfo } from "./components/ChargeInfo";
import { findForce } from "./functionality/force";
import { drawCharge, drawGrid, isOnCharge } from "./functionality/graph";
import style from "./style/App.module.css";
import { CanvasSize, Position } from "./type/canvas";
import { Charge } from "./type/charge";
import { Force } from "./type/force";
import { to2Decimal, toPointFive } from "./utils/convert";
function App() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const [chargeList, setChargeList] = useState<Array<Charge>>([]);
  const [chargeForceList, setChargeForceList] = useState<Array<Charge>>([]);
  const [isDragging, setIsDragging] = useState<boolean>();
  const [dragChargeIndex, setDragChargeIndex] = useState<number | null>();
  const [mousePosition, setMousePosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [currentPosition, setCurrentPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [canvasOffset, setCanvasOffset] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [canvasCTX, setCanvasCTX] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setChargeList([
      new Charge("Charge 1", 2, 2, 0, "#FF0000", new Force(0, 0, 0)),
    ]);
    const canvas = initializeCanvas();
    const ctx = canvas.getContext("2d");
    ctx?.translate(0.5, 0.5);
    setCanvasCTX(ctx);
  }, []);

  useEffect(() => {
    initializeCanvas();
  }, [size]);

  useEffect(() => {
    setChargeForceList(findForce(chargeList));
  }, [chargeList]);

  useEffect(() => {
    if (canvasCTX) {
      canvasCTX.moveTo(0, 0);
      canvasCTX.clearRect(0, 0, canvasSize.width, canvasSize.height);
      if (currentPosition.x < 0) {
        setCurrentPosition({ x: 0, y: currentPosition.y });
        return;
      }
      if (currentPosition.y < 0) {
        setCurrentPosition({ x: currentPosition.x, y: 0 });
        return;
      }
      if (currentPosition.x > 5075 - canvasSize.width) {
        setCurrentPosition({
          x: 5075 - canvasSize.width,
          y: currentPosition.y,
        });
        return;
      }
      if (currentPosition.y > 5075 - canvasSize.height) {
        setCurrentPosition({
          x: currentPosition.x,
          y: 5075 - canvasSize.height,
        });
        return;
      }
      drawGrid(
        canvasCTX,
        canvasSize,
        101 - Math.floor(currentPosition.x / 25),
        101 - Math.floor(currentPosition.y / 25)
      );
      chargeForceList.forEach((charge) => {
        drawCharge(canvasCTX, currentPosition, charge);
      });
    }
  }, [chargeForceList, currentPosition.x, currentPosition.y]);

  const initializeCanvas = (): HTMLCanvasElement => {
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const parent = canvas.parentElement;
    canvas.width = parent?.offsetWidth ?? 1000;
    canvas.height = parent?.offsetHeight ?? 1000;
    setCanvasSize({ width: canvas.width, height: canvas.height });
    setCanvasOffset({ x: parent?.offsetLeft ?? 0, y: parent?.offsetTop ?? 0 });
    setCurrentPosition({
      x: 2550 - canvas.width / 2,
      y: 2550 - canvas.height / 2,
    });
    return canvas;
  };

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setCurrentPosition({
        x: currentPosition.x - (event.clientX - mousePosition.x),
        y: currentPosition.y - (event.clientY - mousePosition.y),
      });
      setMousePosition({ x: event.clientX, y: event.clientY });
    } else if (dragChargeIndex != null) {
      const newChargeList = [...chargeList];
      const xPosition = to2Decimal(
        (event.clientX - canvasOffset.x) / 25 +
          Math.floor(currentPosition.x / 25) -
          101
      );
      const yPosition = to2Decimal(
        101 -
          (event.clientY - canvasOffset.y) / 25 -
          Math.floor(currentPosition.y / 25)
      );
      newChargeList[dragChargeIndex].x = xPosition;
      newChargeList[dragChargeIndex].y = yPosition;
      setChargeList(newChargeList);
    }
    const position: Position = {
      x: event.clientX - canvasOffset.x,
      y: event.clientY - canvasOffset.y,
    };
    let onCharge = null;
    chargeList.forEach((charge) => {
      if (isOnCharge(position, currentPosition, charge)) {
        onCharge = charge;
      }
    });
    if (onCharge) {
      const element = document.getElementById("chargeinfo-hover");
      if (element) {
        document.body.removeChild(element);
      }
      renderChargeInfo(onCharge, {
        x: event.clientX + 25,
        y: event.clientY + 25,
      } as Position);
    } else {
      const element = document.getElementById("chargeinfo-hover");
      if (element) {
        document.body.removeChild(element);
      }
    }
  };

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    let onCharge = false;
    setMousePosition({ x: event.clientX, y: event.clientY });
    const position: Position = {
      x: event.clientX - canvasOffset.x,
      y: event.clientY - canvasOffset.y,
    };
    chargeList.forEach((charge, index) => {
      if (isOnCharge(position, currentPosition, charge)) {
        onCharge = true;
        setDragChargeIndex(index);
      }
    });
    if (!onCharge) {
      setIsDragging(true);
    }
  };

  const handleMouseUp = (event: MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setIsDragging(false);
      setCurrentPosition({
        x: currentPosition.x - (event.clientX - mousePosition.x),
        y: currentPosition.y - (event.clientY - mousePosition.y),
      });
      setMousePosition({ x: event.clientX, y: event.clientY });
    } else if (dragChargeIndex != null) {
      const xPosition = toPointFive(chargeList[dragChargeIndex].x);
      const yPosition = toPointFive(chargeList[dragChargeIndex].y);
      const newChargeList = [...chargeList];
      newChargeList[dragChargeIndex].x = xPosition;
      newChargeList[dragChargeIndex].y = yPosition;
      setChargeList(newChargeList);
      setDragChargeIndex(null);
    }
  };

  const handleMouseOut = (event: MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setIsDragging(false);
      setCurrentPosition({
        x: currentPosition.x + (event.clientX - mousePosition.x),
        y: currentPosition.y + (event.clientY - mousePosition.y),
      });
    }
  };

  const handleDoubleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const position: Position = {
      x: event.clientX - canvasOffset.x,
      y: event.clientY - canvasOffset.y,
    };
    chargeList.forEach((charge) => {
      if (isOnCharge(position, currentPosition, charge)) {
        alert("Will edit " + charge.name);
        return;
      }
    });
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className={style.app}>
      <div className={style.leftPanel}>
        <div style={{ maxHeight: "95vh", overflow: "scroll" }}>
          {chargeList.map((charge) => (
            <ChargeCard charge={charge} key={charge.name} />
          ))}
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-end", height: "5vh" }}
        >
          <Button
            text="Add new charge"
            icon="plus"
            onClick={() => {
              const newCharge = new Charge(
                "Charge " + (chargeList.length + 1),
                Math.floor(Math.random() * 3) + 1,
                Math.floor(Math.random() * 10 - 5),
                Math.floor(Math.random() * 10 - 5),
                getRandomColor(),
                new Force(0, 0, 0)
              );
              setChargeList([...chargeList, newCharge]);
            }}
          />
        </div>
      </div>
      <div className={style.rightPanel}>
        <canvas
          id="canvas"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onMouseOut={handleMouseOut}
          onDoubleClick={handleDoubleClick}
        ></canvas>
      </div>
      <div
        style={{
          position: "absolute",
          right: 25,
          bottom: 25,
          cursor: "pointer",
          background: "#ccc",
          borderRadius: "50%",
          padding: 10,
          width: "25px",
          height: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          setCurrentPosition({
            x: 2550 - canvasSize.width / 2,
            y: 2550 - canvasSize.height / 2,
          });
        }}
      >
        ⭕️
      </div>
    </div>
  );
}

export default App;
