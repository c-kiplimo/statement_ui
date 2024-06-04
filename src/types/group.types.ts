type UserGroups = {
  userId: number;
  platformGroup: {
    groupId: number;
    platformId: number;
    permission: string[];
    description: string;
    groupName: string;
    createdAt: string;
    updatedAt: string | null;
    auditInfo: any | null;
  };
  joinedOn: string;
};
type Groups = {
  name?: string;
  description?: string;
  groupStatus?: string;
  permission?: string[];
};
