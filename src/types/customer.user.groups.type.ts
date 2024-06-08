type UserGroupType = {
    userId: number;
    platformGroup: {
        groupId: number;
        platformId: number;
        permissions: string[];  
        description: string;
        groupName: string;
        createdAt: string;
        updatedAt: string;
        auditInfo: string;
    };
    joinedOn: string;
};