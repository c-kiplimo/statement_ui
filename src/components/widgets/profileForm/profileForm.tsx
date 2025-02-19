import React, { useEffect, useState } from "react";
import styles from "./profileForm.module.css";
import { Label } from "../../atoms/label/label";
import { Select, Input } from "antd";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import { useTokens } from "@/src/app/(context)/ColorContext";
import CustomButton from "../../atoms/button/customButton";

const { Option } = Select;

type FormField = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  options?: string[];
  htmlFor?: string;
  value?: string;
};

type CustomerProfileProps = {
  title: string;
  description: string;
  fields: FormField[];
  onChange: (value: string) => void;
};

const CustomerProfile = ({
  title,
  description,
  fields,
  onChange,
}: CustomerProfileProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const token = useTokens();

  useEffect(() => {
    const initialFormData = fields.reduce(
      (acc: { [key: string]: string }, field) => {
        acc[field.id] = field.value || "";
        return acc;
      },
      {}
    );
    setFormData(initialFormData);
  }, [fields]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isAnyFieldEmpty = fields.some((field) => !formData[field.id]);

    if (isAnyFieldEmpty) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Form submitted with data:", formData);
  };

  const handleChange = (identifier: string, value: string) => {
    setFormData((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));

    if (identifier === "account-number") {
      onChange(value);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formBody}>
          <div className={styles.header}>
            <VerticalInfoDescription
              title={title}
              description={description}
              titleStyle={{
                color: token.text.secondary,
                fontSize: "20px",
                fontWeight: "700",
              }}
            />
          </div>

          {fields.map((field) => (
            <div key={field.id} className={styles.inputField}>
              <Label htmlFor={field.htmlFor || field.id} label={field.label} />
              {field.type === "select" ? (
                <Select
                  placeholder={field.placeholder}
                  style={{ width: "100% " }}
                  onChange={(value) => handleChange(field.id, value)}
                  value={formData[field.id]}
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
        </div>
        <div className={styles.button}>
          <CustomButton
            bgColor="var(--brand-brand-primary)"
            type="submit"
            className={`${styles.searchBtn} bodyr`}
            text="Search"
          />
        </div>
      </form>
    </div>
  );
};

export default CustomerProfile;
