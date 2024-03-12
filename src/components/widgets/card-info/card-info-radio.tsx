<<<<<<< HEAD
"use-client";
=======
'use-client'
>>>>>>> a0c4bea (refactored card info implementation)
import React, { ReactNode, useEffect, useState } from "react";
import styles from "./card-info-radio.module.css";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import RadioButton from "../../atoms/radio/radioButton";

type RadioItem = {
  value: string;
  id: string;
};

type SelectionCardProps = {
<<<<<<< HEAD
  id?: string;
=======
  id?: string
>>>>>>> a0c4bea (refactored card info implementation)
  icon: ReactNode;
  label: string;
  description: string;
  name: string;
  value: string | null;
<<<<<<< HEAD
  onSelection?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
=======
  onSelection?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void

>>>>>>> a0c4bea (refactored card info implementation)
};

const SelectionCard = ({
  icon,
  label,
  description,
<<<<<<< HEAD
  onSelection,
}: SelectionCardProps) => {
  const [selectedValue, setSelectedValue] = useState(false);
  const [isActive, setActive] = useState(false);

  const onSelected = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let selected = !selectedValue;
    setSelectedValue(selected);
    if (selected === true) {
      setActive(true);
    } else {
      setActive(false);
    }
    onSelection?.(event);
  };

  return (
    <div
      className={`${styles.container} ${isActive ? styles.containerActive : ""}`}
=======
  onSelection
}: SelectionCardProps) => {

  const [selectedValue, setSelectedValue] = useState(false);
  const [isActive, setActive] = useState(false);

  const onSelected = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

    let selected = !selectedValue
    setSelectedValue(selected);
    if (selected === true) {
      setActive(true)
    } else {
      setActive(false)
    }
    onSelection?.(event)
  };


  return (
    <div
      className={`${styles.container} ${isActive ? styles.containerActive : ''}`}
>>>>>>> a0c4bea (refactored card info implementation)
      onClick={onSelected}
    >
      <div className={styles.infoSection}>
        <SelectionCard.Icon icon={icon} />
        <SelectionCard.Info label={label} description={description} />
      </div>
      <SelectionCard.RadioButton defaultChecked={selectedValue} />
    </div>
  );
};

<<<<<<< HEAD
type SelectionCardIconProp = {
  icon: ReactNode;
};

SelectionCard.Icon = ({ icon }: SelectionCardIconProp) => {
  return <div className={styles.numberIcon}>{icon}</div>;
};

type SelectionCardInfonProp = {
  label: String;
  description: String;
};
SelectionCard.Info = ({ label, description }: SelectionCardInfonProp) => {
  return <VerticalInfoDescription title={label} description={description} />;
};

type SelectionCardRadioButtonProp = {
  defaultChecked: boolean;
};

SelectionCard.RadioButton = (props: SelectionCardRadioButtonProp) => {
  const onChange = (event: any) => {};

  return <RadioButton checked={props.defaultChecked} onChange={onChange} />;
};
=======
/**
 * Selection Card Icon 
 */
type SelectionCardIconProp = {
  icon: ReactNode
}

SelectionCard.Icon = ({ icon }: SelectionCardIconProp) => {
  return (<div className={styles.numberIcon}>{icon}</div>)
}

/**
 * Selection Card Info 
 */

type SelectionCardInfonProp = {
  label: String
  description: String
}
SelectionCard.Info = ({ label, description }: SelectionCardInfonProp) => {
  return (
    <VerticalInfoDescription title={label} description={description} />
  )
}


/**
 * Selection Card Radio Button
 */

type SelectionCardRadioButtonProp = {
  defaultChecked: boolean
}



SelectionCard.RadioButton = (props: SelectionCardRadioButtonProp) => {

  const onChange = (event: any) => {

  }

  return (
    <RadioButton
      checked={props.defaultChecked}
      onChange={onChange}
    />
  )
}
>>>>>>> a0c4bea (refactored card info implementation)

export default SelectionCard;
