type CustomerRestrictions = {
  id: number;
  customerId: number;
  restrictions: {
    restrictionId: number;
    name: string;
    rules: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    auditInfo: string;
  };
};

type AllRestrictions = {
  content: Array<{
    restrictionId: number;
    name: string;
    description: string;
  }>;
};

type SingleRestriction = {
  restrictionId: number;
  name: string;
  description: string;
};
