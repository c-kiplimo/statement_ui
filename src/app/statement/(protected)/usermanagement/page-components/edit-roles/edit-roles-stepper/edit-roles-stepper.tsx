import React, { useState } from "react";
import styles from "./edit-roles-stepper.module.css";
import { useTokens } from "@/src/app/(context)/ColorContext";
import EditRolesForm from "../edit-role-form/edit-role-form";
import { Steps, notification } from "antd";
import RolesLayout from "../../shared/layout/rolesLayout";
import SetPermissionForm from "../../create-roles/set-permissions/set-permissions";
import { useFormContext } from "../../../context/userGroupContext";
import { GroupHandler } from "@/src/services/usermanagement/user.goups.service";

 const userManagementData = [
  {
    title: "Edit Role",
    description: "Edit user group",
  },
  {
    title: "Permissions",
    description: "Assign permissions to group",
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

const EditRolesStepper = ({ groupId }: { groupId: number }) => {
  const [activeStep, setActiveStep] = useState(0);
  const token = useTokens();
  const { formData, setFormData } = useFormContext();
  const {editUserGroup} = GroupHandler();

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

    setFormData((prevData) => ({
      ...prevData,
      permission: checkedPermissions,
    }));

    try{
      const response=await editUserGroup(groupId,{
        ...formData,
        permission:checkedPermissions,
      })
      notification.success({
        message: "Group Update Successful",
        description: "The group has been updated successfully!",
      });
      console.log("Group updated successfully",response);
      setActiveStep(1);
    }catch(error) {
      console.error("Failed to update group:", error);
      notification.error({
        message: " Failed",
        description:
          "Sorry,an error might have occurred during group update. Please try again later.",
      });
    }
  };

  const defaultColor = token.text.secondary;
  return (
      <div className={styles.container}>
        <RolesLayout>
          <div className={styles.stepperWrapper}>
            <Steps
              size="small"
              direction="vertical"
              current={activeStep}
              items={mapItemsToStepperOptions()}
            />
            {activeStep === 0 && (
              <EditRolesForm setActiveStep={setActiveStep} groupId={groupId} />
            )}
            {activeStep === 1 && (
              <SetPermissionForm
              checkboxData={checkboxData}
              handleCheckboxChange={handleCheckboxChange}
              handleSubmit={handleSubmit}
              title={"Edit Permissions"}
              description={"Select all that apply"}
            /> 
            )}
          </div>
          <div>User Group: {JSON.stringify(formData)}</div>
        </RolesLayout>
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
      )
    }));
  }
};


export default EditRolesStepper;


