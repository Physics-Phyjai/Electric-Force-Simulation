import { Slider } from '@mui/material';
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    purple: {
      main: '#858DE8',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    purple: Palette['primary'];
  }

  interface PaletteOptions {
    purple?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Slider' {
  interface SliderPropsColorOverrides {
    purple: true;
  }
}

interface SlideInputProps {
  value: number;
  setValue: (value: number) => void
  min?: number;
  max?: number;
}

const SliderInput: React.FC<SlideInputProps> = ({ value, setValue, min = -100, max = 100 }) => {
  const onChange = (e: Event, value: number | number[], activeThumb: number): void => {
    if (typeof value === 'number') {
      setValue(value);
    }
  }
  return <ThemeProvider theme={theme}>
    <Slider
      color="purple"
      value={value}
      onChange={onChange}
      track={false}
      aria-labelledby="track-inverted-slider"
      step={1}
      min={min}
      max={max}
      defaultValue={0}
      marks={Array(11).fill(0).map((_, index) => ({ value: min + (index * (max - min) / 10), label: (min + (index * (max - min) / 10)).toString() }))}
      valueLabelDisplay="on"
      size='small'
    />
  </ThemeProvider>
}

export default SliderInput;

