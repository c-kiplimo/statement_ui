import { AddUserIcon } from "@/src/components/atoms/svg/document_svg";
import { useTokens, useFont } from "@/src/app/(context)/ColorContext";
import Button from "@/src/components/atoms/button/button";
import React from "react";
import CustomSearchInput from "@/src/components/atoms/input/custom-search";
import ActionButton from "@/src/components/atoms/button/action-button";

const CustomerSetupRestrictionSearchBar = () => {
  const token = useTokens();

  const handleSearch = (record: any) => {
    console.log("handleSearch clicked for:", record);
  };

  const handlerAddRestriction = () => {
    console.log("handlerAddRestriction clicked for:");
  };

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
      <CustomSearchInput
        onSearch={handleSearch}
        borderColor={token.default.grey}
        color={token.text.primary}
        borderWidth="none"
        iconHeight="20px"
      />

      <ActionButton
        onClick={handlerAddRestriction}
        icon={AddUserIcon}
        bgColor={token.accent.info}
        text="Add New  User"
        color={token.default.grey}
      />
    </div>
  );
};

export default CustomerSetupRestrictionSearchBar;
