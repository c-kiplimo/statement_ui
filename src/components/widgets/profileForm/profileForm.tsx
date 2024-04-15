import React, { useEffect, useState } from "react";
import styles from "./profileForm.module.css";
import { Label } from "../../atoms/label/label";
import { Select, Input, Button } from "antd";
import FormBuilder from "../../molecules/shared-features/form_builder";

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
  fields: FormField[];
  onChange: (value: string) => void;
};

const CustomerProfile = ({ fields, onChange }: CustomerProfileProps) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    // Populate formData with initial values from fields
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
      onChange(value); // Update accountNumber in parent component
    }
  };

  return (
    <>
      <FormBuilder
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-y-10 w-583 h-354 cursor-pointer"
      >
        <div className={styles.formBody}>
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
        <div className={styles.submitBtn}>
          <Button
            style={{ backgroundColor: "var(--brand-brand-primary)" }}
            type="primary"
            htmlType="submit"
            className="bg-primary mt-5 text-white px-9 py-2
            bg-green-900 text-white rounded cursor-pointer"
            onSubmit={handleSubmit}
          >
            Search
          </Button>
        </div>
      </FormBuilder>
    </>
  );
};

export default CustomerProfile;
