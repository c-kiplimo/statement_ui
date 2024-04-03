import React, { CSSProperties, ReactNode, useState } from "react";
import styles from "./selectionItem.module.css";
import classNames from "classnames";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import { ArrowRightOutlined } from "@ant-design/icons";

type SelectionItemProps = {
  id: string;
  icon: ReactNode;
  text: string;
  textDesc: string;
  onClick: (id: string) => void;
  activeCardId: string | null;
};

const cx = classNames.bind(styles);

const SelectionItem = (props: SelectionItemProps) => {
  const isActive = props.activeCardId === props.id;

  const handleClick = () => {
    props.onClick(props.id);
  };

  return (
    <div
      className={cx(styles.container, { [styles.containerActive]: isActive })}
      onClick={handleClick}
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <SelectionItem.Icon icon={props.icon} isActive={isActive} />
          <SelectionItem.Text title={props.text} description={props.textDesc} />
        </div>
        {isActive && (
          <div className={styles.arrowIcon}>
            <ArrowRightOutlined size={16} style={{ color: "#84BD00" }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectionItem;

type SelectionItemIconProps = {
  icon: ReactNode;
  iconStyle?: CSSProperties;
  isActive: boolean;
};
SelectionItem.Icon = (props: SelectionItemIconProps) => {
  return (
    <div
      className={cx(styles.icon, { [styles.selected]: props.isActive })}
      style={props.iconStyle}
    >
      {props.icon}
    </div>
  );
};

type TextProps = {
  title: string;
  description: string;
};
SelectionItem.Text = (props: TextProps) => {
  return (
    <div className={styles.text}>
      <VerticalInfoDescription
        title={props.title}
        description={props.description}
        descriptionStyle={{ fontWeight: "300", fontSize: "12px" }}
      />
    </div>
  );
};
