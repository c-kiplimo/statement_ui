import React from "react";
import styles from "./group.creation.confirm.module.css";
import CheckboxComponent from "@/src/components/atoms/checkbox/checkBox";

const GroupCreationConfirm = () => {
  const permissionsData = [
    {
      title: "Account Permissions",
      permissions: [
        "View Account Details",
        "View Transactions",
        "Manage Accounts",
        "Generate Account Reports",
      ],
    },
    {
      title: "Loan Permissions",
      permissions: [
        "View Loan Details",
        "View Loan Repayments",
        "Manage Loans",
        "Generate Loan Reports",
      ],
    },
    {
      title: "MT 940 Permissions",
      permissions: [
        "View MT940 Statements",
        "Statement Download",
        "Upload MT940 Statements",
        "Configure Account",
      ],
    },
    {
      title: "Card Permissions",
      permissions: [
        "View Card Details",
        "Manage Cards",
        "View Card Transactions",
        "Loan Schedule",
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.cancelButton}>Cancel</div>
      <div className={styles.header}>
        <div className={`${styles.title} h5b`}>Confirm New Group Creation</div>
        <div className={`${styles.description} bodyr`}>
          Please review the group details below before confirming the creation
          of a new group. Ensure all information is accurate.
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.top}>
          <div className={`${styles.profilehead} bodym`}>GROUP DETAILS</div>
          <div className={styles.profile}>
            <div className={styles.name}>
              <div className={`${styles.groupname} bodyr`}>Group Name:</div>
              <div className={`${styles.group} bodyr`}>Financial Managers</div>
            </div>
            <div className={styles.namedescription}>
              <div className={`${styles.descriptionname} bodyr`}>Description:</div>
              <div className={`${styles.group} bodyr`}>
                Managing the financial activities and records of the corporation
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.selectedPermissions}>
            <div className={`${styles.permissionstitle} bodyr`}>ASSIGNED PERMISSIONS</div>
            <div className={styles.permissions}>
              <div className={styles.checkboxdiv}>
                <div className={styles.topdiv}>
                  {permissionsData.slice(0, 2).map((section) => (
                    <div key={section.title} className={styles.acctpermissions}>
                      <div className={`${styles.cardName} h6r`}>{section.title}</div>
                      {section.permissions.map((permission) => (
                        <CheckboxComponent />
                      ))}
                    </div>
                  ))}
                </div>
                <div className={styles.lowerdiv}>
                  {permissionsData.slice(2).map((section) => (
                    <div key={section.title} className={styles.acctpermissions}>
                      <div className={`${styles.cardName} h6r`}>{section.title}</div>
                      {section.permissions.map((permission) => (
                        <CheckboxComponent />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonsdiv}>Button</div>
      </div>
    </div>
  );
};

export default GroupCreationConfirm;
