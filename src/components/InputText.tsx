import React from 'react';
import styles from '../style/InputText.module.css'

interface InputTextProps {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
}

const InputText: React.FC<InputTextProps> = ({ value, setValue, placeholder = '' }) => {
  return (
    <input
      className={styles.inputText}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => { setValue(e.target.value) }}
    />
  )
}

export default InputText;