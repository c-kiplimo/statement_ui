import React from 'react';
import styles from "./permissions.list.module.css";
import { Steps } from 'antd';
import CheckboxComponent from '../checkbox/checkbox';

const Permissions = () => {
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
      <div className={styles.stepperBar}>
        <div className={styles.stepper}>
          <Steps
            direction="vertical"
            current={1}
            items={[
              {
                title: 'Define Group',
                description: "Group details",
                className: styles.step1,
              },
              {
                title: 'Set Permissions',
                description: "Assign permissions",
              },
            ]}
          />
        </div>
      </div>
      <div className={styles.permissionsdiv}>
        <div className={styles.headerDiv}>
          <div className={`${styles.title} h5b`}>Assign Permissions to Financial Managers</div>
          <div className={`${styles.description} bodyr`}>Select the appropriate permissions that you want this group to have access to</div>
        </div>
        <div className={styles.bodyDiv}>
          <form className={styles.formdiv}>
            <div className={styles.checkboxdiv}>
              <div className={styles.topdiv}>
                {permissionsData.slice(0, 2).map((section) => (
                  <div key={section.title} className={styles.acctpermissions}>
                    <div className={`${styles.cardName} h6r`}>{section.title}</div>
                    {section.permissions.map((permission) => (
                      <CheckboxComponent key={permission} text={permission} />
                    ))}
                  </div>
                ))}
              </div>
              <div className={styles.lowerdiv}>
                {permissionsData.slice(2).map((section) => (
                  <div key={section.title} className={styles.acctpermissions}>
                    <div className={`${styles.cardName} h6r`}>{section.title}</div>
                    {section.permissions.map((permission) => (
                      <CheckboxComponent key={permission} text={permission} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.buttondiv}>
              <button type="submit" className={styles.button}>Assign</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Permissions;
