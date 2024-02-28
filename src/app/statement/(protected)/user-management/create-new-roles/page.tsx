"use client";

import React, { CSSProperties, useState } from "react";
import CustomerProfileLayout from "../../../../../components/molecules/shared-features/layout/customerProfileLayout";
import { Steps } from "antd";
import { checkIcon } from "@/src/components/atoms/svg/document_svg";
import RoleCreationForm from "../../../../../components/molecules/user-management/shared/role-permission/role-creation-form";
import PermissionCreationForm from "../../../../../components/molecules/user-management/shared/role-permission/permission-creation-form";
import { useTokens } from "@/src/app/(context)/ColorContext";

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

const RolePermission = () => {
  const [activeStep, setActiveStep] = useState(0);
  const token = useTokens();

  const handleStepClick = (step: any) => {
    setActiveStep(step);
  };

  const defaultColor = token.text.secondary;

  const rolePermissionCss: CSSProperties = {
    display: "flex",
    padding: "32px 48px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "64px",
    background: token.default.white,
  };

  const stepperOptionContentCss: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    width: "593px",
    gap: "48px",
  };
  return (
    <div className="role-permission" style={rolePermissionCss}>
      <CustomerProfileLayout>
        <div style={stepperOptionContentCss}>
          <Steps
            size="small"
            direction="vertical"
            current={activeStep}
            items={mapItemsToStepperOptions()}
          />
          {activeStep === 0 && (
            <RoleCreationForm
              setActiveStep={setActiveStep}
              checkIcon={checkIcon}
            />
          )}
          {activeStep === 1 && <PermissionCreationForm />}
        </div>
      </CustomerProfileLayout>
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
      onClick: () => handleStepClick(index),
    }));
  }
};

export default RolePermission;
