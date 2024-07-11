import { PermissionTypes } from "@/src/app/statement/(protected)/user-management/permissions/(permissionsTable)/permissions.table";
import PermissionsHandler from "@/src/services/usermanagement/permissions.service";


export const fetchUserPermissions = async (userId:string):Promise<PermissionTypes[]> =>{
     const handler = PermissionsHandler();
     const response:UserPermission[] =await handler.fetchPermissions(userId);
        
     const permissions:PermissionTypes[] = response.map(data =>({
        key: data.userPermissionId.toString(),
        permissionName: data.name,
        permissionDescription: data.description,
        createdOn: data.createdAt
     }))
    return permissions
}

const formatDate = (dateString: string) => {
    const [date] = dateString.split('T');
    return { date};
};




