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
  
export const fetchUserGroupByUserId = async (userId:number):Promise<userGroup[]>=>{
  const handler = GroupsHandler();
  
  try{
    const data = await handler.fetchUserGroupsByUserId(userId);

    if(!data || data.length === 0){
      return [];
    }

    const result: userGroup[] = data.map(account=>({
      key:account.platformGroup.groupId,
      groupName:account.platformGroup.groupName,
      description:account.platformGroup.description,
      createdAt:account.platformGroup.createdAt,
      joinedOn:account.platformGroup.createdAt,
    }));

    return result;
  }catch(error){
    console.error("Error fetching user accounts:", error);
    return [];
  }
}
