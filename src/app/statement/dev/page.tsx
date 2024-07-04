"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import { SearchOutlined } from "@ant-design/icons";

const Dev = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (terms: any) => {
    setSearchTerm(terms);
    console.log("search-terms", searchTerm);
  };

  return (
    <Fragment>
      <SearchButton >
         <SearchButton.Icon>
          <SearchOutlined size={16}/>
        </SearchButton.Icon>
        <SearchButton.Input text="Search" onSearch={handleSearch}/>
         </SearchButton>
    </Fragment>
  );
};

export default withContainer(Dev);
