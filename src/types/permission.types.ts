type Permission = {
  name: string;
};

type UserPermission = {
  userPermissionId: number,
  userId: string,
  name: string,
  description: string,
  createdAt: string,
  permissions: [
    string
  ]
}




