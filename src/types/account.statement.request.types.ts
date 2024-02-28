type AccountStatementRequest = {
  statementRequestId?: number;
  accountId: string;
  startDate: Date;
  endDate: Date;
  status?: string;
  data?: string;
  creationDate?: Date;
  accountTitle?: string;
  currency?: string;
};
