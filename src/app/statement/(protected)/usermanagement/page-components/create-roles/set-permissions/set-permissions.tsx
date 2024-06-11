import React, { useState } from "react";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import { checkIcon } from "@/src/components/atoms/svg/document_svg";
import Checkbox from "@/src/components/atoms/input/checkbox/checkbox";
import styles from "./set-permission.module.css";
import { Form } from "antd";
import Texter from "@/src/components/atoms/text/texter";

type CheckboxItem = {
  id: string;
  label: string;
  checked: boolean;
};

type SetPermissionFormProps = {
  checkboxData: { [group: string]: CheckboxItem[] };
  handleCheckboxChange: (
    id: string,
    checked: boolean,
    group: string,
    setCheckboxGroups: React.Dispatch<
      React.SetStateAction<{ [group: string]: CheckboxItem[] }>
    >
  ) => void;
  handleSubmit: (checkedItems: CheckboxItem[]) => void;
  title: string;
  description: string;
};

const SetPermissionForm= ({
  title,
  description,
  checkboxData,
  handleCheckboxChange,
  handleSubmit,
}:SetPermissionFormProps) => {
  const token = useTokens();
  const font = useFont();
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const checkedItems = Object.values(checkboxGroups).flat();
    handleSubmit(checkedItems);
  };

  const [checkboxGroups, setCheckboxGroups] = useState<{
    [group: string]: CheckboxItem[];
  }>(checkboxData);

  const handleChange = (id: string, checked: boolean, group: string) => {
    handleCheckboxChange(id, checked, group, setCheckboxGroups);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Texter text={title} className={`${styles.title} h6r`} />
        <Texter text={description} className={`${styles.subTitle} bodyr`} />
      </div>
      <Form className={styles.wrapper} onFinish={handleFormSubmit}>
        <div className={styles.permissions}>
          {Object.entries(checkboxGroups).map(([group, checkboxes]) => (
            <CheckboxGroup
              key={group}
              title={group}
              font={font}
              checkboxes={checkboxes}
              onCheckboxChange={(id, checked) =>
                handleChange(id, checked, group)
              }
            />
          ))}
        </div>
        <Form.Item className={styles.button}>
          <div className={styles.buttonWrapper}>
            <button
              type="submit"
              style={{
                backgroundColor: token.brand.primary,
                color: token.default.white,
                width: "100%",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Complete
            </button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

type CheckboxGroupProps = {
  title: string;
  font: any;
  checkboxes: CheckboxItem[];
  onCheckboxChange: (id: string, checked: boolean) => void;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  font,
  checkboxes,
  onCheckboxChange,
}) => {
  const token = useTokens();
  return (
    <div className={styles.checkBox}>
      <span className={`${styles.checkTitle} h6r`}>{title}</span>
      <div className={styles.checkCont}>
        {checkboxes.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            checkIcon={checkIcon}
            checkboxLabel={checkbox.label}
            checked={checkbox.checked}
            onChange={(checked) => onCheckboxChange(checkbox.id, checked)}
            bordercolor={token.brand.primary}
            defaultGrey={token.default.grey}
            defaultWhite={token.default.white}
          />
        ))}
      </div>
    </div>
  );
};

export default SetPermissionForm;
