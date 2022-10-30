import { Slider } from '@mui/material';
import React, { useState } from 'react';

const marks: Array<{ value: number, label: string }> = [];
for (let i = -100; i <= 100; i += 20) {
  marks.push({ value: i, label: i.toString() })
}

interface SlideInputProps {
  value: number;
  setValue: (value: number) => void
}

const SliderInput: React.FC<SlideInputProps> = ({ value, setValue }) => {
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
    min={-100}
    max={100}
    defaultValue={0}
    marks={marks}
    valueLabelDisplay="on"
  />
}

export default SliderInput;

