"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import { FilterOutlined } from "@ant-design/icons";

const Dev = () => {
  const handleClick=()=>{

  }
  return (
    <Fragment>
      <FilterButton onClick={handleClick}>
        <FilterButton.Icon>
          <FilterOutlined/>
        </FilterButton.Icon>
        <FilterButton.Text title="Filter"/>
      </FilterButton>
    </Fragment>
  );
};

export default withContainer(Dev);
