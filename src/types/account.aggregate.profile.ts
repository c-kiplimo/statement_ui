type AccountProfile = {
    customerResponseDTO: {
        customerId: number,
        
    };
    accounts:Array< {
        accountId: string,
        accountTitle: string,
        accountType: string,
        currency: string,
        category: string,
        accountOfficer: string,
        customerId: number,
        statementFrequency: string,
        highVolume: string,
        recordStatus: string,
        dateCreated: string ,
        status: string
    }>;
    cards:Array<{
        cardNumber: string,
        cardHolderName: string,
        cardType: string,
        cardStatus: string,
        customerId: number,
        cardLimit: number,
        cardBalance: number,
        cardExpiryDate: string,
        cardIssueDate: string
    }>;
    activities: Array<{
        activityId: number,
        name: string,
        userId: string,
        customerId: number,
        template: string,
        description: string,
        status: string
    }>;
    transfers: Array<{
        transactionId: string,
            transactionType: string,
            debitAccount: string,
            debitCurrency: string,
            debitAmount: number,
            creditAccount: string,
            creditCurrency: string,
            creditAmount: number,
            lcyAmount: number,
            fcyAmount: number,
            paymentDetails: string,
            atUniqueId: string,
            apiUniqueId: string,
            processingDate: string,
            debitValueDate: string,
            creditValueDate: string,
            currencyMarket: string,
            orderingBank: string,
            customerId: string,
            profitCenter: string,
            accountType: string,
            status: string
    }>;
    availableBalanceDTOS: Array<{
            availableBalance: number,
            currency: string
        }>;
};
