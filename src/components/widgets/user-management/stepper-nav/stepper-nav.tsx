import React, { useState } from "react";
import styles from "./stepper-nav.module.css";
import { Form, Input, Steps } from "antd";
import { useTokens } from "@/src/app/(context)/ColorContext";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import PermissionCreationForm from "@/src/app/statement/(protected)/usermanagement/page-components/shared/role-permission/permission-creation-form";
import RolePermission from "@/src/app/statement/(protected)/user-management/create-new-roles/page";
import RolesPermission from "@/src/app/statement/(protected)/usermanagement/page-components/shared/role-permission/roles";

export const userManagementData = [
  {
    title: "Edit Role",
    description: "Edit user group",
  },
  {
    title: "Permissions",
    description: "Assign permissions to group",
  },
];

const StepperNav = () => {
  const [activeStep, setActiveStep] = useState(0);
  const token = useTokens();

  const defaultColor = token.text.secondary;
  return (
    <div className={styles.container}>
      <div className={styles.stepperWrapper}>
        <Steps
          size="small"
          direction="vertical"
          current={activeStep}
          items={mapItemsToStepperOptions()}
        />
        {activeStep === 0 && (
          <StepperNav.RolesForm
            setActiveStep={setActiveStep}
          />
        )}
        {activeStep === 1 && (
          <PermissionCreationForm title={"Edit Permissions"} description={"Select all that apply"}/>
        )}
      </div>
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

export default StepperNav;

type RolesFormProps = {
  setActiveStep: (step: number) => void;
};

StepperNav.RolesForm = ({ setActiveStep }: RolesFormProps) => {
  const token = useTokens();
  return (
    <div className={styles.formContainer}>
      <div className={`${styles.formHeader} h4r`}>Edit Role</div>
      <div className={styles.formBody}>
        <Form
          style={{ width: "100%" }}
          labelCol={{ span: 24 }}
          onFinish={(values) => {
            console.log("Form values:", values);
            setActiveStep(1);
          }}
        >
          <Form.Item
            className={styles.formItem}
            name="roleName"
            colon={false}
            label={
              <span className={`${styles.inputLabel} bodyr`}>Role Name</span>
            }
            rules={[{ required: true, message: "Please enter a role name" }]}
          >
            <Input style={{ borderColor: token.default.grey }} placeholder="Enter a role name" />
          </Form.Item>
          <Form.Item
            className={styles.formItem}
            colon={false}
            name="description"
            label={
              <span className={`${styles.inputLabel} bodyr`}>Description</span>
            }
            rules={[{ required: false, message: "Please enter a description" }]}
          >
            <Input
              style={{ borderColor: token.default.grey }}
              placeholder="Enter a description"
            />
          </Form.Item>
          <div className={styles.submitBtn}>
            <PrimaryButton
              htmlType="submit"
              buttonType="default"
              iconPosition="right"
              shape="default"
              size="large"
              customStyles={{
                background: "var(--brand-brand-primary)",
                width: "100%",
                color: "var(--white)",
                border: `1px solid var(--brand-brand-primary)`,
              }}
            >
              Next
            </PrimaryButton>
          </div>
        </Form>
      </div>
    </div>
  );
};