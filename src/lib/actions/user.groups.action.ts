import { GroupData } from "@/src/app/statement/(protected)/user-management/user-groups/groups";
import GroupsHandler from "@/src/services/usermanagement/usergroups.services"

export const fetchGroupsData = async (userId: string,platformId: string,page: number,size: number,): Promise<GroupData[]> => {
    const handler = GroupsHandler();
    const response = await handler.fetchGroups(userId, platformId, page, size);
  
    const groups: GroupData[] = response.map((data) => ({
      key: data.groupId.toString(),
      userName: data.groupName,
      description: data.description,
      createdOn: data.createdAt.toString().split('T')[0],
    }));
  
    return groups;
  };
  

