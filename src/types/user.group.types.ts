type User_Group = {
    id: string;
    name: string;
    icon?: React.ReactNode;
    description: string;
  };

type UserGroupData= {
    key: string;
    groupId:string;
    groupName: string;
    description: string;
    createdOn: string;
    joinedOn?: string;
  }