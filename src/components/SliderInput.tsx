import { Slider } from '@mui/material';
import React from 'react';

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
  return <Slider
    value={value}
    onChange={onChange}
    track={false}
    aria-labelledby="track-inverted-slider"
    step={1}
    min={min}
    max={max}
    defaultValue={0}
    marks={Array(11).fill(0).map((_, index) => ({ value: min + (index * (max-min) / 10), label: (min + (index * (max-min) / 10)).toString() }))}
    valueLabelDisplay="on"
  />
}

export default SliderInput;

