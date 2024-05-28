import React, { FC, useState } from "react";
import styles from "./create.restriction.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { createRestriction } from "@/src/services/account/create.account.restriction.service";
import { notification } from "antd";

interface CreateRestrictionProps {
  customerId: number;
  visible: boolean;
  onCancel: () => void;
}


const CreateRes: FC<CreateRestrictionProps> = ({
  customerId,
  visible,
  onCancel,
}) => {
  const [restrictionName, setRestrictionName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createRestriction(customerId, { name: restrictionName, description });
      setRestrictionName("");
      setDescription("");
      onCancel();
      notification.success({
        message: "Success",
        description: "Restriction was created Successfully",
      });
    } catch (error) {
      console.error("Error creating restriction:", error);
      notification.error({
        message: "Error",
        description: "Failed to create restriction",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.container}>
        <div className={styles.canceldiv} onClick={onCancel}>
          <CloseOutlined />
        </div>
        <div className={styles.formdiv}>
          <div className={`${styles.title} h4r`}>Create Restriction</div>
          <form onSubmit={handleSubmit}>
            <div className={styles.input}>
              <label className={`${styles.label} bodyr`}>
                Restriction Name<span className={styles.required}>*</span>
              </label>
              <input
                className={styles.restrictionName}
                type="text"
                required
                id="restrictionName"
                name="restrictionName"
                placeholder="Enter Name"
                value={restrictionName}
                onChange={(e) => setRestrictionName(e.target.value)}
              />
              <label className={styles.label}>Description:</label>
              <textarea
                className={styles.descriptionDiv}
                id="description"
                name="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button className={styles.button} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Restriction'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRes;
