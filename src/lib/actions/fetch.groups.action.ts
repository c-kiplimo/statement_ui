import { UserGroupData } from "@/src/app/statement/(protected)/user-management/users/user-profile/widgets/user-groups/user-groups";
import GroupsHandler from "@/src/services/usermanagement/usergroups.services"

export const fetchUserGroups = async (userId: string,platformId: string,page: number,size: number,): Promise<UserGroupData[]> => {
    const handler = GroupsHandler();
    const response = await handler.fetchGroups(userId, platformId, page, size);
  
    const groups: UserGroupData[] = response.map((data) => ({
      key: data.groupId.toString(),
      groupName: data.groupName,
      description: data.description,
      createdOn: data.createdAt.toString().split('T')[0],
      joinedOn:data.createdAt.toString().split('T')[0],
    }));
  
    return groups;
  };
  
