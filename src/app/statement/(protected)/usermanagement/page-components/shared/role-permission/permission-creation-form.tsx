import React, { CSSProperties, Fragment, useState } from "react";
import styles from "./permission-creation-form.module.css";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import { checkIcon } from "@/src/components/atoms/svg/document_svg";
import Checkbox from "@/src/components/atoms/input/checkbox/checkbox";
import Button from "@/src/components/atoms/button/button";
import { FontType } from "@/src/types/context.types";
import ReusableText from "@/src/components/atoms/paragraph/reusableText";
import { Form } from "antd";

type PermissionProp = {
  title: string;
  description: string;
};
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

const PermissionCreationForm = ({ title, description }: PermissionProp) => {
  const token = useTokens();
  const font = useFont();

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

  const paragraphCss: CSSProperties = {
    color: token.text.primary,
    ...font.typography.h5.regular,
  };

  const paragraphStylesCss: CSSProperties = {
    color: token.text.primary,
    ...font.typography.h6.regular,
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={`${styles.title} h6r`}>{title}</span>
        <span className={`${styles.subTitle} bodyr`}>{description}</span>
      </div>
      <Form className={styles.wrapper}>
        <div className={styles.permissions}>
          {Object.entries(checkboxGroups).map(([group, checkboxes]) => (
            <CheckboxGroup
              key={group}
              title={group}
              checkboxes={checkboxes}
              onCheckboxChange={(id, checked) =>
                handleCheckboxChange(id, checked, group)
              }
            />
          ))}
        </div>
        <Form.Item className={styles.button}>
          <div className={styles.buttonWrapper}>
            <Button
              label="Complete"
              bgColor={token.brand.primary}
              textColor={token.default.white}
              onClick={() => {
                console.log("button-clicked");
              }}
              style={{ width: "100%" }}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

type CheckboxGroupProps = {
  title: string;
  checkboxes: CheckboxItem[];
  onCheckboxChange: (id: string, checked: boolean) => void;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
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

export default PermissionCreationForm;
