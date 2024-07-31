import React from 'react';
import styles from "./permission.assign.module.css";
import DownloadWidget from '@/src/components/widgets/download-widget/download';
import { CloudDownloadOutlined } from '@ant-design/icons';
import CheckboxComponent from '@/src/components/widgets/checkbox/checkbox';

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

const PermissionAssign = () => {
  return (
    <div className={styles.container}>
        <div className={styles.head}>
            <div className={`${styles.title} h6b`}>Add Permission</div>
            <div className={styles.download}>
                <DownloadWidget>
                    <DownloadWidget.Icon>
                        <CloudDownloadOutlined />
                    </DownloadWidget.Icon>
                    <DownloadWidget.text text="Download" />
                </DownloadWidget>
            </div>
        </div>
        <div className={styles.body}>
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
        </div>
        <div className={styles.buttondiv}>
            <button className={`${styles.cance} bodym`}>Cancel</button>
            <button className={`${styles.tryAgain}`}>Save Changes</button>
        </div>
    </div>
  );
}

export default PermissionAssign;
