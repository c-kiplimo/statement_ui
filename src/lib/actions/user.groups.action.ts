import { GroupsInformation } from "@/src/app/statement/(protected)/user-management/user-groups/delete-group/delete.group";
import { GroupData } from "@/src/app/statement/(protected)/user-management/user-groups/groups";
import GroupsHandler from "@/src/services/usermanagement/usergroups.services"

export const fetchGroupsData = async (customerId: string,platformId: string,page: number,size: number,): Promise<GroupData[]> => {
    const handler = GroupsHandler();
    const response:UsersGroup[] = await handler.fetchGroups(customerId, platformId, page, size);
  
    const groups: GroupData[] = response.map((data) => ({
      key: data.groupId.toString(),
      userName: data.groupName,
      description: data.description,
      createdOn: data.createdAt.toString().split('T')[0],
    }));
  
    return groups;
  };

  export const fetchSingleUserGroup = async (groupId: number): Promise<GroupsInformation> => {
    const handler = GroupsHandler(); 
    try {
        const response: SingleGroupInformation = await handler.fetchSingleGroupDetailsByGroupId(groupId);         
        const groupData: GroupsInformation = {
            groupname: response.groupName,
            groupdesc: response.description,
            permissions: Object.keys(response.groupedPermissions).map(title => ({
                title,
                permissions: response.groupedPermissions[title].map(permission => ({
                    name: permission.name
                }))
            }))
        };

        return groupData;
    } catch (error) {
        console.error(`Error fetching user group: ${error}`);
        throw new Error(`Failed to fetch user group: ${error}`);
    }
};

  

