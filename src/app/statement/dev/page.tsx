"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import RadioButton from "@/src/components/atoms/radio/radioButton";

const Dev = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e: any) => {
    const newValue = e.target.value;
    setSelectedOption((prevValue) => (prevValue === newValue ? "" : newValue));
  };

  return (
    <Fragment>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <RadioButton
          id="option1"
          name="options"
          value="option1"
          label="Option 1"
          checked={selectedOption === "option1"}
          onChange={handleOptionChange}
        />
        <label>Test</label>
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);
