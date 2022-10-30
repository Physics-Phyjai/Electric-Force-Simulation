import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Charge } from '../type/charge';
import InputText from './InputText';
import SliderInput from './SliderInput';

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
      <div style={{ width: '500px' }}>
        <div style={{ width: '250px' }}>
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
          <p className='bold'>X-value</p>
          <SliderInput
            value={charge.x}
            setValue={(x) => {
              charge.x = x;
              setCharge({ ...charge })
            }}
          />
        </div>
        <div>
          <p className='bold'>Y-value</p>
          <SliderInput
            value={charge.y}
            setValue={(y) => {
              charge.y = y;
              setCharge({ ...charge })
            }}
          />
        </div>

      </div>
    </ReactModal>
  )
}

export default AddEditChargeModal;