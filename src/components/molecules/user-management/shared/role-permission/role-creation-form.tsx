"use client";

import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import styles from "./role-creation-form.module.css";
import { useTokens } from "@/src/app/(context)/ColorContext";
import ParagraphText from "@/src/components/atoms/paragraph/paragraphText";
import { Form, Input } from "antd";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";

type RoleCreationFormProps = {
  checkIcon: React.ReactNode;
  setActiveStep: Dispatch<SetStateAction<number>>;
};

const RoleCreationForm: React.FC<RoleCreationFormProps> = ({
  checkIcon,
  setActiveStep,
}) => {
  const token = useTokens();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "64px",
      }}
    >
      <div>
        <ParagraphText
          styles={{
            color: token.text.primary,
            fontSize: "31.25px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "40px",
          }}
          description="Create Role"
        />
      </div>

      <Fragment>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "350px",
            gridTemplateRows: "repeat(2, auto)",
            gap: "32px",
          }}
        >
          <Form
            style={{ width: "100%" }}
            initialValues={{ prefix: "+1" }}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={(values) => console.log("Form values:", values)}
          >
            <Form.Item
              name="roleName"
              colon={false}
              rules={[{ required: true, message: "Please enter Role Name" }]}
              label={<span className={styles.inputLabel}>Role Name</span>}
            >
              <Input placeholder="Role Name" />
            </Form.Item>
            <Form.Item
              colon={false}
              name="description"
              label={<span className={styles.inputLabel}>Description</span>}
              rules={[{ required: false, message: "Please enter description" }]}
            >
              <Input placeholder="Description" />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <PrimaryButton
                htmlType="submit"
                buttonType="default"
                iconPosition="right"
                shape="default"
                size="large"
                customStyles={{
                  background: token.brand.primary,
                  marginTop: "56px",
                  width: "100%",
                  color: token.default.white,
                  border: `1px solid ${token.brand.primary}`,
                }}
                onClick={() => {
                  setActiveStep(1);
                  console.log("Form submitted");
                }}
              >
                Create Role
              </PrimaryButton>
            </Form.Item>
          </Form>
        </div>
      </Fragment>
    </div>
  );
};

export default RoleCreationForm;
