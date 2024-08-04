
import { AllPermission } from "@/src/app/statement/(protected)/user-management/user-groups/permissionsListPage/permissions.list";
import PermissionsHandler from "@/src/services/usermanagement/permissions.service";

export const fetchUserPermissions = async (): Promise<AllPermission[]> => {
    const handler = PermissionsHandler();
    const response: UserPermission[] = await handler.fetchPermissions();

    const permissions: AllPermission[] = response.map(data => ({
        title: data.type, 
        permissions: data.permissions.map(permission => ({
            permission: permission.name
        }))
    }));

    return permissions;
}
