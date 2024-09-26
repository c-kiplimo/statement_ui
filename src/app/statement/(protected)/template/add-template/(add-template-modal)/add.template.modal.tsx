import React, { ReactNode, useEffect, useState } from "react";
import { CheckCircleFilled, CloseOutlined, TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import SelectionCard from "@/src/components/widgets/card-info/card-info-radio";
import { Modal, notification } from "antd";
import ConfirmTemplateAddition from "../(confirm-template-addition)/confirm-template-addition";
import ConfirmTemplateFail from "../(confirmfailure)/confirm.failure";
import styles from './add.templates.module.css'
import TemplatesHandler from "@/src/services/templates/templates.service";
import useProfileId from "@/src/hooks/profileId";

const handler = TemplatesHandler()

export interface TemplateTypes {
  id: number;
  templateName: string;
  templateDescription: string;
  icon?: ReactNode;
}
interface Props {
  onCancel: () => void;
  onFetch:()=>void;
  templates: TemplateTypes[];
}

const AddTemplateModal = ({ onCancel, onFetch, templates }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [failModalOpen, setFailModalOpen ] = useState(false);  
  const customerId = useProfileId();

  useEffect(()=>{
    setSelectedOption(null)
  },[])

  const handleCancel = () => {
    setSelectedOption(null);
    setOpen(false);
    onCancel();
  };
  const handleFailModalClose =()=>{
    setFailModalOpen(false);
  }
  const handleAddClick = () => {
    setOpen(true);
  }
  const handleConfirmClick =async ()=>{
    try {
      await handler.addUserTemplate(parseInt(selectedOption!), customerId!)
      notification.success({
        message: <span style={{ color: '#fff', marginRight: '16px' }}>The restriction has been created successfully</span>,
        icon: <CheckCircleFilled style={{ color: '#fff', marginRight: '8px' }} />,
        placement: 'top',
        style: {
          backgroundColor: '#52c41a',
          borderRadius: '8px',
          width: 'max-content',
          padding: '8px 16px',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center',
        },
        closeIcon: <CloseOutlined className={styles.closeicon}
      />
    });
    } catch (error) {
      setFailModalOpen(true);
    }
    setSelectedOption(null);
    handleCancel();
    onCancel();
    onFetch();
  }


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

      <div className={styles.body}>
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
          onClick={handleAddClick}
        >
          Add Template
        </button>
      </div>
      <div>
        <Modal
          onCancel={handleCancel}
          open={open}
          footer={false}
        >
          <ConfirmTemplateAddition onCancel={handleCancel} onConfirm={handleConfirmClick}/>
        </Modal>
      </div>

      <div>
        <Modal
          onCancel={handleFailModalClose}
          open={failModalOpen}
          footer={false}
        >
          <ConfirmTemplateFail  title={"Failed to Add Template"} description={"There was an issue adding the template Bank Statement summary. Please try again"} onClick={handleConfirmClick} onCancel={handleFailModalClose} />
        </Modal>
      </div>
    </main>
  );
};

export default AddTemplateModal;
