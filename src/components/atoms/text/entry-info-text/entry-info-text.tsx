import { CSSProperties } from "react";
import style from "./entry-info-text.module.css";

type EntryInfoEntryProps = {
  title: string;
  description: string;
  styles?: {
    title?: CSSProperties;
    description?: CSSProperties;
    container?: CSSProperties;
  };
};

const EntryInfoText = (props: EntryInfoEntryProps) => {
  return (
    <div className={style.container} style={{ ...props.styles?.container }}>
      <div className={style.entryInfoTitle} style={{ ...props.styles?.title }}>
        {props.title} <span>:</span>
      </div>
      <div
        className={style.entryInfoDescription}
        style={{ ...props.styles?.description }}
      >
        {props.description}
      </div>
    </div>
  );
};
export default EntryInfoText;
