type Permission = {
  name: string;
};

type UserPermission = {
  type: string,
  permissions: Array<{
      name: string,
      description: string,
      type: string,
      createdAt: string
    }>
}




