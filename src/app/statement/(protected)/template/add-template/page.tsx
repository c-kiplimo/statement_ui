"use client";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import AddTemplateButton from "@/src/components/widgets/add-template/add.template";
import { SearchOutlined } from "@ant-design/icons";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import TemplatesTable from "./(template-table)/template.table";
import { useState } from "react";
import { Modal } from "antd";
import AddTemplateModal from "./(add-template-modal)/add.template.modal";

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

const templateData = [
  {
    id: 1,
    templateName: "Bank Statement Summary",
    templateDescription:
      "Finance template Includes opening and closing balances, detailed transaction list",
  },
  {
    id: 2,
    templateName: "Detailed Transaction Log",
    templateDescription:
      "Comprehensive log of all transactions within a specific period",
  },
  {
    id: 3,
    templateName: "Account Activity Report",
    templateDescription:
      "Tracks all account activities for monitoring and compliance",
  },
  {
    id: 4,
    templateName: "Year-End Summary Report",
    templateDescription:
      "Annual summary of financial activities and account status",
  },
];

const AddTemplate = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState(data);
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

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

  const handleAddTemplate = () => {
    setOpen(true);
  };

  const handleClick = () => {};

  return (
    <main className={"flex flex-col justify-center items-start w-full gap-6"}>
      <div
        className={
          "flex items-center justify-between pt-8 pr-6 pb-4 pl-4 w-full"
        }
      >
        <p className={`h6b`}>TEMPLATE</p>
        <div className={"flex flex-row justify-end items-center gap-4"}>
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
      <div className={"w-full"}>
        <TemplatesTable templates={filteredTemplates} />
      </div>
      <div>
        <Modal
          onCancel={handleCancel}
          open={open}
          footer={false}
          width={"max-content"}
        >
          <AddTemplateModal onCancel={handleCancel} templates={templateData} />
        </Modal>
      </div>
    </main>
  );
};

export default AddTemplate;
