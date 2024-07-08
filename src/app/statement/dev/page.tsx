"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import { CloudDownloadOutlined, FilterOutlined } from "@ant-design/icons";
import DownloadWidget from "@/src/components/widgets/download-widget/download";

const Dev = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (terms: any) => {
    setSearchTerm(terms);
    console.log("search-terms", searchTerm);
  };

  return (
    <Fragment>
      <DownloadWidget>
        <DownloadWidget.Icon>
          <CloudDownloadOutlined/>
        </DownloadWidget.Icon>
        <DownloadWidget.text text="Download"/>
      </DownloadWidget>
    </Fragment>
  );
};

export default withContainer(Dev);
