import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import ReactModal from 'react-modal';
import { Charge } from '../type/charge';
import InputText from './InputText';
import SliderInput from './SliderInput';
import Button from './Button';

export enum Mode {
  Add, Edit
}

interface ChargeModalProps {
  charge: Charge;
  isModalOpen: boolean;
  chargeListLength: number;
  mode: Mode;
  closeModal: () => void;
  onConfirm: (charge: NewCharge) => void;
}

export interface NewCharge {
  name: string;
  x: number;
  y: number;
  charge: number;
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
    display: 'flex',
    gap: '50px'
  },
};

const ChargeModal: React.FC<ChargeModalProps> = (props) => {
  const [charge, setCharge] = useState<NewCharge>(
    {
      name: props.charge.name,
      y: props.charge.y,
      x: props.charge.x,
      color: props.charge.color,
      charge: props.charge.charge
    }
  )

  useEffect(() => {
    setCharge(props.charge)
  }, [props.charge])

  return (
    <ReactModal
      isOpen={props.isModalOpen}
      onRequestClose={props.closeModal}
      style={modalStyle}
    >

      <div style={{ width: '400px' }}>
        <div style={{ width: '205px' }}>
          <p className='bold'>Charge name</p>
          <InputText
            value={charge.name}
            placeholder={'Charge name'}
            setValue={(value) => {
              charge.name = value;
              setCharge({ ...charge })
            }}
          />
        </div>
        <div>
          <p className='bold'>X-value (cm)</p>
          <SliderInput
            value={charge.x}
            setValue={(x) => {
              charge.x = x;
              setCharge({ ...charge })
            }}
          />
        </div>
        <div>
          <p className='bold'>Y-value (cm)</p>
          <SliderInput
            value={charge.y}
            setValue={(y) => {
              charge.y = y;
              setCharge({ ...charge })
            }}
          />
        </div>

        <div>
          <p className='bold'>Q value (μC) </p>
          <SliderInput
            value={charge.charge}
            setValue={(newCharge) => {
              charge.charge = newCharge;
              setCharge({ ...charge })
            }}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", height: "5vh" }}
        >
          <Button
            text={props.mode === Mode.Add ? "Add new charge" : "Save"}
            icon={props.mode === Mode.Add ? "plus" : ''}
            onClick={() => {
              props.onConfirm(charge)
            }}
          />
        </div>
      </div>


      <div>
        <SketchPicker />
      </div>
    </ReactModal>
  )
}

export default ChargeModal;