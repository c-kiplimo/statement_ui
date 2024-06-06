import React, { useState } from "react";
import { Form} from "antd";
import styles from "./relos.module.css";
import Checkbox from "@/src/components/atoms/input/checkbox/checkbox";
import { checkIcon } from "@/src/components/atoms/svg/document_svg";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";

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
      checked: false,
    },
    { id: "cardSchedule", label: "Card Schedule", checked: false },
  ],
};

const RolesPermission = () => {
  const [checkboxGroups, setCheckboxGroups] = useState<{
    [group: string]: CheckboxItem[];
  }>(checkboxData);

  const handleCheckboxChange = (
    id: string,
    checked: boolean,
    group: string
  ) => {
    setCheckboxGroups((prevGroups) => ({
      ...prevGroups,
      [group]: prevGroups[group].map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked } : checkbox
      ),
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={`${styles.title} h6r`}>Edit Permissions</span>
        <span className={`${styles.subTitle} bodyr`}>
          Select all that Apply
        </span>
      </div>
      <Form className={styles.form}>
        <Form.Item className={styles.grid}>
          {Object.entries(checkboxGroups).map(([group, checkboxes]) => (
            <RolesPermission.CheckBox
              key={group}
              title={group}
              checkboxes={checkboxes}
              onCheckboxChange={(id, checked) =>
                handleCheckboxChange(id, checked, group)
              }
            />
          ))}
        </Form.Item>
      </Form>
    </div>
  );
};

export default RolesPermission;

type CheckboxGroupProps = {
  title: string;
  checkboxes: CheckboxItem[];
  onCheckboxChange: (id: string, checked: boolean) => void;
};

RolesPermission.CheckBox = ({
  title,
  checkboxes,
  onCheckboxChange,
}: CheckboxGroupProps) => {
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
