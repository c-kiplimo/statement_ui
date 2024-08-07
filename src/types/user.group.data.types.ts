type usergroupType ={
    userId:string;
    platformGroup:{
        groupId:string;
        platformId:string;
        permission:[];
        description:string;
        customerId:string;
        groupName:string;
        createdAt:string;
        updatedAt:string;
    }
    joinedOn:string;
  }

  type PlatformGroupType = {
    groupId: number;
    platformId: number;
    permission: any[]; 
    description: string | null;
    customerId: string | null;
    groupName: string | null;
    createdAt: string | null;
    updatedAt: string | null;
    auditInfo: string | null;
  }