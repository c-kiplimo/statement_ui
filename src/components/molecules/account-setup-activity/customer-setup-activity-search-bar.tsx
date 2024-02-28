import React from "react";
import CustomSelectBox from "../../atoms/input/custom-select";
import { DropdownIcon } from "../../atoms/svg/document_svg";
import { CustomText } from "../../atoms/typography/primary_text";
import { useFont, useTokens } from "../../../app/(context)/ColorContext";

const CustomerSetupActivitySearchBar = () => {
  const token = useTokens();
  const font = useFont();

  const cities = ["Date Last month", "Type All", "Asset All", "Status All"];
  return (
    <div
      style={{
        display: "flex",
        padding: "16px 24px",
        alignItems: "center",
        backgroundColor: token.default.white,
        justifyContent: "space-between",
        alignSelf: "stretch",
      }}
    >
      <CustomText
        title="Activity History"
        fontSize={font.typography.h6.bold.fontSize}
        textColor={token.text.description_01}
        lineHeight={font.typography.h6.bold.lineHeight}
        fontWeight={font.typography.h6.bold.fontWeight}
        className="custom-text"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <CustomSelectBox
          options={cities}
          defaultSelected="Date Last month"
          onSelect={(selectedCity) => console.log(`Selected: ${selectedCity}`)}
          iconComponent={DropdownIcon}
          iconColor="text-red-500"
          borderColor={token.default.grey}
        />
        <CustomSelectBox
          options={cities}
          defaultSelected="Type All"
          onSelect={(selectCity) => console.log(`Selected: ${selectCity}`)}
          iconComponent={DropdownIcon}
          iconColor="text-green-500"
          borderColor={token.default.grey}
        />
        <CustomSelectBox
          options={cities}
          defaultSelected="Asset All"
          onSelect={(selectCity) => console.log(`Selected: ${selectCity}`)}
          iconComponent={DropdownIcon}
          iconColor="text-green-500"
          borderColor={token.default.grey}
        />
        <CustomSelectBox
          options={cities}
          defaultSelected="Status All"
          onSelect={(selectCity) => console.log(`Selected: ${selectCity}`)}
          iconComponent={DropdownIcon}
          iconColor="text-green-500"
          borderColor={token.default.grey}
        />
      </div>
    </div>
  );
};

export default CustomerSetupActivitySearchBar;
