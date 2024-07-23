import { PermissionTypes } from "@/src/app/statement/(protected)/user-management/permissions/(permissionsTable)/permissions.table";
import PermissionsHandler from "@/src/services/usermanagement/permissions.service";


export const fetchUserPermissions = async (): Promise<PermissionTypes[]> => {
    const handler = PermissionsHandler();
    const response: UserPermission[] = await handler.fetchPermissions();
  
    const permissions: PermissionTypes[] = response.flatMap(data => 
      data.permissions.map(permission => ({
        permissionName: permission.name,
        permissionDescription: permission.description,
        createdOn: permission.createdAt.split('T')[0],
        tags: data.type
      }))
    );

    return permissions;
  }

  




