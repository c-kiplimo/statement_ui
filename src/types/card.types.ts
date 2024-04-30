type Card ={
    cardDTO: {
        cardNumber: number,
        cardHolderName: string,
        cardType: string,
        cardStatus: string,
        cardLimit: string,
        customerId: number,
        cardBalance: string,
        cardExpiryDate: string,
        cardIssueDate: string,
        createdAt: string,
    };
    fundsTransferDTOS: Array<{
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
            atUniqueId: string,
            apiUniqueId: string,
            cardNumber: number,
            processingDate: string,
            debitValueDate: string,
            creditValueDate: string,
            currencyMarket: string,
            orderingBank: string,
            customerId: number,
            profitCenter: string,
            accountType: string,
            status: string
        }>;
}

