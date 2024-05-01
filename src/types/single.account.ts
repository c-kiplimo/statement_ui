type AccountInformation = {

    accountBalances:Array<{
        id:number,
        balancename:string,
        balancenumber:string,
        amount:string,
        percentageChange:string,
        period:string
    }>;
}

type AccountInformations = {
    accountDTO: {
        accountId: number,
        accountTitle: string,
        accountType: string,
        currency: string,
        openingBalance: 340000,
        spending: 6000,
        received: 12000,
        closingBalance: 40000,
        category: string
    };
   
    transfers: Array<{
        transactionId: number,
            transactionType: string,
            debitAccount: string,
            debitCurrency: string,
            debitAmount: string,
            creditAccount: string,
            creditCurrency: string,
            creditAmount: string,
            lcyAmount: string,
            fcyAmount: string,
            paymentDetails: string,
            cardNumber: number,
            processingDate: string,
            debitValueDate: string,
            creditValueDate: string,
            currencyMarket: string,
            orderingBank: string,
            accountId: number,
            customerId: number,
    }>;
 statementEntries:Array<{
    statementEntryId: number,
            accountId: number,
            amountLcy: string,
            currencyLcy: number,
            amountFcy: string,
            amount: string,
            transactionCode: string,
            customerId: number,
            accountOfficer: string,
            productCategory: string,
            valueDate: string,
            currency: string,
            positionType: string,
            ourReference: string,
            exposureDate: string,
            currencyMarket: string,
            departmentCode: string,
            transReference: string,
            transactionDetails: string,
 }>;

}