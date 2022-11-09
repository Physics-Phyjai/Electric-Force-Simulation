import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import ReactModal from "react-modal";
import { Charge } from "../type/charge";
import InputText from "./InputText";
import SliderInput from "./SliderInput";
import Button from "./Button";
import { Force } from "../type/force";

import styles from "../style/ChargeModal.module.css";

export enum Mode {
  Add,
  Edit,
}

interface ChargeModalProps {
  charge: Charge;
  isModalOpen: boolean;
  chargeListLength: number;
  mode: Mode;
  closeModal: () => void;
  onConfirm: (charge: Charge) => void;
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
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    gap: "36px",
    padding: "24px",
    border: "none",
    borderRadius: "16px",
  },
  overlay: {
    background: "rgba(33, 33, 33, 0.5)",
  },
};

const ChargeModal: React.FC<ChargeModalProps> = (props) => {
  const [charge, setCharge] = useState<NewCharge>({
    name: props.charge.name,
    y: props.charge.y,
    x: props.charge.x,
    color: props.charge.color,
    charge: props.charge.charge,
  });

  useEffect(() => {
    setCharge(props.charge);
  }, [props.charge]);

  return (
    <ReactModal
      isOpen={props.isModalOpen}
      onRequestClose={props.closeModal}
      style={modalStyle}
    >
      <div style={{ width: "264px" }}>
        <SketchPicker
          styles={{
            default: {
              picker: {
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                width: "240px",
                fontFamily: "Montserrat",
                background: "#FFFFFF",
                borderRadius: "8px",
                boxShadow:
                  "0px 10px 15px rgba(31, 41, 55, 0.1), 0px 4px 6px rgba(31, 41, 55, 0.05)",
              },
              saturation: {
                borderRadius: "4px",
                height: "166px",
              },
              hue: {
                borderRadius: "100px",
                marginBottom: "16px",
              },
              alpha: {
                borderRadius: "100px",
              },
              color: {
                display: "none",
              },
            },
          }}
          presetColors={[
            "#B28DFF",
            "#C5A3FF",
            "#FF9CEE",
            "#F6A6FF",
            "#FFB5E8",
            "#FFC9DE",
            "#FFABAB",
            "#6EB5FF",
            "#85E3FF",
            "#ACE7FF",
            "#C4FAF8",
            "#DBFFD6",
            "#AFF8DB",
            "#BFFCC6",
            "#FFFFD1",
            "#FFF58A",
            "#FFD97D",
            "#FFC97D",
          ]}
          color={charge.color}
          onChange={(color) => {
            charge.color = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
            setCharge({ ...charge });
          }}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.inputContainer}>
          <p className="bold">Charge Name</p>
          <InputText
            value={charge.name}
            placeholder={"Charge name"}
            setValue={(value) => {
              charge.name = value;
              setCharge({ ...charge });
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <p className="bold">X-value (cm)</p>
          <SliderInput
            id="slider-x"
            value={charge.x}
            setValue={(x) => {
              charge.x = x;
              setCharge({ ...charge });
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <p className="bold">Y-value (cm)</p>
          <SliderInput
            id="slider-y"
            value={charge.y}
            setValue={(y) => {
              charge.y = y;
              setCharge({ ...charge });
            }}
          />
        </div>

        <div className={styles.inputContainer}>
          <p className="bold">Q value (μC) </p>
          <SliderInput
            id="slider-charge"
            value={charge.charge}
            setValue={(newCharge) => {
              charge.charge = newCharge;
              setCharge({ ...charge });
            }}
            min={-10}
            max={10}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            text={props.mode === Mode.Add ? "Add new charge" : "Save"}
            icon={props.mode === Mode.Add ? "plus" : ""}
            onClick={() => {
              const { name, x, y, color } = charge;
              const newCharge = new Charge(
                name,
                charge.charge,
                x,
                y,
                color,
                new Force(0, 0, 0)
              );
              props.onConfirm(newCharge);
              props.closeModal();
            }}
          />
        </div>
      </div>
    </ReactModal>
  );
};

export default ChargeModal;
