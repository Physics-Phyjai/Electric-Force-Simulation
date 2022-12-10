import {
  MouseEvent,
  TouchEvent,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import ChargeModal, { Mode } from "./components/ChargeModal";
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
import {
  randomChargeValue,
  randomPastelColor,
  randomPosition,
} from "./utils/random";
import UserManual from "./components/UserManual";

function App() {
  const [size, setSize] = useState([0, 0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const initCharge = () => {
    return new Charge(
      "Charge " + (chargeList.length + 1),
      randomChargeValue(),
      randomPosition(),
      randomPosition(),
      randomPastelColor(),
      new Force(0, 0, 0)
    );
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<Mode>(Mode.Add);
  const [currentChargeIndex, setCurrentChargeIndex] = useState<number>(-1);

  const [isDisplayManual, setIsDisplayManual] = useState(true);

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
      new Charge("Charge 1", 2, 2, 1, "#FF6961", new Force(0, 0, 0)),
      new Charge("Charge 2", 2, -2, 1, "#AFD5F0", new Force(0, 0, 0)),
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
    setCanvasSize({
      width: parent?.offsetWidth ?? 1000,
      height: parent?.offsetHeight ?? 1000,
    });
    setCanvasOffset({ x: parent?.offsetLeft ?? 0, y: parent?.offsetTop ?? 0 });
    setCurrentPosition({
      x: 2550 - (parent?.offsetWidth ?? 1000) / 2,
      y: 2550 - (parent?.offsetHeight ?? 1000) / 2,
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
    chargeList.forEach((charge, index) => {
      if (isOnCharge(position, currentPosition, charge)) {
        setMode(Mode.Edit);
        setCurrentChargeIndex(index);
        setIsModalOpen(true);
        return;
      }
    });
    const element = document.getElementById("chargeinfo-hover");
    if (element) {
      document.body.removeChild(element);
    }
  };

  const handleTouchStart = (event: TouchEvent<HTMLCanvasElement>) => {
    document.getElementById("canvas")?.focus();
    let touch = event.targetTouches[0];
    let onCharge = false;
    setMousePosition({ x: touch.clientX, y: touch.clientY });
    const position: Position = {
      x: touch.clientX - canvasOffset.x,
      y: touch.clientY - canvasOffset.y,
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

  const handleTouchMove = (event: TouchEvent<HTMLCanvasElement>) => {
    let touch = event.targetTouches[0];
    if (isDragging) {
      setCurrentPosition({
        x: currentPosition.x - (touch.clientX - mousePosition.x),
        y: currentPosition.y - (touch.clientY - mousePosition.y),
      });
      setMousePosition({ x: touch.clientX, y: touch.clientY });
    } else if (dragChargeIndex != null) {
      const newChargeList = [...chargeList];
      const xPosition = to2Decimal(
        (touch.clientX - canvasOffset.x) / 25 +
          Math.floor(currentPosition.x / 25) -
          101
      );
      const yPosition = to2Decimal(
        101 -
          (touch.clientY - canvasOffset.y) / 25 -
          Math.floor(currentPosition.y / 25)
      );
      newChargeList[dragChargeIndex].x = xPosition;
      newChargeList[dragChargeIndex].y = yPosition;
      setChargeList(newChargeList);
    }
    const position: Position = {
      x: touch.clientX - canvasOffset.x,
      y: touch.clientY - canvasOffset.y,
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
        x: touch.clientX + 25,
        y: touch.clientY + 25,
      } as Position);
    } else {
      const element = document.getElementById("chargeinfo-hover");
      if (element) {
        document.body.removeChild(element);
      }
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLCanvasElement>) => {
    const element = document.getElementById("chargeinfo-hover");
    if (element) {
      document.body.removeChild(element);
      setDragChargeIndex(null);
    }
  };

  useEffect(() => {
    const element = document.getElementById("left");
    if (element) {
      if (isMenuOpen) {
        element.classList.add(style.show);
      } else {
        element.classList.remove(style.show);
      }
    }
  }, [isMenuOpen]);

  return (
    <>
      <div
        className={style.menu}
        style={{
          cursor: "pointer",
          background: "#858DE8",
          borderRadius: "50%",
          top: "25px",
          left: "25px",
          padding: "12px",
          width: "48px",
          height: "48px",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img src="images/menu.svg" width="24px" height="24px"></img>
      </div>
      <div className={style.app}>
        <div className={style.leftPanel} id="left">
          <div style={{ maxHeight: "95vh", overflow: "scroll" }}>
            {chargeList.length > 0 ? (
              <>
                {chargeList.map((charge, index) => (
                  <ChargeCard
                    charge={charge}
                    key={charge.name}
                    onClickEdit={() => {
                      setIsModalOpen(true);
                      setCurrentChargeIndex(index);
                      setMode(Mode.Edit);
                    }}
                    onClickDelete={() => {
                      const newChargeList = [...chargeList];
                      newChargeList.splice(index, 1);
                      setCurrentChargeIndex(-1);
                      setChargeList(newChargeList);
                    }}
                  />
                ))}
              </>
            ) : (
              <div style={{ margin: "1rem 0 ", textAlign: "center" }}>
                There is no charge in the simulation now. Click on the "Add new
                charge" button to start adding a new charge.
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              height: "5vh",
            }}
          >
            <Button
              text="Add new charge"
              icon="plus"
              onClick={() => {
                setCurrentChargeIndex(-1);
                setMode(Mode.Add);
                setIsModalOpen(true);
              }}
            />
          </div>
        </div>
        <div className={style.rightPanel}>
          <canvas
            id="canvas"
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseOut={handleMouseOut}
            onDoubleClick={handleDoubleClick}
            width={canvasSize.width}
            height={canvasSize.height}
          ></canvas>
        </div>
        {isDisplayManual && (
          <UserManual onClose={() => setIsDisplayManual(false)} />
        )}
        <div
          style={{
            position: "absolute",
            right: 25,
            top: 25,
            cursor: "pointer",
            background: "#858DE8",
            borderRadius: "50%",
            padding: "12px",
            width: "48px",
            height: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            setIsDisplayManual(true);
          }}
        >
          <img src="images/info.png" height="24px"></img>
        </div>
        <div
          style={{
            position: "absolute",
            right: 25,
            bottom: 25,
            cursor: "pointer",
            background: "#858DE8",
            borderRadius: "50%",
            padding: "12px",
            width: "48px",
            height: "48px",
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
          <img src="images/focus.svg" width="24px" height="24px"></img>
        </div>
        <ChargeModal
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          charge={
            currentChargeIndex === -1
              ? initCharge()
              : chargeList[currentChargeIndex]
          }
          chargeListLength={chargeList.length}
          mode={mode}
          onConfirm={(newCharge) => {
            switch (mode) {
              case Mode.Add:
                setChargeList([...chargeList, newCharge]);
                break;
              case Mode.Edit:
                chargeList[currentChargeIndex] = newCharge;
                setChargeList([...chargeList]);
            }
          }}
        />
      </div>
    </>
  );
}

export default App;
