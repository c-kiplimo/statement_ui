import React, { ReactNode, useState } from "react";
import styles from "./card-info-radio.module.css";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import RadioButton from "../../atoms/radio/radioButton";

type RadioItem = {
  value: string;
  id: string;
};

type RadioGroupProps = {
  icon: ReactNode;
  label: string;
  description: string;
  name: string;
  items: RadioItem[];
  value: string | null;
};

const CustomRadio = ({
  icon,
  label,
  description,
  name,
  items,
  value,
}: RadioGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(true);
  
  const handleChange =()=>{
    console.log(selectedValue,"selected");    
    setSelectedValue(!selectedValue)}
  return (
    <div
      className={styles.container}
      onClick={() => {
        setSelectedValue(!selectedValue);
      }}
    >
      <div className={styles.infoSection}>
        <div className={styles.numberIcon}>{icon}</div>
        <VerticalInfoDescription title={label} description={description} />
      </div>
      {items.map((item) => (
        <div key={item.id}>
          <RadioButton
            id={item.id}
            name={name}
            value={item.value}
            checked={selectedValue}
            onClick={handleChange}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomRadio;
