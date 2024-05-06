type AccountsMore = {
    accountOverview: {
        totalAmount: string,
        currency:string,
        numberOfAccounts: number,
        currencyAmount: Array<{
                currency: string,
                totalAmount: number
            }>;
    };
    accountSummary: Array<{
            accountType: string,
            currency: string,
            numberOfAccounts: number,
            totalAmount: number
        }>;

        accountList: Array<{
                accounts: Array<{
                        accountId: number,
                        accountTitle: string,
                        accountType: string,
                        currency: string,
                        availableBalance: number,
                        customerId: number,
                    }>;
                accountType: string,
                numberOfAccounts: number,
                currency: string,
                totalAmount: number,
            }>;
            
}