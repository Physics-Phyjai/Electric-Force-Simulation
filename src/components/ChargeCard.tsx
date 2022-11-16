import { Charge } from "../type/charge";
import styles from "../style/ChargeCard.module.css";
import { toPointFive } from "../utils/convert";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import "../style/menu.css";
interface ChargeCardProps {
  charge: Charge;
  onClickEdit: () => void;
  onClickDelete: () => void;
}
const ChargeCard = (props: ChargeCardProps) => {
  const { charge } = props;
  const [anchorEl, setAnchorEl] = useState<null | SVGElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={styles.chargeCard}>
      <div className={styles.chargeInfo}>
        <div className={styles.chargeName}>
          <div
            className={styles.chargeColor}
            style={{ background: charge.color }}
          ></div>
          <div>{charge.name}</div>
        </div>
        <div className={styles.chargeDetail}>
          X: {toPointFive(charge.x)} cm Y: {toPointFive(charge.y)} cm Q:{" "}
          {charge.charge} μC
        </div>
      </div>
      <div className={styles.edit}>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={handleClick}
        >
          <path
            d="M7 4.375C7.48325 4.375 7.875 3.98325 7.875 3.5C7.875 3.01675 7.48325 2.625 7 2.625C6.51675 2.625 6.125 3.01675 6.125 3.5C6.125 3.98325 6.51675 4.375 7 4.375Z"
            fill="black"
          />
          <path
            d="M7 7.875C7.48325 7.875 7.875 7.48325 7.875 7C7.875 6.51675 7.48325 6.125 7 6.125C6.51675 6.125 6.125 6.51675 6.125 7C6.125 7.48325 6.51675 7.875 7 7.875Z"
            fill="black"
          />
          <path
            d="M7 11.375C7.48325 11.375 7.875 10.9832 7.875 10.5C7.875 10.0168 7.48325 9.625 7 9.625C6.51675 9.625 6.125 10.0168 6.125 10.5C6.125 10.9832 6.51675 11.375 7 11.375Z"
            fill="black"
          />
        </svg>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => {handleClose(); props.onClickEdit();}}>
            {" "}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6019 1.2077L10.6018 1.20761C10.4523 1.05864 10.25 0.975 10.0392 0.975C9.82831 0.975 9.62604 1.05864 9.47658 1.20761L9.47655 1.20764L1.70924 8.97745L1.70608 8.9743L1.70256 8.9895L0.99339 12.0555L0.993388 12.0555L0.993322 12.0558C0.968065 12.1716 0.968931 12.2915 0.995856 12.4068C1.02278 12.5221 1.07509 12.63 1.14895 12.7225C1.22282 12.815 1.31638 12.8898 1.42281 12.9414C1.52888 12.9929 1.64505 13.0201 1.7629 13.0209C1.81755 13.0264 1.87261 13.0264 1.92726 13.0208L1.92728 13.021L1.93034 13.0203L5.02457 12.3099L5.02558 12.3143L5.03666 12.3032L12.7928 4.54086L12.7928 4.5408C12.9415 4.39108 13.025 4.18847 13.025 3.97728C13.025 3.76609 12.9415 3.56348 12.7928 3.41376L10.6019 1.2077ZM10.4218 5.81687L4.63332 11.5895L1.77879 12.1894L2.42897 9.38541L8.21768 3.60881L10.4218 5.81687ZM10.9572 5.23915L8.75324 3.03134L10.0166 1.77305L12.184 3.98108L10.9572 5.23915Z"
                fill="black"
                stroke="black"
                strokeWidth="0.05"
              />
            </svg>
            <span style={{ marginLeft: "8px" }}>Edit</span>
          </MenuItem>
          <MenuItem onClick={() => {handleClose(); props.onClickDelete();}}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.25 5.25H6.125V10.5H5.25V5.25ZM7.875 5.25H8.75V10.5H7.875V5.25Z"
                fill="black"
              />
              <path
                d="M1.75 2.625V3.5H2.625V12.25C2.625 12.4821 2.71719 12.7046 2.88128 12.8687C3.04538 13.0328 3.26794 13.125 3.5 13.125H10.5C10.7321 13.125 10.9546 13.0328 11.1187 12.8687C11.2828 12.7046 11.375 12.4821 11.375 12.25V3.5H12.25V2.625H1.75ZM3.5 12.25V3.5H10.5V12.25H3.5ZM5.25 0.875H8.75V1.75H5.25V0.875Z"
                fill="black"
              />
            </svg>
            <span style={{ marginLeft: "8px" }}>Delete</span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default ChargeCard;
