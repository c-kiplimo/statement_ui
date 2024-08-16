import React, { CSSProperties, ReactNode } from "react";
import styles from "./card-info-radio.module.css";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import RadioButton from "../../atoms/radio/radioButton";

type SelectionCardProps = {
  id: string;
  icon: ReactNode;
  label: string;
  description: string;
  name: string;
  selectionStyles?:CSSProperties;
  onSelection: (id: string) => void;
  activeCardId: string | null;
  borderColor:string
};

const SelectionCardChecked = (props:SelectionCardProps) => {
  const isActive = props.activeCardId === props.id;

  const handleClick = () => {
    props.onSelection(props.id);
  };

  return (
    <div
      className={`${styles.container}`}
      onClick={handleClick}
    >
      <div className={styles.infoSection}>
        <SelectionCardChecked.Icon icon={props.icon} />
        <SelectionCardChecked.Info label={props.label} description={props.description} />
      </div>
      <SelectionCardChecked.RadioButton checked={isActive} backgroundColor={props.borderColor}/>
    </div>
  );
};

export default SelectionCardChecked;

type SelectionCardIconProp = {
  icon: ReactNode;
};

SelectionCardChecked.Icon = (props: SelectionCardIconProp) => {
  return <div className={styles.numberIcon}>{props.icon}</div>;
};

type SelectionCardInfoProp = {
  label: string;
  description: string;
};

SelectionCardChecked.Info = (props: SelectionCardInfoProp) => {
  return (
    <VerticalInfoDescription title={props.label} description={props.description} />
  );
};

type SelectionCardRadioButtonProp = {
  checked: boolean;
  backgroundColor:string;
};

SelectionCardChecked.RadioButton = (props: SelectionCardRadioButtonProp) => {
  return <RadioButton backgroundcolor={props.backgroundColor} checked={props.checked} />;
};