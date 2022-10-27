import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import Button from "./components/Button";
import ChargeCard from "./components/ChargeCard";
import style from "./style/App.module.css";
import { Charge } from "./type/charge";
function App() {
  const [chargeList, setChargeList] = useState<Array<Charge>>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [currentPosition, setCurrentPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [canvasCTX, setCanvasCTX] = useState<CanvasRenderingContext2D | null>(
    null
  );
  const [canvasSize, setCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

  useEffect(() => {
    setChargeList([
      new Charge("Charge 1", 2, 10, 10, "#FF0000"),
      new Charge("Charge 2", 2, 10, 10, "#00FF00"),
      new Charge("Charge 3", 2, 10, 10, "#0000FF"),
    ]);
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const parent = canvas.parentElement;
    canvas.width = parent?.offsetWidth ?? 1000;
    canvas.height = parent?.offsetHeight ?? 1000;
    const ctx = canvas.getContext("2d");
    setCanvasSize({ width: canvas.width, height: canvas.height });
    setCanvasCTX(ctx);
    setCurrentPosition({
      x: 2550 - canvas.width / 2,
      y: 2550 - canvas.height / 2,
    });
  }, []);

  useEffect(() => {
    console.log("CurrentPosition: ", currentPosition.x, currentPosition.y);
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
        101 - Math.floor(currentPosition.x / 25),
        101 - Math.floor(currentPosition.y / 25)
      );
    }
  }, [currentPosition.x, currentPosition.y]);

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
    setIsDragging(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
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

  const drawGrid = (
    y_axis_distance_grid_lines = 0,
    x_axis_distance_grid_lines = 0
  ) => {
    var grid_size = 25;

    var num_lines_x = Math.floor(201);
    var num_lines_y = Math.floor(201);
    if (canvasCTX) {
      for (var i = 0; i <= num_lines_x; i++) {
        canvasCTX.beginPath();
        canvasCTX.lineWidth = 1;

        if (i == x_axis_distance_grid_lines) canvasCTX.strokeStyle = "#000000";
        else canvasCTX.strokeStyle = "#e9e9e9";

        if (i == num_lines_x) {
          canvasCTX.moveTo(0, grid_size * i);
          canvasCTX.lineTo(canvasSize.width, grid_size * i);
        } else {
          canvasCTX.moveTo(0, grid_size * i + 0.5);
          canvasCTX.lineTo(canvasSize.width, grid_size * i + 0.5);
        }
        canvasCTX.stroke();
      }

      for (i = 0; i <= num_lines_y; i++) {
        canvasCTX.beginPath();
        canvasCTX.lineWidth = 1;
        if (i == y_axis_distance_grid_lines) canvasCTX.strokeStyle = "#000000";
        else canvasCTX.strokeStyle = "#e9e9e9";

        if (i == num_lines_y) {
          canvasCTX.moveTo(grid_size * i, 0);
          canvasCTX.lineTo(grid_size * i, canvasSize.height);
        } else {
          canvasCTX.moveTo(grid_size * i + 0.5, 0);
          canvasCTX.lineTo(grid_size * i + 0.5, canvasSize.height);
        }
        canvasCTX.stroke();
      }

      for (i = 1; i < num_lines_y - y_axis_distance_grid_lines; i++) {
        canvasCTX.beginPath();
        canvasCTX.lineWidth = 1;
        canvasCTX.strokeStyle = "#000000";

        canvasCTX.moveTo(
          grid_size * i + 0.5,
          25 * x_axis_distance_grid_lines - 3
        );
        canvasCTX.lineTo(
          grid_size * i + 0.5,
          25 * x_axis_distance_grid_lines + 3
        );
        canvasCTX.stroke();

        canvasCTX.font = "10px Inter";
        canvasCTX.textAlign = "start";
        canvasCTX.fillText(
          `${i}`,
          25 * y_axis_distance_grid_lines + grid_size * i - 2,
          25 * x_axis_distance_grid_lines + 15
        );
      }
      canvasCTX.fillText(
        `0`,
        25 * y_axis_distance_grid_lines + 5,
        25 * x_axis_distance_grid_lines + 15
      );

      for (i = 1; i < y_axis_distance_grid_lines; i++) {
        canvasCTX.beginPath();
        canvasCTX.lineWidth = 1;
        canvasCTX.strokeStyle = "#000000";

        canvasCTX.moveTo(
          grid_size * i + 0.5,
          25 * x_axis_distance_grid_lines - 3
        );
        canvasCTX.lineTo(
          grid_size * i + 0.5,
          25 * x_axis_distance_grid_lines + 3
        );
        canvasCTX.stroke();

        canvasCTX.font = "10px Inter";
        canvasCTX.textAlign = "end";
        canvasCTX.fillText(
          `-${i}`,
          25 * y_axis_distance_grid_lines + -grid_size * i + 3,
          25 * x_axis_distance_grid_lines + 15
        );
      }

      for (i = 1; i < num_lines_x - x_axis_distance_grid_lines; i++) {
        canvasCTX.beginPath();
        canvasCTX.lineWidth = 1;
        canvasCTX.strokeStyle = "#000000";

        canvasCTX.moveTo(
          25 * y_axis_distance_grid_lines - 3,
          grid_size * i + 0.5
        );
        canvasCTX.lineTo(
          25 * y_axis_distance_grid_lines + 3,
          grid_size * i + 0.5
        );
        canvasCTX.stroke();
        canvasCTX.font = "10px Inter";
        canvasCTX.textAlign = "start";
        canvasCTX.fillText(
          `-${i}`,
          25 * y_axis_distance_grid_lines + 8,
          25 * x_axis_distance_grid_lines + grid_size * i + 3
        );
      }

      for (i = 1; i < x_axis_distance_grid_lines; i++) {
        canvasCTX.beginPath();
        canvasCTX.lineWidth = 1;
        canvasCTX.strokeStyle = "#000000";

        canvasCTX.moveTo(
          25 * y_axis_distance_grid_lines - 3,
          -grid_size * i + 0.5
        );
        canvasCTX.lineTo(
          25 * y_axis_distance_grid_lines + 3,
          -grid_size * i + 0.5
        );
        canvasCTX.stroke();
        canvasCTX.font = "10px Inter";
        canvasCTX.textAlign = "start";
        canvasCTX.fillText(
          `${i}`,
          25 * y_axis_distance_grid_lines + 8,
          25 * x_axis_distance_grid_lines - grid_size * i + 3
        );
      }
    }
  };
  return (
    <div className={style.app}>
      <div className={style.leftPanel}>
        {chargeList.map((charge) => (
          <ChargeCard charge={charge} key={charge.name} />
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            text="Add new charge"
            icon="plus"
            onClick={() => {
              // canvasCTX?.clearRect(, 0, canvasSize.width, canvasSize.height);
            }}
          />
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
    </div>
  );
}

export default App;
