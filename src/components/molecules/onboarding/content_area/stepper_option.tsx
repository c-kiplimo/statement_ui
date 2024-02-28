import { Steps } from "antd";
import React from "react";

const StepperOption = (props: any) => {
  return (
    <div style={{ padding: props.padding }} className=" bg-white mt-7">
      <Steps
        size="small"
        direction={props?.direction}
        current={props?.current}
        items={props?.items}
      />
    </div>
  );
};

export default StepperOption;
