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

type UserGroup = {
  groupId?: number;
  customerId?: number | null;
  permission: string[];
  description: string;
  groupName: string;
  createdAt?: string;
};

type customerInfo = {
  meta: {
    status: string;
    statusCode: string;
    requestId: string;
    responseId: string;
    respondedAt: string;
  };
  payload: {
    customerId: number;
    customerName: string;
    deptAcctOfficer: string;
    mobileNumber: string;
    email: string;
    language?: string | null;
    passportNumber: string;
    nationalId: string;
    postingRestrict?: string;
    branch: string;
    address: string;
    country: string;
    customerStatus: string;
    customerGroup: string;
    industry: string;
    customerType: string;
    recordStatus: boolean;
  };
}

type Groups = {
  name?: string;
  description?: string;
  groupStatus?: string;
  permission?: string[];
};
