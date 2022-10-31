import styles from '../style/Button.module.css'
interface ButtonProps {
    text: string;
    icon?: string;
    onClick: () => void;
    outlined?: boolean;
}
const Button = (props: ButtonProps) => {
    return (
        <div className={`${styles.button} ${props.outlined ? styles.outlined : ''}`} onClick={props.onClick}>
            {props.icon && <img src="images/carbon_add-alt.png" width="16px" height="16px" alt="add-icon" />}
            <p>{props.text}</p>
        </div>
    )
}

export default Button;