import React, { useEffect, useState } from "react";
import styles from "./userGroupsTabs.module.css";
import TabNav from "@/src/components/widgets/tab-nav/tab-.nav";
import GroupsPermissions from "../group-permissions-home-page/group.permissions";
import GroupsUserprofile from "@/src/components/widgets/user-groups-profile/user.groups.profile";
import GroupUsers from "../group-users-home-page/group.users";
import { useSearchParams } from "next/navigation";
import PermissionAssign from "../update-user-group-permissions/permission.assign";
import useProfileCreated from "@/src/hooks/useProfileCreated";
import { fetchSingleUserGroup } from "@/src/lib/actions/user.groups.action";

type TabItem = {
  buttonName: string;
  bodyContent: React.ReactNode;
};

const GroupsTabs = () => {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  const [isEditingPermissions, setIsEditingPermissions] = useState(false);
  const [groupData, setGroupData] = useState<any>(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const profile = useProfileCreated();
  const userId = profile?.userId;

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await fetchSingleUserGroup(parseInt(groupId!));
        setGroupData(groupData);
      } catch (error) {
        console.error("Failed to fetch group data", error);
      }
    };

    if (groupId) {
      fetchGroupData();
    }
  }, [groupId]);

  const handleEditPermissions = () => {
    setIsEditingPermissions(true);
  };

  const handleCancelEdit = () => {
    setIsEditingPermissions(false);
  };

  const tabItems: TabItem[] = [
    {
      buttonName: "Members",
      bodyContent: (
        <GroupUsers
          groupId={groupId!.toString()}
          setTotalUsers={setTotalUsers}
          key="members"
        />
      ),
    },
    {
      buttonName: "Permissions",
      bodyContent: isEditingPermissions ? (
        <PermissionAssign
          onCancel={handleCancelEdit}
          key="permissions-assign"
          groupId={groupId!.toString()}
        />
      ) : (
        <GroupsPermissions
          groupId={groupId!.toString()}
          onEditPermissions={handleEditPermissions}
          key="permissions"
        />
      ),
    },
  ];

  if (!groupData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col p-4 bg-[] w-full h-auto">
      <GroupsUserprofile
        groupIdId={groupId!}
        icon={groupData.groupname.charAt(0).toUpperCase()}
        title={groupData.groupname}
        totalusers={`(${totalUsers} Members)`}
        address={groupData.groupdesc}
        status={"ACTIVE"}
      />
      <div className={styles.tabs}>
        <TabNav tabItems={tabItems} />
      </div>
    </div>
  );}  

export default GroupsTabs;
