"use client";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import styles from "./add.template.module.css";
import AddTemplateButton from "@/src/components/widgets/add-template/add.template";
import { SearchOutlined } from "@ant-design/icons";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import TemplatesTable from "./(template-table)/template.table";
import { useState } from "react";

const data = [
  {
    key: "1",
    dateCreated: "2024-08-25T10:45:23.043",
    templateName: "Statement Summary",
    category: "Finance",
    dateModified: "2024-09-01T10:23:23.043",
  },
  {
    key: "2",
    dateCreated: "2024-07-18T14:00:23.043",
    templateName: "Transaction Log",
    category: "Transactions",
    dateModified: "2024-08-29T10:23:23.043",
  },
  {
    key: "3",
    dateCreated: "2024-05-04T08:30:23.043",
    templateName: "Account Activity Report",
    category: "Monitoring",
    dateModified: "2024-06-21T10:23:23.043",
  },
];

const AddTemplate = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState(data);

  const handleSearchChange = (searchvalue: any) => {
    const value = searchvalue.toLowerCase();
    setSearchText(value);

    const filteredData = data.filter(
      (template) =>
        template.templateName.toLowerCase().includes(value) ||
        template.category.toLowerCase().includes(value)
    );
    setFilteredTemplates(filteredData);
  };

  const handleAddTemplate = () => {};

  const handleClick = () => {};

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <p className={`h6b`}>TEMPLATE</p>
        <div className={styles.headerButtons}>
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined size={16} />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearchChange} />
          </SearchButton>
          <FilterButton onClick={handleClick} />

          <AddTemplateButton
            onClick={handleAddTemplate}
            buttonStyles={{ background: "#003A49", color: "#FFFFFF" }}
          />
        </div>
      </div>
      <div className={styles.body}>
        <TemplatesTable templates={filteredTemplates} />
      </div>
    </main>
  );
};

export default AddTemplate;
