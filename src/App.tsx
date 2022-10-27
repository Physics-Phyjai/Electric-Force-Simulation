import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import Button from "./components/Button";
import ChargeCard from "./components/ChargeCard";
import { findForce } from "./functionality/force";
import { drawCharge, drawGrid, isOnCharge } from "./functionality/graph";
import style from "./style/App.module.css";
import { CanvasSize, Position } from "./type/canvas";
import { Charge } from "./type/charge";
import { Force } from "./type/force";
function App() {
  const [chargeList, setChargeList] = useState<Array<Charge>>([]);
  const [chargeForceList, setChargeForceList] = useState<Array<Charge>>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
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
      new Charge("Charge 2", 2, 2, -2, "#00FF00", new Force(0, 0, 0)),
      new Charge("Charge 3", 4, 0, -1, "#0000FF", new Force(0, 0, 0)),
    ]);
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const parent = canvas.parentElement;
    canvas.width = parent?.offsetWidth ?? 1000;
    canvas.height = parent?.offsetHeight ?? 1000;
    const ctx = canvas.getContext("2d");
    setCanvasSize({ width: canvas.width, height: canvas.height });
    setCanvasOffset({ x: parent?.offsetLeft ?? 0, y: parent?.offsetTop ?? 0 });
    setCanvasCTX(ctx);
    setCurrentPosition({
      x: 2550 - canvas.width / 2,
      y: 2550 - canvas.height / 2,
    });
  }, []);

  useEffect(() => {
    setChargeForceList(findForce(chargeList));
  }, [chargeList]);

  useEffect(() => {
    console.log(chargeForceList);
  }, [chargeForceList])

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

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setCurrentPosition({
        x: currentPosition.x + (event.clientX - mousePosition.x),
        y: currentPosition.y + (event.clientY - mousePosition.y),
      });
      setMousePosition({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseDown = (event: MouseEvent<HTMLCanvasElement>) => {
    let onCharge = false;
    setMousePosition({ x: event.clientX, y: event.clientY });
    const position: Position = {
      x: event.clientX - canvasOffset.x,
      y: event.clientY - canvasOffset.y,
    };
    chargeList.forEach((charge) => {
      if (isOnCharge(position, currentPosition, charge)) {
        onCharge = true;
      }
    });

    setIsDragging(true);
  };

  const handleMouseUp = (event: MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(false);
    setCurrentPosition({
      x: currentPosition.x + (event.clientX - mousePosition.x),
      y: currentPosition.y + (event.clientY - mousePosition.y),
    });
    setMousePosition({ x: event.clientX, y: event.clientY });
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

  return (
    <div className={style.app}>
      <div className={style.leftPanel}>
        {chargeList.map((charge) => (
          <ChargeCard charge={charge} key={charge.name} />
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button text="Add new charge" icon="plus" onClick={() => {}} />
        </div>
      </div>
      <div className={style.rightPanel}>
        <canvas
          id="canvas"
          style={{ cursor: "pointer" }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onMouseOut={handleMouseOut}
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
