import { UserGroupData } from "@/src/app/statement/(protected)/user-management/users/user-profile/widgets/user-group-data/user-groups-data";
import GroupsHandler, { UserGroupParams } from "@/src/services/usermanagement/usergroups.services"

export const fetchUserGroups = async (userId: string,platformId: string,page: number,size: number,): Promise<UserGroupData[]> => {
    const handler = GroupsHandler();
    const response = await handler.fetchGroups(userId, platformId, page, size);
  
    const groups: UserGroupData[] = response.map((data) => ({
      key: data.groupId.toString(),
      groupId:data.groupId.toString(),
      groupName: data.groupName,
      description: data.description,
      createdOn: data.createdAt.toString().split('T')[0],
      joinedOn:data.createdAt.toString().split('T')[0],
    }));
  
    return groups;
  };

  export const fetchUserGroupsAction = async (
    userId: string
  ): Promise<UserGroupData[]> => {
    const handler = GroupsHandler();
    try {
      const userGroups = await handler.fetchGroupsByUserId(userId);

      const userGroupData: UserGroupData[] = userGroups.map(group => ({
        key: group.platformGroup.groupId.toString(),
        groupId: group.platformGroup.groupId.toString(), 
        groupName: group.platformGroup.groupName ?? 'No Group Name', 
        description: group.platformGroup.description ?? 'No Description',
        createdOn: group.platformGroup.createdAt ?? 'Unknown Date',
        joinedOn: group.joinedOn, 
      }));
  
      return userGroupData;
    } catch (error) {
      console.error(`Failed to map user group data: ${error}`);
      throw error;
    }
  };

  