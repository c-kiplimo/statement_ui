import PermissionsHandler from "@/src/services/usermanagement/permissions.service";
export const fetchUserPermissions = async () => {
  try {
    const handler = PermissionsHandler();
    const response: UserPermission[] = await handler.fetchPermissions();

    const permissions = response.map(data => ({
      title: data.type,
      permissions: data.permissions.map(permission => ({
        permissionName: permission.name,
        description: permission.description,
        createdOn: permission.createdAt.split('T')[0],
        tags: [data.type],
      }))
    }));

    return permissions;
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    return [];
  }
};
