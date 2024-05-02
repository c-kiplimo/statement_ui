type AccountStatementRequest = {
  statementRequestId?: number;
  accountId: string;
  startDate: Date;
  endDate: Date;
  status?: string;
  description?:string;
  creationDate?: Date;
  accountTitle?: string;
  currency?: string;
  
      statementEntries?:Array<{
          statementEntryId?: number;
          accountId?: string;
          amountLcy?: string;
          currencyLcy?: string;
          amountFcy?: string;
          amount?: number;
          transactionCode?: string;
          customerId?: number;
          accountOfficer?: string;
          productCategory?: string;
          valueDate?: number;
          currency?: string;
          positionType?: string;
          ourReference?: string;
          exposureDate?: string;
          currencyMarket?: string;
          departmentCode?: string;
          transReference?: any;
          transactionDetails?: string;
          systemId?: any;
          bookingDate?: number;
          consolKey?: any;
          runningBalance?: number;
          processingTime?: any;
          sortKey?: number;
          alreadyUsedForSnapshot?: boolean;
          dateUsedForSnapshot?: any;
          processed?: boolean;
          eventTime?: number;
          recordStatus?: any;
          credit?: boolean;
          debit?: boolean;
      }>;
      accountDTO?: {
        accountId: string;
        accountTitle: string;
        accountType: string;
        currency: string;
        category: string;
        accountOfficer: string;
        customerId: number;
        statementFrequency: string;
        highVolume: boolean;
        recordStatus: boolean ;
        dateCreated: Date ;
      };
      
    accountSnapshot?: {
      snapshotDate: number;
      balance: number;
      type: string;
    };
    customer?: {
      customerId: number;
      customerName: string;
      deptAcctOfficer: string;
      mobileNumber: string;
      email: string;
      language: string;
      postingRestrict: string;
      branch: string;
      address: string;
      country: string;
      customerStatus: boolean;
      customerGroup: string;
      recordStatus: boolean;
    };
    summary?: {
      numberOfDebits: number;
      totalDebitAmount: number;
      numberOfCredits: number;
      totalCreditAmount: number;
      closingBalance: number;
    };
  };
