import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; 
import styles from "./permissions.list.module.css";
import { Modal, Steps } from 'antd';
import CheckboxComponent from '@/src/components/widgets/checkbox/checkbox';
import { useGroup } from '../context/permissionsContext';
import GroupCreationConfirm from '../modals/groupConfirm';

const PermissionsLists = () => {
  const searchParams = useSearchParams();
  const { groupName, description, permissions, setGroupName, setDescription, setPermissions } = useGroup();
  const [localPermissions, setLocalPermissions] = useState<string[]>(permissions);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  useEffect(() => {
    const groupNameParam = searchParams.get('groupName');
    const descriptionParam = searchParams.get('description');

    if (groupNameParam && descriptionParam) {
      const decodedGroupName = decodeURIComponent(groupNameParam);
      const decodedDescription = decodeURIComponent(descriptionParam);
      setGroupName(decodedGroupName);
      setDescription(decodedDescription);
    }
  }, [searchParams, setGroupName, setDescription]);

  useEffect(() => {
  }, [localPermissions]);

  const handlePermissionChange = (permission: string) => {
    if (localPermissions.includes(permission)) {
      setLocalPermissions(localPermissions.filter(p => p !== permission));
    } else {
      setLocalPermissions([...localPermissions, permission]);
    }
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log('Submitting Permissions:', localPermissions);
    setPermissions(localPermissions);
    setIsConfirmModalVisible(true);
  };

  const handleConfirm = () => {
    console.log('Group creation confirmed');
    setIsConfirmModalVisible(false);
  };

  const handleCancel = () => {
    console.log('Group creation cancelled');
    setIsConfirmModalVisible(false);
  };

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
          <form className={styles.formdiv} onSubmit={handleSubmit}>
           <div className={styles.checkboxdiv}> 
              <div className={styles.topdiv}>
                {permissionsData.slice(0, 2).map((section) => (
                  <div key={section.title} className={styles.acctpermissions}>
                    <div className={`${styles.cardName} h6r`}>{section.title}</div>
                    {section.permissions.map((permission) => (
                      <CheckboxComponent
                        key={permission}
                        text={permission}
                        checked={localPermissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className={styles.lowerdiv}>
                {permissionsData.slice(2).map((section) => (
                  <div key={section.title} className={styles.acctpermissions}>
                    <div className={`${styles.cardName} h6r`}>{section.title}</div>
                    {section.permissions.map((permission) => (
                      <CheckboxComponent
                        key={permission}
                        text={permission}
                        checked={localPermissions.includes(permission)}
                        onChange={() => handlePermissionChange(permission)}
                      />
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

      <Modal
        visible={isConfirmModalVisible}
        footer={null}
        onCancel={handleCancel}
        width={"39%"}
      >
        <GroupCreationConfirm 
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default PermissionsLists;
