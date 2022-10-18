import { useEffect, useState } from "react";
import Button from "./components/Button";
import ChargeCard from "./components/ChargeCard";
import style from "./style/App.module.css";
import { Charge } from "./type/charge";
function App() {
  const [chargeList, setChargeList] = useState<Array<Charge>>([]);

  useEffect(() => {
    setChargeList([
      new Charge("Charge 1", 2, 10, 10, "#FF0000"),
      new Charge("Charge 2", 2, 10, 10, "#00FF00"),
      new Charge("Charge 3", 2, 10, 10, "#0000FF"),
    ]);
    drawGrid();
  }, []);

  const drawGrid = () => {
    const canvas: HTMLCanvasElement = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;
    const parent = canvas.parentElement;
    canvas.width = parent?.offsetWidth ?? 1000;
    canvas.height = parent?.offsetHeight ?? 1000;
    const ctx = canvas.getContext("2d");
    var grid_size = 25;
    var x_axis_distance_grid_lines = 21;
    var y_axis_distance_grid_lines = 34;
    var x_axis_starting_point = 1;
    var y_axis_starting_point = 1;

    var canvas_width = canvas.width;
    var canvas_height = canvas.height;

    var num_lines_x = Math.floor(200);
    var num_lines_y = Math.floor(200);
    if (ctx) {
      for (var i = 0; i <= num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;

        if (i == x_axis_distance_grid_lines) ctx.strokeStyle = "#000000";
        else ctx.strokeStyle = "#e9e9e9";

        if (i == num_lines_x) {
          ctx.moveTo(0, grid_size * i);
          ctx.lineTo(canvas_width, grid_size * i);
        } else {
          ctx.moveTo(0, grid_size * i + 0.5);
          ctx.lineTo(canvas_width, grid_size * i + 0.5);
        }
        ctx.stroke();
      }

      for (i = 0; i <= num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        if (i == y_axis_distance_grid_lines) ctx.strokeStyle = "#000000";
        else ctx.strokeStyle = "#e9e9e9";

        if (i == num_lines_y) {
          ctx.moveTo(grid_size * i, 0);
          ctx.lineTo(grid_size * i, canvas_height);
        } else {
          ctx.moveTo(grid_size * i + 0.5, 0);
          ctx.lineTo(grid_size * i + 0.5, canvas_height);
        }
        ctx.stroke();
      }

      ctx.translate(
        y_axis_distance_grid_lines * grid_size,
        x_axis_distance_grid_lines * grid_size
      );

      for (i = 1; i < num_lines_y - y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(grid_size * i + 0.5, -3);
        ctx.lineTo(grid_size * i + 0.5, 3);
        ctx.stroke();

        ctx.font = "9px Inter";
        ctx.textAlign = "start";
        ctx.fillText(`${x_axis_starting_point * i}`, grid_size * i - 2, 15);
      }

      for (i = 1; i < y_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(-grid_size * i + 0.5, -3);
        ctx.lineTo(-grid_size * i + 0.5, 3);
        ctx.stroke();

        ctx.font = "9px Inter";
        ctx.textAlign = "end";
        ctx.fillText(`-${x_axis_starting_point * i}`, -grid_size * i + 3, 15);
      }
      for (i = 1; i < num_lines_x - x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(-3, grid_size * i + 0.5);
        ctx.lineTo(3, grid_size * i + 0.5);
        ctx.stroke();
        ctx.font = "9px Inter";
        ctx.textAlign = "start";
        ctx.fillText(`${-y_axis_starting_point * i}`, 8, grid_size * i + 3);
      }

      for (i = 1; i < x_axis_distance_grid_lines; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";

        ctx.moveTo(-3, -grid_size * i + 0.5);
        ctx.lineTo(3, -grid_size * i + 0.5);
        ctx.stroke();
        ctx.font = "9px Inter";
        ctx.textAlign = "start";
        ctx.fillText(`${y_axis_starting_point * i}`, 8, -grid_size * i + 3);
      }
    }
  };
  return (
    <div className={style.app}>
      <div className={style.leftPanel}>
        {chargeList.map((charge) => (
          <ChargeCard charge={charge} />
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button text="Add new charge" icon="plus" onClick={() => {}} />
        </div>
      </div>
      <div className={style.rightPanel}>
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
}

export default App;
