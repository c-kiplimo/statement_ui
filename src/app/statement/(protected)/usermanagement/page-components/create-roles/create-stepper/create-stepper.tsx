import React, { Fragment, useState } from "react";
import styles from "./create-stepper.module.css";
import { Steps, notification } from "antd";
import { useTokens } from "@/src/app/(context)/ColorContext";
import RoleCreationForm from "../role-creation-form/role-creation-form";
import SetPermissionForm from "../set-permissions/set-permissions";
import { useFormContext } from "../../../context/userGroupContext";
import { GroupHandler } from "@/src/services/usermanagement/user.goups.service";
import { useRouter } from "next/navigation";
//import { useFormContext } from "../../../context/userGroupContext";

export const userManagementData = [
  {
    title: "Create Role",
    description: "Description",
  },
  {
    title: "Permissions",
    description: "Description",
  },
];

type CheckboxItem = {
  id: string;
  label: string;
  checked: boolean;
};

const checkboxData: { [group: string]: CheckboxItem[] } = {
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

const CreateRole = () => {
  const [activeStep, setActiveStep] = useState(0);
  const token = useTokens();
  const defaultColor = token.text.secondary;
  const { formData, setFormData } = useFormContext();
  const { addUserGroup } = GroupHandler();
  const router = useRouter();

  const handleCheckboxChange = (
    id: string,
    checked: boolean,
    group: string,
    setCheckboxGroups: React.Dispatch<
      React.SetStateAction<{ [group: string]: CheckboxItem[] }>
    >
  ) => {
    setCheckboxGroups((prevGroups) => ({
      ...prevGroups,
      [group]: prevGroups[group].map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked } : checkbox
      ),
    }));
  };

  const handleSubmit = async (checkedItems: CheckboxItem[]) => {
    const checkedPermissions = checkedItems
      .filter((item) => item.checked)
      .map((item) => item.label);

    setFormData((prevData: any) => ({
      ...prevData,
      permission: checkedPermissions,
    }));

    try {
      const response = await addUserGroup({
        ...formData,
        permission: checkedPermissions,
      });
      console.log("User Group created successfully:", response);
      notification.success({
        message: "Group Creation Successful",
        description: "The group has been added successfully!",
      });
      router.push("/statement/usermanagement");
    } catch (error) {
      console.error("Failed to create User Group:", error);
      notification.error({
        message: " Failed",
        description:
          "Sorry,an error might have occurred during group creation. Please try again later.",
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.stepperWrapper}>
        <Steps
          size="small"
          direction="vertical"
          current={activeStep}
          items={mapItemsToStepperOptions()}
        />
        {activeStep === 0 && <RoleCreationForm setActiveStep={setActiveStep} />}
        {activeStep === 1 && (
          <SetPermissionForm
            checkboxData={checkboxData}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
            title={"Set Permissions"}
            description={"Select all that apply"}
          />
        )}
      </div>
      <div>User Group: {JSON.stringify(formData)}</div>
    </div>
  );

  function mapItemsToStepperOptions() {
    return userManagementData?.map((step, index) => ({
      title: (
        <p
          className="stepper-title"
          style={{
            color: activeStep === index ? token.brand.secondary : defaultColor,
          }}
        >
          {step?.title}
        </p>
      ),
      description: (
        <p
          className="stepper-description "
          style={{
            color:
              activeStep === index
                ? token.brand.secondary
                : token.text.description_01,
          }}
        >
          {step?.description}
        </p>
      ),
    }));
  }
};

export default CreateRole;
