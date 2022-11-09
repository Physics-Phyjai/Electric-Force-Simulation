import { Charge } from "../type/charge";
import styles from "../style/ChargeCard.module.css";
import { toPointFive } from "../utils/convert";
interface ChargeCardProps {
  charge: Charge;
  onClickEdit: () => void;
}
const ChargeCard = (props: ChargeCardProps) => {
  const { charge } = props;
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
      <div className={styles.edit} onClick={props.onClickEdit}>
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
            stroke-width="0.05"
          />
        </svg>
        Edit
      </div>
    </div>
  );
};

export default ChargeCard;
