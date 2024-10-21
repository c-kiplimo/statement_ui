import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import styles from "./role-creation-form.module.css";
import { useTokens } from "@/src/app/(context)/ColorContext";
import { Form, Input } from "antd";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import Texter from "@/src/components/atoms/text/texter";
import { useFormContext } from "../../../context/userGroupContext";
import useProfileId from "@/src/hooks/profileId";


type RoleCreationFormProps = {
  setActiveStep: Dispatch<SetStateAction<number>>;
};

type FormValues={
  roleName: string;
  description: string;
}

const RoleCreationForm: React.FC<RoleCreationFormProps> = ({
  setActiveStep,
}) => {
  
  const token = useTokens();
  const [roles,setRoles]=useState<FormValues>({
    roleName:"",
    description:""
  })
  const profId = useProfileId();
  const { formData, setFormData } = useFormContext();

  const handleInputChange =(values:string)=>(e: React.ChangeEvent<HTMLInputElement>)=>{
    setRoles({
      ...roles,
      [values]:e.target.value,
    })
  }

  const handleSubmit= (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submitted with values:", roles);
    setFormData({ groupName: roles.roleName, description: roles.description ,permission:formData.permission,customerId: profId,});
    setActiveStep(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formHeader}>
        <Texter text="Create Role" className="h4r" />
      </div>

      <div className={styles.formBody}>
          <Form
            style={{ width: "100%" }}
            initialValues={{ prefix: "+1" }}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={handleSubmit}
          >
            <Form.Item
            className={styles.formItem}
              name="roleName"
              colon={false}
              rules={[{ required: true, message: "Please enter Role Name" }]}
              label={<span className={`${styles.inputLabel} bodyr`}>Role Name</span>}
            >
              <Input
              style={{ borderColor: token.default.grey }}
              placeholder="Enter a role name"
              value={roles.roleName}
              onChange={handleInputChange("roleName")}
            />
            </Form.Item>
            <Form.Item
            className={styles.formItem}
              colon={false}
              name="description"
              label={<span className={`${styles.inputLabel} bodyr`}>Description</span>}
              rules={[{ required: false, message: "Please enter description" }]}
            >
              <Input
              style={{ borderColor: token.default.grey }}
              placeholder="Enter a description"
              value={roles.description}
              onChange={handleInputChange("description")}
            />
            </Form.Item>

            <Form.Item className={styles.submitBtn}>
              <PrimaryButton
              htmlType="submit"
              buttonType="default"
              // iconPosition="right"
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
            </Form.Item>
          </Form>
        </div>
    
    </div>
  );
};

export default RoleCreationForm;