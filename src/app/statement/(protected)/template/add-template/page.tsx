"use client";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import AddTemplateButton from "@/src/components/widgets/add-template/add.template";
import { SearchOutlined } from "@ant-design/icons";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import TemplatesTable, { TemplatesTypesData } from "./(template-table)/template.table";
import { useEffect, useState } from "react";
import { Checkbox, Modal, Popover } from "antd";
import AddTemplateModal, { TemplateTypes } from "./(add-template-modal)/add.template.modal";
import { allTemplatesAction, fetchTemplatesCategory, fetchUserTemplates } from "@/src/lib/actions/templates/templates.action";
import useProfileId from "@/src/hooks/profileId";

export type TemplateCategory ={
  label:string;
  value:string;
}

const AddTemplate = () => {
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [allTemplates, setAllTemplates]= useState<TemplateTypes[]>([]);
  const [userTemplates, setUserTemplates]= useState<TemplatesTypesData[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<TemplatesTypesData[]>(userTemplates);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [categories, setCategories]= useState<TemplateCategory[]>([])
  const customerId = useProfileId();
  
  async function getAllTemplates() {
    const templates:TemplateTypes[] = await allTemplatesAction(1,20);
    setAllTemplates(templates);
  }

  async function getUserTemplates() {
    const response = await fetchUserTemplates(customerId!);
    setUserTemplates(response);
    setFilteredTemplates(response);
  }

  async function getCategories() {
    const response = await fetchTemplatesCategory(customerId!);
    setCategories(response);
  }

  useEffect(()=>{
        getAllTemplates();
    if(customerId){
    getUserTemplates();
    getCategories();
    }
  }, [customerId])


  

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSearchChange = (searchvalue: any) => {
    const value = searchvalue.toLowerCase();
    setSearchText(value);

    const filteredData = userTemplates.filter(
      (template) =>
        template.templateName.toLowerCase().includes(value) ||
        template.category.toLowerCase().includes(value)
    );
    setFilteredTemplates(filteredData);
  };

  const handleCategoryChange = (checkedValues: any) => {
    setCategoryFilter(checkedValues);
    if (checkedValues.length === 0) {
      setFilteredTemplates(userTemplates);
    } else {
      const filteredData = userTemplates.filter((template) =>
        checkedValues.includes(template.category)
      );
      setFilteredTemplates(filteredData);
    }
  };

  const filterContent = (
    <div className="flex flex-col">
      <Checkbox.Group
        options={categories}
        value={categoryFilter}
        onChange={handleCategoryChange}
      />
    </div>
  );

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

          <Popover
            content={filterContent}
            title="Category"
            trigger="click"
          >
            <FilterButton onClick={handleClick}/>
          </Popover>
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
          style={{ top: 10 }}
        >
          <AddTemplateModal onCancel={handleCancel} templates={allTemplates} onFetch={getUserTemplates}/>
        </Modal>
      </div>
    </main>
  );
};

export default AddTemplate;
