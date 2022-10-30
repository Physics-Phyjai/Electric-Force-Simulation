import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { Charge } from '../type/charge';
import Slider from '@mui/material/Slider';

export enum Mode {

}

interface AddNewChargeModalProps {
  charge: Charge;
  isModalOpen: boolean;
  chargeListLength: number;
  closeModal: () => void
}

interface NewCharge {
  name: string;
  y: number;
  x: number;
  color: string;
}


const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const marks = [
  {
    value: -20,
    label: '-20',
  },
  {
    value: -10,
    label: '-10',
  },
  {
    value: 0,
    label: '0',
  },
  {
    value: 10,
    label: '10',
  },
  {
    value: 20,
    label: '20',
  },
];

const AddEditChargeModal: React.FC<AddNewChargeModalProps> = (props) => {
  const [charge, setCharge] = useState<NewCharge>(
    {
      name: props.charge.name,
      y: props.charge.y,
      x: props.charge.x,
      color: props.charge.color
    }
  )
  return (
    <ReactModal
      isOpen={props.isModalOpen}
      onRequestClose={props.closeModal}
      style={modalStyle}
    >
      <div style={{ width: '300px' }}>
        <Slider
          track="inverted"
          aria-labelledby="track-inverted-slider"
          getAriaValueText={(value) => (value - 50) + ""}
          step={1}
          min={-20}
          max={20}
          defaultValue={10}
          marks={marks}
          valueLabelDisplay="on"
        />
      </div>
    </ReactModal>
  )
}

export default AddEditChargeModal;