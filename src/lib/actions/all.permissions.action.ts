import { AllPermissionTypes } from "@/src/app/statement/(protected)/user-management/user-groups/update-user-group-permissions/permission.assign";
import PermissionsHandler from "@/src/services/usermanagement/permissions.service";

export const fetchUserPermissions = async (): Promise<AllPermissionTypes[]> => {
    const handler = PermissionsHandler();
    const response: UserPermission[] = await handler.fetchPermissions();

    const permissions: AllPermissionTypes[] = response.map(data => ({
        title: data.type, 
        permissions: data.permissions.map(permission => ({
            permission: permission.name
        }))
    }));

    return permissions;
}
