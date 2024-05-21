import React, { CSSProperties, ReactNode } from "react";
import styles from "./selectionItem.module.css";
import classNames from "classnames";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import { ArrowRightOutlined } from "@ant-design/icons";

type SelectionItemProps = {
  id: string;
  icon: ReactNode;
  text: string;
  textInfo?:string;
  textDesc: string;
  onClick: (id: string) => void;
  activeCardId: string | null;
};

const cx = classNames.bind(styles);

const SelectionItem = ({id,icon,text,textInfo,textDesc,onClick,activeCardId}: SelectionItemProps) => {
  const isActive = activeCardId === id;

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div
      className={cx(styles.container, { [styles.containerActive]: isActive })}
      onClick={handleClick}
    >
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <SelectionItem.Icon icon={icon} isActive={isActive} />
          <SelectionItem.Text title={text} info={textInfo}description={textDesc} />
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
SelectionItem.Icon = ({icon,iconStyle,isActive}: SelectionItemIconProps) => {
  return (
    <div
      className={cx(styles.icon, { [styles.selected]: isActive })}
      style={iconStyle}
    >
      {icon}
    </div>
  );
};

type TextProps = {
  title: string;
  info?:string;
  description: string;
};
SelectionItem.Text = ({title,info,description}: TextProps) => {
  return (
    <div className={styles.text}>
      <VerticalInfoDescription
        title={title}
        titleInfo={info}
        description={description}
        descriptionStyle={{ fontWeight: "300", fontSize: "12px" }}
      />
    </div>
  );
};
