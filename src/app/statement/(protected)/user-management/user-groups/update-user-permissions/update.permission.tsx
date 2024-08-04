import React, { useState, useEffect } from "react";
import styles from "./group.permissions.module.css";
import { CloudDownloadOutlined, PlusOutlined } from "@ant-design/icons";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import CheckboxComponent from "@/src/components/widgets/checkbox/checkbox";
import AddItems from "@/src/components/widgets/add-item-widget/add.item";
import { fetchGroupsPermissions } from "@/src/lib/actions/user.groups.action";
import { usePlatformId } from "@/src/hooks/platformId";

type permission ={
  name:string;
}

export type GroupPermissionsType = {
  title:string;
  permissions:permission[];
}
type PermissionsType = {
  groupId: string;
};

const GroupsPermissions = ({ groupId }: PermissionsType) => {
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [permissionsData, setPermissionsData] = useState<GroupPermissionsType[]>([]);
  const platformId = usePlatformId();

  useEffect(() => {
    const getPermissionsData = async () => {
      try {
        const data = await fetchGroupsPermissions(Number(groupId), platformId);
        setPermissionsData(data);
      } catch (error) {
        console.error("Failed to fetch permissions data:", error);
      }
    };

    getPermissionsData();
  }, [groupId, platformId]);

  const handleCreateGroupModalOpen = () => {
    setCreateGroupModalVisible(true);
  };

  return (
    <div className={styles.groupUsersContainer}>
      <div className={styles.header}>
        <div className={`${styles.title} h6b`}>Group Permissions</div>
        <div className={styles.components}>
          <DownloadWidget>
            <DownloadWidget.Icon iconStyles={{ color: "#4272DD" }}>
              <CloudDownloadOutlined />
            </DownloadWidget.Icon>
            <DownloadWidget.text text="Download" />
          </DownloadWidget>
          <AddItems
            onClick={handleCreateGroupModalOpen}
            buttonStyles={{ backgroundColor: "#003A49", color: "white" }}
          >
            <AddItems.Icon>
              <PlusOutlined />
            </AddItems.Icon>
            <AddItems.Text text="Edit permission" />
          </AddItems>
        </div>
      </div>
      <div className={styles.checkboxdiv}>
        <div className={styles.topdiv}>
          {permissionsData.slice(0, 2).map((section) => (
            <div key={section.title} className={styles.acctpermissions}>
              <div className={`${styles.cardName} h6r`}>{section.title}</div>
              {section.permissions.map((permission) => (
                <CheckboxComponent
                  key={permission.name}
                  text={permission.name}
                  checked={true}
                  disabled
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
                  key={permission.name}
                  text={permission.name}
                  checked={true}
                  disabled
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GroupsPermissions;
