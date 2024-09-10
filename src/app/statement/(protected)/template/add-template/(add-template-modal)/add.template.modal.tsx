import React, { ReactNode, useState } from "react";
import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import SelectionCard from "@/src/components/widgets/card-info/card-info-radio";

export interface TemplateTypes {
  id: number;
  templateName: string;
  templateDescription: string;
  icon?: ReactNode;
}
interface Props {
  onCancel: (e: any) => void;
  templates: TemplateTypes[];
}

const AddTemplateModal = ({ onCancel, templates }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleClick = () => {};

  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === newValue ? null : String(newValue)
    );
  };
  return (
    <main className={"flex flex-col rounded-xl gap-8 pt-8"}>
      <div className={"flex justify-between"}>
        <span className={`h6b`}>ADD TEMPLATE</span>
        <div className={"flex justify-end items-center gap-4"}>
          <button
            className={
              "flex items-center justify-center border gap-2 text-[#6F7269] border-[#E6E6E6] rounded px-4 py-2 h-8"
            }
          >
            <span>
              <TableOutlined />
            </span>
            <span>Grid</span>
          </button>

          <button
            className={
              "flex items-center justify-center border gap-2 text-[#84BD00] border-[#84BD00] rounded px-4 py-2 h-8"
            }
          >
            <span>
              <UnorderedListOutlined />
            </span>
            <span>List</span>
          </button>
        </div>
      </div>

      <div className={"gap-6"}>
        {templates.map((item) => (
          <div className={"mb-4"}>
            <SelectionCard
              id={item.id.toString()}
              icon={item.icon!}
              label={item.templateName}
              description={item.templateDescription}
              name={""}
              onSelection={() => handleOptionChange(item.id)}
              activeCardId={selectedOption}
              borderColor={"#034685"}
            />
          </div>
        ))}
      </div>

      <div className={"flex justify-end items-center gap-10"}>
        <button
          className={
            "flex px-8 py-2 border border-[#E6E6E6] rounded text-[#6F7269] items-center"
          }
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className={
            "flex items-center px-8 py-2 text-[#FFFFFF] bg-[#84BD00] rounded"
          }
        >
          Add Template
        </button>
      </div>
    </main>
  );
};

export default AddTemplateModal;
