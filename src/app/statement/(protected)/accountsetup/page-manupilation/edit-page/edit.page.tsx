import React, { FC, useState } from "react";
import styles from "./edit.page.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { editRestriction } from "@/src/services/account/edit.account.restriction.service";

interface EditPageModalProps {
  visible: boolean;
  onCancel: () => void;
  restrictionId: any;
}

const EditPageModal: FC<EditPageModalProps> = ({
  visible,
  onCancel,
  restrictionId,
}) => {
  const [restrictionName, setRestrictionName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await editRestriction(restrictionId, {
        name: restrictionName,
        description:description,
      });
      onCancel();
    } catch (error) {
      console.error("Error editing restriction:", error);
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
          <div className={`${styles.title} h4r`}>Edit Restriction</div>
          <form onSubmit={handleSubmit}>
            <div className={styles.input}>
              <label
                htmlFor="restrictionName"
                className={`${styles.label} bodyr`}
              >
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
              <label htmlFor="description" className={styles.label}>
                Description:
              </label>
              <input
                className={styles.descriptionDiv}
                type="text"
                id="description"
                name="description"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <button
              className={styles.button}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Restriction"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPageModal;
