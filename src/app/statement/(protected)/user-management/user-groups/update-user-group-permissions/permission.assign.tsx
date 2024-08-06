import React, { ReactNode, useEffect, useState } from "react";
import styles from "./permission.assign.module.css";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import { CheckOutlined, CloseOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { fetchUserPermissions } from "@/src/lib/actions/all.permissions.action";
import { AllPermission } from "../permissionsListPage/permissions.list";
import { usePlatformId } from "@/src/hooks/platformId";
import { GroupPermissionsType } from "../group-permissions-home-page/group.permissions";
import { fetchGroupsPermissions } from "@/src/lib/actions/user.groups.action";
import { EDITUSERGROUP } from "@/src/services/usermanagement/update.permissions.service";
import CheckboxComponent from "@/src/components/widgets/checkbox/updateCheckbox/checkbox";
import { Alert, notification } from "antd";
import { useRouter } from "next/navigation";
import Successful from "@/src/components/widgets/success-widget/successfull/successful";

type permissionsProp = {
  onCancel?: () => void;
  groupId: string;
};

export interface AllPermissionTypes {
  key?: React.Key;
  title: string;
  permissions: { permission: string }[];
}

const PermissionAssign = ({ onCancel, groupId }: permissionsProp) => {
  const [permissionsData, setPermissionsData] = useState<AllPermission[]>([]);
  const [permissionData, setPermissionData] = useState<GroupPermissionsType[]>(
    []
  );
  const [permissionsToAdd, setPermissionsToAdd] = useState<Set<string>>(
    new Set()
  );
  const [permissionsToRemove, setPermissionsToRemove] = useState<Set<string>>(
    new Set()
  );
  const [alertVisible, setAlertVisible] = useState(false);
  const platformId = usePlatformId();

  const showNotification = (message: string, description: ReactNode) => {
    notification.open({
      message,
      description,
      className: styles.customNotification,
      icon: null,
      style: {
        width: "max-content",
        height: "min-content",
        background: "#17D05B",
        color: "white",
      },
      closeIcon: null,
    });
  };

  const handleCheckboxChange = (permission: string, isChecked: boolean) => {
    if (isChecked) {
      setPermissionsToAdd((prev) => new Set(prev).add(permission));
      setPermissionsToRemove((prev) => {
        const newSet = new Set(prev);
        newSet.delete(permission);
        return newSet;
      });
    } else {
      setPermissionsToRemove((prev) => new Set(prev).add(permission));
      setPermissionsToAdd((prev) => {
        const newSet = new Set(prev);
        newSet.delete(permission);
        return newSet;
      });
    }
  };

  const HandleUpdate = async () => {
    const updateData = {
      permissionsToAdd: Array.from(permissionsToAdd),
      permissionsToRemove: Array.from(permissionsToRemove),
    };
    try {
      await EDITUSERGROUP(parseInt(groupId), platformId, updateData);

      setPermissionsToAdd(new Set());
      setPermissionsToRemove(new Set());

      
      showNotification(
        "",
        <Successful>
          <Successful.Icon style={{ color: "#17D05B" }}>
            <CheckOutlined />
          </Successful.Icon>
          <Successful.Text text={`Permissions have been successfully Updated`} />
          <Successful.Icon
            style={{
              color: "white",
              background: "none",
              justifyContent: "flex-end",
            }}
          >
            <CloseOutlined onClick={onCancel} />
          </Successful.Icon>
        </Successful>
      );

      setTimeout(() => {
        setAlertVisible(false);
        onCancel!();
      }, 3000);
    } catch (error) {
      console.error("Failed to update permissions:", error);
    }
  };

  useEffect(() => {
    const AssignPermission = async () => {
      try {
        const data = await fetchGroupsPermissions(Number(groupId), platformId);
        setPermissionData(data);
      } catch (error) {
        console.error("Failed to fetch permissions data:", error);
      }
    };

    AssignPermission();
  }, [groupId, platformId]);

  useEffect(() => {
    const getPermissions = async () => {
      const permissions = await fetchUserPermissions();
      setPermissionsData(permissions);
    };

    getPermissions();
  }, []);

  const assignedPermissionsSet = new Set(
    permissionData.flatMap((section) => section.permissions.map((p) => p.name))
  );

  return (
    <div className={styles.container}>
      
      <div className={styles.head}>
        <div className={`${styles.title} h6b`}>Update Permission</div>
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
                  <CheckboxComponent
                    key={permission.permission}
                    text={permission.permission}
                    checked={assignedPermissionsSet.has(permission.permission)}
                    onChange={(isChecked) =>
                      handleCheckboxChange(permission.permission, isChecked)
                    }
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
                    key={permission.permission}
                    text={permission.permission}
                    checked={assignedPermissionsSet.has(permission.permission)}
                    onChange={(isChecked) =>
                      handleCheckboxChange(permission.permission, isChecked)
                    }
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.buttondiv}>
        <button className={`${styles.cance} bodym`} onClick={onCancel}>
          Cancel
        </button>
        <button className={`${styles.tryAgain}`} onClick={HandleUpdate}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PermissionAssign;
