import React, { useState, FC } from "react";
import styles from "./add.form.module.css";
import { createCustomerAccountUser } from "@/src/services/userprofile/create.user.service";
import { notification } from "antd";

type AddProps = {
  accountId: number;
  closeIcon: React.ReactNode;
  roleOptions?: string[];
  statusOptions?: string[];
  visible: boolean;
  onCancel: () => void;
  fetchData: () => void;
};

const AddUserModal: FC<AddProps> = ({
  accountId,
  closeIcon,
  roleOptions,
  statusOptions,
  visible,
  onCancel,
  fetchData,
}) => {
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createCustomerAccountUser({
        accountId: accountId,
        email: username,
        role: userRole,
        status: status,
      });
      setUsername("");
      setUserRole("");
      setStatus("");
      notification.success({
        message: "Success",
        description: "User assigned successfully",
      });
      fetchData();
      onCancel();
    } catch (error: any) {
      console.error("Error creating user:", error);
      if (error.response && error.response.status === 409) {
        notification.error({
          message: "Error",
          description: "User already added",
        });
      } else if (error.response && error.response.status === 404) {
        notification.error({
          message: "Error",
          description: "User not found",
        });
      } else if (error.response && error.response.status === 400) {
        notification.error({
          message: "Error",
          description: "Submission was unsuccessful",
        });
      } else {
        notification.error({
          message: "Error",
          description: "Network error occurred",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.container}>
          <div
            className={styles.counceIcon}
            style={{ color: "gray" }}
            onClick={onCancel}
          >
            {closeIcon}
          </div>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.header}>
              <div className={styles.headerText}>Add User</div>
            </div>

            <label className={styles.inputdiv}>
              <div className={styles.requiredUsername}>
                User Name
                <span className={styles.required}>*</span>
              </div>
            </label>
            <input
              className={styles.input}
              type="text"
              required
              id="username"
              name="username"
              placeholder="Enter Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {roleOptions && (
              <>
                <label className={styles.inputdiv}>Select Role</label>
                <select
                  className={styles.input}
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  {roleOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </>
            )}

            {statusOptions && (
              <>
                <label className={styles.inputdiv}>Status</label>
                <select
                  className={styles.input}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </>
            )}

            <div className={styles.bttndiv}>
              <button type="submit">
                {isLoading ? "Creating User..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
