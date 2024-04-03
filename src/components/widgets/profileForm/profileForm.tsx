import React, { useState } from "react";
import styles from "./profileForm.module.css";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import { CloseOutlined } from "@ant-design/icons";
import Label from "../../atoms/label/label";
import { Select, Input } from "antd";
import FormBuilder from "../../molecules/shared-features/form_builder";
import PrimaryButton from "../../atoms/button/primary-button/primary-button";

const { Option } = Select;

type FormField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  options?: string[];
  htmlFor?: string;
};

type CustomerProfileProps = {
  header: string;
  headerDesc: string;
  fields: FormField[];
};

const CustomerProfile = (props: CustomerProfileProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const [formVisible, setFormVisible] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  const handleChange = (identifier: string, value: string) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
  };

  const handleClose = () => {
    setFormVisible(false);
  };

  if (!formVisible) {
    return null;
  }

  return (
    <div className={styles.container}>
      <FormBuilder onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <VerticalInfoDescription
                title={props.header}
                titleStyle={{ fontWeight: "500", fontSize: "20px" }}
              />
              <span className={styles.closeBtn} onClick={handleClose}>
                <CloseOutlined size={16} />
              </span>
            </div>
            <VerticalInfoDescription
              title={props.headerDesc}
              titleStyle={{ fontWeight: "400", fontSize: "12px" }}
            />
          </div>
          {props.fields.map((field) => (
            <div key={field.id} className={styles.inputField}>
              <Label htmlFor={field.htmlFor || field.id} label={field.label} />
              {field.type === "select" ? (
                <Select
                  placeholder={field.placeholder}
                  style={{ width: "100% " }}
                  onChange={(value) => handleChange(field.id, value)}
                >
                  {field.options &&
                    field.options.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                </Select>
              ) : (
                <Input
                  className={styles.input}
                  type={field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  onChange={(event) =>
                    handleChange(field.id, event.target.value)
                  }
                  value={formData[field.id]}
                />
              )}
            </div>
          ))}
          <div className={styles.submitBtn}>
            <PrimaryButton
              htmlType="submit"
              customStyles={{ backgroundColor: "#84bd00", color: "white" }}
            >
              Submit
            </PrimaryButton>
          </div>
        </div>
      </FormBuilder>
    </div>
  );
};

export default CustomerProfile;
