import React, { CSSProperties } from "react";

interface DataType {
  key: React.Key;
  value: string;
  option: string;
}

type selectionProps = {
  options: DataType[];
  selectionStyles?: CSSProperties;
  onclick?: (e: any) => void;
  onchange?: (e: any) => void;
};

const SelectedInput = (props: selectionProps) => {
  return (
    <div>
      <select name="period" id="period" style={props.selectionStyles} onChange={props.onchange}>
        {props.options.map((option) => (
          <option
            value={option.value}
            onClick={props.onclick}
          >
            {option.option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectedInput;
