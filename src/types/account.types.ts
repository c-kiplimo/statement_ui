export type AccountStatementSearchResults = {
  accountNumber?: string;
  accountName?: string;
  accountType?: string;
  accountStatus?: string;
  accountBalance?: number;
  accountCurrency?: string;
  statementDate?: string;
  statementStartDate?: string;
  statementEndDate?: string;
  statementdDescription?: string;
  handleClick?: (event: React.MouseEvent<HTMLElement>) => void;
};
