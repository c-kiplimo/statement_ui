import React, { CSSProperties, Fragment, useState } from "react";
import styles from "./edit-permissions.module.css";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import { checkIcon } from "@/src/components/atoms/svg/document_svg";
import Checkbox from "@/src/components/atoms/input/checkbox/checkbox";
import { Form } from "antd";
import Texter from "@/src/components/atoms/text/texter";
import { useRoleContext } from "../../../context/rolesContext";
import { GroupHandler } from "@/src/services/usermanagement/user.goups.service";

export type CheckboxItem = {
  id: string;
  label: string;
  checked: boolean;
};

export const checkboxData: { [group: string]: CheckboxItem[] } = {
  Account: [
    { id: "accountStatement", label: "Account Statement", checked: false },
    { id: "statementDownload", label: "Statement Download", checked: false },
    { id: "accountOverview", label: "Account Overview", checked: false },
    { id: "configureAccount", label: "Configure Account", checked: false },
  ],
  Loan: [
    { id: "loanStatement", label: "Loan Statement", checked: false },
    { id: "LoanOverview", label: "Loan Overview", checked: false },
    {
      id: "loanStatementDownload",
      label: "Loan Statement Download",
      checked: false,
    },
    { id: "loanSchedule", label: "Loan Schedule", checked: false },
  ],
  MT940: [
    { id: "loanStatement", label: "Loan Statement", checked: false },
    { id: "LoanOverview", label: "Loan Overview", checked: false },
    {
      id: "loanStatementDownload",
      label: "Loan Statement",
      checked: false,
    },
    { id: "loanSchedule", label: "Loan Schedule", checked: false },
  ],
  Card: [
    { id: "cardStatement", label: "Card Statement", checked: false },
    { id: "cardOverview", label: "Card Overview", checked: false },
    {
      id: "cardStatementDownload",
      label: "Card Statement Download",
      checked: false },
    { id: "cardSchedule", label: "Card Schedule", checked: false },
  ],
};

const EditPermissionForm = () => {
  const token = useTokens();
  const font = useFont();
  const { role } = useRoleContext(); 
  const {editUserGroup} =GroupHandler();

  const [checkboxGroups, setCheckboxGroups] = useState<{ [group: string]: CheckboxItem[] }>(checkboxData);

  const handleCheckboxChange = (id: string, checked: boolean, group: string) => {
    setCheckboxGroups((prevGroups) => ({
      ...prevGroups,
      [group]: prevGroups[group].map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked } : checkbox
      ),
    }));
  };

  const handleFinish = () => {
    const selectedPermissions = Object.entries(checkboxGroups).flatMap(([group, checkboxes]) =>
      checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.id)
    );

    const updatedRole = {
      ...role,
      permission: selectedPermissions,
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Texter text="Edit Permissions" className={`${styles.title} h6r`} />
        <Texter text="Select all that apply" className={`${styles.subTitle} bodyr`} />
      </div>
      <Form className={styles.wrapper} onFinish={handleFinish}>
        <div className={styles.permissions}>
          {Object.entries(checkboxGroups).map(([group, checkboxes]) => (
            <CheckboxGroup
              key={group}
              title={group}
              font={font}
              checkboxes={checkboxes}
              onCheckboxChange={(id, checked) => handleCheckboxChange(id, checked, group)}
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
  font: any; // Update this to your actual font type
  checkboxes: CheckboxItem[];
  onCheckboxChange: (id: string, checked: boolean) => void;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ title, font, checkboxes, onCheckboxChange }) => {
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

export default EditPermissionForm;
