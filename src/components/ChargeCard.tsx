import { Charge } from "../type/charge";
import styles from "../style/ChargeCard.module.css";
import { toPointFive } from "../utils/convert";
interface ChargeCardProps {
  charge: Charge;
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
          X: {toPointFive(charge.x)} cm Y: {toPointFive(charge.y)} cm Q: {charge.charge} μC
        </div>
      </div>
      <div>Edit</div>
    </div>
  );
};

export default ChargeCard;
