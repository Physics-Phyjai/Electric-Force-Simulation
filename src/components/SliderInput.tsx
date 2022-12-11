import { Slider } from "@mui/material";
import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../style/slider.css";

const theme = createTheme({
  palette: {
    purple: {
      main: "#858DE8",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    purple: Palette["primary"];
  }

  interface PaletteOptions {
    purple?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Slider" {
  interface SliderPropsColorOverrides {
    purple: true;
  }
}

interface SlideInputProps {
  id: string;
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
}

const SliderInput: React.FC<SlideInputProps> = ({
  value,
  setValue,
  min = -100,
  max = 100,
  id,
}) => {
  const calculateTrackValue = (value: number) => {
    const element = document.querySelector(
      `#${id} .custom-track`
    ) as HTMLElement;
    if (element) {
      element.style.display = "none";
      if (value >= min && value < 0) {
        const right = Math.round((value / min) * 50);
        const left = 50 - right;
        element.setAttribute(
          "style",
          `left: ${left}% !important; width: ${right}% !important; display: block; height: 4px;`
        );
      } else if (value >= 0 && value <= max) {
        const right = Math.round((value / max) * 50);
        element.setAttribute(
          "style",
          `left: 50% !important; width: ${right}% !important; display: block; height: 4px;`
        );
      }
    }
  };
  const onChange = (
    e: Event,
    value: number | number[],
    activeThumb: number
  ): void => {
    if (typeof value === "number") {
      setValue(Math.round(value));
    }
  };
  useEffect(() => {
    const element = document.createElement("span");
    element.className = "custom-track";
    document.getElementById(id)?.appendChild(element);
  }, []);
  useEffect(() => {
    calculateTrackValue(value);
  }, [value]);
  return (
    <ThemeProvider theme={theme}>
      <Slider
        id={id}
        color="purple"
        value={value}
        track={false}
        onChange={onChange}
        onChangeCommitted={(e, n) => onChange(e as Event, n, 0)}
        aria-labelledby="track-inverted-slider"
        step={1}
        min={min}
        max={max}
        defaultValue={0}
        marks={Array(11)
          .fill(0)
          .map((_, index) => ({
            value: min + (index * (max - min)) / 10,
            label: (min + (index * (max - min)) / 10).toString(),
          }))}
        valueLabelDisplay="on"
        size="small"
      />
    </ThemeProvider>
  );
};

export default SliderInput;
