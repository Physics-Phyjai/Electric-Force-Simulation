import { Position } from "../type/canvas";
import { Charge } from "../type/charge";

const drawGrid = (
  canvasCTX: CanvasRenderingContext2D,
  canvasSize: { width: number; height: number },
  y_axis_distance_grid_lines: number = 0,
  x_axis_distance_grid_lines: number = 0
) => {
  var grid_size = 25;

  var num_lines_x = Math.floor(201);
  var num_lines_y = Math.floor(201);
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

    canvasCTX.moveTo(grid_size * i + 0.5, 25 * x_axis_distance_grid_lines - 3);
    canvasCTX.lineTo(grid_size * i + 0.5, 25 * x_axis_distance_grid_lines + 3);
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

    canvasCTX.moveTo(grid_size * i + 0.5, 25 * x_axis_distance_grid_lines - 3);
    canvasCTX.lineTo(grid_size * i + 0.5, 25 * x_axis_distance_grid_lines + 3);
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

    canvasCTX.moveTo(25 * y_axis_distance_grid_lines - 3, grid_size * i + 0.5);
    canvasCTX.lineTo(25 * y_axis_distance_grid_lines + 3, grid_size * i + 0.5);
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

    canvasCTX.moveTo(25 * y_axis_distance_grid_lines - 3, -grid_size * i + 0.5);
    canvasCTX.lineTo(25 * y_axis_distance_grid_lines + 3, -grid_size * i + 0.5);
    canvasCTX.stroke();
    canvasCTX.font = "10px Inter";
    canvasCTX.textAlign = "start";
    canvasCTX.fillText(
      `${i}`,
      25 * y_axis_distance_grid_lines + 8,
      25 * x_axis_distance_grid_lines - grid_size * i + 3
    );
  }
};

const drawCharge = (
  canvasCTX: CanvasRenderingContext2D,
  currentPosition: Position,
  charge: Charge
) => {
  const fromX = (101 - Math.floor(currentPosition.x / 25) + charge.x) * 25;
  const fromY = (101 - Math.floor(currentPosition.y / 25) - charge.y) * 25;
  const toX = fromX - charge.force.i * charge.force.magnitude;
  const toY = fromY - charge.force.j * charge.force.magnitude;
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  canvasCTX.fillStyle = charge.color;
  canvasCTX.strokeStyle = charge.color;
  canvasCTX.beginPath();
  canvasCTX.moveTo(fromX, fromY);
  canvasCTX.lineTo(toX, toY);
  canvasCTX.fillText(charge.force.getForce(),fromX + dx / 2 + Math.abs(15 * Math.sin(angle)), fromY + dy / 2 + Math.abs(15 * Math.cos(angle)));
  canvasCTX.stroke();
  canvasCTX.closePath();
  canvasCTX.beginPath();
  canvasCTX.moveTo(toX, toY);
  canvasCTX.lineTo(
    toX - 5 * Math.cos(angle - Math.PI / 6),
    toY - 5 * Math.sin(angle - Math.PI / 6)
  );
  canvasCTX.stroke();
  canvasCTX.closePath();
  canvasCTX.beginPath();
  canvasCTX.moveTo(toX, toY);
  canvasCTX.lineTo(
    toX - 5 * Math.cos(angle + Math.PI / 6),
    toY - 5 * Math.sin(angle + Math.PI / 6)
  );
  canvasCTX.stroke();
  canvasCTX.closePath();
  canvasCTX.beginPath();
  canvasCTX.arc(fromX, fromY, charge.charge * 5, 0, 2 * Math.PI);
  canvasCTX.fill();
  canvasCTX.closePath();
  canvasCTX.strokeStyle = "#000000";
  canvasCTX.fillStyle = "#000000";
};

const isOnCharge = (
  position: Position,
  currentPosition: Position,
  charge: Charge
) => {
  const centerX = (101 - Math.floor(currentPosition.x / 25) + charge.x) * 25;
  const centerY = (101 - Math.floor(currentPosition.y / 25) - charge.y) * 25;
  const dx = position.x - centerX;
  const dy = position.y - centerY;
  return Math.sqrt(dx * dx + dy * dy) < charge.charge * 5;
};

export { drawGrid, drawCharge, isOnCharge };
