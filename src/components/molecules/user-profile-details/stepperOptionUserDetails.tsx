import React from "react";
import { Steps } from "antd";

const StepperOptionUserDetails = (props: any) => {
  return (
    <div className=" bg-white p-20 mt-7">
      <Steps
        size="small"
        direction={props?.direction}
        current={props?.current}
        items={props?.data}
      />
    </div>
  );
};

export default StepperOptionUserDetails;
