
import styles from "./roles-form.module.css"
import React from 'react'
import { useTokens } from '@/src/app/(context)/ColorContext';
import PrimaryButton from '@/src/components/atoms/button/primary-button/primary-button';
import { Form, Input } from 'antd';

type RolesFormProps = {
    setActiveStep: (step: number) => void;
};

const RolesForm = ({ setActiveStep }: RolesFormProps) => {
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

export default RolesForm;

