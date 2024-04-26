type PayloadData = {
    meta: {
        status: string,
        statusCode: string,
        requestId: string,
        responseId: string,
        respondedAt: string
    };
    payload: {
        statementEntryId: number,
        accountId: number,
        amountLcy: string,
        currencyLcy: string,
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
        systemId: string,
        bookingDate: string,
        consolKey: string,
        runningBalance: string,
        processingTime: string,
        sortKey: number,
        alreadyUsedForSnapshot: boolean,
        dateUsedForSnapshot: string,
        processed: false,
        eventTime: string,
        recordStatus: boolean,
        credit: boolean,
        debit: boolean
    }
}
