import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from "./permissions.list.module.css";
import { Modal, Steps } from 'antd';
import CheckboxComponent from '@/src/components/widgets/checkbox/checkbox';
import { useGroup } from '../context/permissionsContext';
import GroupCreationConfirm from '../modals/groupConfirm';
import { fetchUserPermissions } from '@/src/lib/actions/all.permissions.action';

export interface AllPermission {
  key?: React.Key;
  title: string;
  permissions: { permission: string }[];
}

const PermissionsLists = () => {
  const searchParams = useSearchParams();
  const { groupName, description, permissions, setGroupName, setDescription, setPermissions } = useGroup();
  const [localPermissions, setLocalPermissions] = useState<string[]>(permissions);
  const [permissionsData, setPermissionsData] = useState<AllPermission[]>([]);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const data = await fetchUserPermissions();
        setPermissionsData(data);
      } catch (error) {
        console.error('Error fetching permissions:', error);
        alert('Failed to load permissions. Please try again later.');
      }
    };

    getPermissions();
  }, []);

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

  const handlePermissionChange = (permission: string) => {
    setLocalPermissions(prevPermissions =>
      prevPermissions.includes(permission)
        ? prevPermissions.filter(p => p !== permission)
        : [...prevPermissions, permission]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (localPermissions.length === 0) {
      alert('Please select at least one permission.');
      return;
    }
    console.log('Submitting Permissions:', localPermissions);
    setPermissions(localPermissions);
    setIsConfirmModalVisible(true);
  };

  const handleConfirm = () => {
    console.log('Group creation confirmed');
    setIsConfirmModalVisible(false);
    // Additional actions such as redirecting or resetting states can be added here
  };

  const handleCancel = () => {
    console.log('Group creation cancelled');
    setIsConfirmModalVisible(false);
  };

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
                {permissionsData.slice(0, 2).map(section => (
                  <div key={section.title} className={styles.acctpermissions}>
                    <div className={`${styles.cardName} h6r`}>{section.title}</div>
                    {section.permissions.map(permission => (
                      <CheckboxComponent
                        key={permission.permission}
                        text={permission.permission}
                        checked={localPermissions.includes(permission.permission)}
                        onChange={() => handlePermissionChange(permission.permission)}
                        aria-label={`Select ${permission.permission} permission`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className={styles.lowerdiv}>
                {permissionsData.slice(2).map(section => (
                  <div key={section.title} className={styles.acctpermissions}>
                    <div className={`${styles.cardName} h6r`}>{section.title}</div>
                    {section.permissions.map(permission => (
                      <CheckboxComponent
                        key={permission.permission}
                        text={permission.permission}
                        checked={localPermissions.includes(permission.permission)}
                        onChange={() => handlePermissionChange(permission.permission)}
                        aria-label={`Select ${permission.permission} permission`}
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
        width={"min-content"}
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
