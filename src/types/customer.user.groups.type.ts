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

type allUserGroupsTypes = {

        groupId: number;
        platformId: number;
        groupName: string;
        description: string;
        permission: [];   
};


type UsersGroup ={
    groupId: number,
    platformId: number,
    groupName: string,
    description: string,
    customerId: number,
    permission: [],
    createdAt: Date
  }

  type SingleGroupInformation = {
    groupId: number,
    platformId: number,
    groupName: string,
    permission: null,
    description: string,
    customerId: number,
    createdAt: Date,
    groupedPermissions: {
        [key: string]: Array<{
            name: string,
            type: string
        }>
    }
};