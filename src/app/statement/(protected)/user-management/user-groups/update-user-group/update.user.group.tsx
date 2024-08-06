import React, { useState, useEffect } from "react";
import styles from "./update.user.group.module.css";
import GroupUpdateConfirm, { GroupDatas } from "./confir.group.update";
import { Modal } from "antd";
import { fetchSingleUserGroup } from "@/src/lib/actions/user.groups.action";
import { useSearchParams } from "next/navigation";
import { UPDATEGROUP } from "@/src/services/usermanagement/update.user.group.service";
import { usePlatformId } from "@/src/hooks/platformId";
import useProfileId from "@/src/hooks/profileId";
import useProfileCreated from "@/src/hooks/useProfileCreated";


const UpdateUserGroup = () => {
  const [groupName, setGroupName] = useState<string>("");
  const [permissions, setPermissions] = useState<GroupDatas[]>([]);
  const [description, setDescription] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId');
  const customerId = useProfileId(); 
  const platformId = usePlatformId()


  const profile = useProfileCreated();
  const userId = profile?.userId;

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await fetchSingleUserGroup(parseInt(groupId!));
        setGroupName(groupData.groupname);
        setDescription(groupData.groupdesc);
        setPermissions(groupData.permissions);
      } catch (error) {
        console.error("Failed to fetch group data", error);
      }
    };

    fetchGroupData();
  }, [groupId]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = async () => {
    setIsModalVisible(false);
  
   
    const numericGroupId = groupId ? parseInt(groupId) : undefined;
  
    
    const stringPlatformId = platformId.toString();
  
    const userPayload = {
      groupName,
      description,
      permission: permissions.map(permission => permission.title),
      groupId: numericGroupId,
      platformId: stringPlatformId, 
      userId,
      customerId
      

    };
  
    try {
      await UPDATEGROUP(userPayload, numericGroupId!, customerId!, parseInt(stringPlatformId));
      
    } catch (error) {
     
    }
  };
  
  

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={`${styles.title} h5b`}>Update User Group</div>

      <div className={styles.inputbinding}>
        <label className={`${styles.titleStyle} bodyr`} htmlFor="groupName">
          <span>Group Name</span>
          <span className={styles.asteric}>*</span>
        </label>
        <input
          id="groupName"
          required
          title="Group Name"
          placeholder="Enter group name"
          className={styles.label}
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      <div className={styles.inputbinding}>
        <label className={`${styles.titleStyle} bodyr`} htmlFor="description">
          Description
        </label>
        <input
          id="description"
          title="Description"
          placeholder="Enter Description"
          className={styles.label}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button className={styles.button} type="submit">
        Save Changes
      </button>

      <Modal
        width={"min-content"}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <GroupUpdateConfirm
          groupName={groupName}
          description={description}
          onConfirm={handleConfirm}
          onCancel={handleCancel} 
          permissions={permissions}        
        />
      </Modal>
    </form>
  );
};

export default UpdateUserGroup;
