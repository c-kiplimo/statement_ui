
import React from "react";
import { useCoreProps } from "@/src/app/(context)/ColorContext";
import { Select } from "antd";
import "../account_statement_search.css"

type CardProviderProp ={
  onValueChange:(el)=>void
}
const CardProvider = ({onValueChange}:CardProviderProp) => {

    const {colorToken} = useCoreProps()

    //call a hooks to fetch card details
    const options = [
      { label: "VISA | 47373****67282882", value: "47373****67282882" },
      { label: "MASTACARD | 58038****73833", value: "1118272726" },
      { label: "VISA | 73892****73827", value: "1518272725" },
    ];
    
    const onChange = (value: string) => {
      onValueChange(value)
    };
  
    const onSearch = (value: string) => {
      console.log("search:", value);
    };
  
    const filterOption = (
      input: string,
      option?: { label: string; value: string }
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  
    return (
      <div className="provider_account_search">
        <Select
          showSearch
          placeholder={options[0].value}
          style={{
            width: 200,
            display: "inline-block",
            color: colorToken.text.description_01,
          }}
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          options={options}
          filterOption={filterOption}
        />
      </div>
    );
  };
  
export default CardProvider