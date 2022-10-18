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
            {props.icon && "+ "}
            {props.text}
        </div>
    )
}

export default Button;