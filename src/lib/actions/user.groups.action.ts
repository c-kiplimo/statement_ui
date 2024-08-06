import { GroupsInformation } from "@/src/app/statement/(protected)/user-management/user-groups/delete-group/delete.group";
import { GroupPermissionsType } from "@/src/app/statement/(protected)/user-management/user-groups/group-permissions-home-page/group.permissions";
import { GroupUserInformation, MembersData } from "@/src/app/statement/(protected)/user-management/user-groups/group-users-home-page/group.users";
import { GroupData } from "@/src/app/statement/(protected)/user-management/user-groups/groups";
import PermissionsHandler from "@/src/services/usermanagement/permissions.service";
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


export const fetchGroupUsers = async (groupId: number, platformId: number): Promise<MembersData[]> => {
    const handler = GroupsHandler();

    try {
        const response: GroupMembersType[] = await handler.getGroupMembersUsers(groupId, platformId);
        
        const groupMembers: MembersData[] = response.map((data, index) => ({
            key: data.username,
            createdOn: data.createdAt,
            userName: `${data.firstName} ${data.lastName}`,
            role: data.userType,
            status: data.status
        }));
        
        return groupMembers;
    } catch (error) {
        console.error("Failed to fetch Members:", error);
        throw new Error('Failed to fetch Members');
    }
}

export const fetchGroupsPermissions = async (groupId: number,platformId: number): Promise<GroupPermissionsType[]> => {
    const handler = GroupsHandler();
  
    try {
      const response: GroupPermissions[] = await handler.getGroupPermissions(groupId,platformId);
      const groupPermissions: GroupPermissionsType[] = response.flatMap((data) =>
        Object.entries(data.groupedPermissions).map(([key, permissions]) => ({
          title: key,
          permissions,
        }))
      );  
      return groupPermissions;
    } catch (error) {
      console.error("Failed to fetch permissionsss:", error);
      throw new Error("Failed to fetch permissions");
    }
  };


  export const fetchUserInfo = async (userId:string):Promise<GroupUserInformation>=>{
    const handler = GroupsHandler();
    
    try {
      const response: UserInfoType = await handler.getUserInfo(userId);
      const userinfo:GroupUserInformation = {
        name: `${response.userResponseDTO.firstName} ${response.userResponseDTO.lastName}`,
        phoneno: response.userResponseDTO.mobileNumber,
        email: response.userResponseDTO.email
      }
        
      return userinfo;
    } catch (error) {
      console.error("Failed to fetch permissionsss:", error);
      throw new Error("Failed to fetch permissions");
    }  }


    
