import { Form, Input } from "antd";
import styles from "./edit-role-form.module.css";
import { useTokens } from "@/src/app/(context)/ColorContext";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import Texter from "@/src/components/atoms/text/texter";
import useProfileId from "@/src/hooks/profileId";
import { useState } from "react";
import { useFormContext } from "../../../context/userGroupContext";

type EditRolesFormProps = {
  setActiveStep: (step: number) => void;
 groupId: number;
};

type FormValues={
  roleName: string;
  description: string;
}

const EditRolesForm = ({ setActiveStep,groupId }: EditRolesFormProps) => {
  const token = useTokens();
  const profileId = useProfileId();
  const [roles,setRoles]=useState<FormValues>({
    roleName:"",
    description:""
  })
  const { formData, setFormData } = useFormContext();

  const handleInputChange =(values:string)=>(e: React.ChangeEvent<HTMLInputElement>)=>{
    setRoles({
      ...roles,
      [values]:e.target.value,
    })
  }

  const handleFinish = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submitted with values:", roles);
    setFormData({ groupName: roles.roleName, description: roles.description ,permission:formData.permission});
    setActiveStep(1);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formHeader}>
        <Texter text="Edit Role" className="h4r" />
      </div>
      <div className={styles.formBody}>
        <Form
          style={{ width: "100%" }}
          initialValues={{ prefix: "+1" }}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleFinish} 
        >
          <Form.Item
            className={styles.formItem}
            name="groupName"
            colon={false}
            label={<span className={`${styles.inputLabel} bodyr`}>Role Name</span>}
            rules={[{ required: true, message: "Please enter a role name" }]}
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
            rules={[{ required: false, message: "Please enter a description" }]}
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

export default EditRolesForm;
