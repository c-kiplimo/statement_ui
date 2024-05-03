
import { AccountDetails, Dates } from "../components/widgets/branch-account-statement/account-detail-table/account.detail.table";
import { TransactionHistoryData } from "../components/widgets/branch-account-statement/transactions-history-table/transaction.history.table";
import { fetchStatementDataEntriesId } from "../services/account/account";
import { AccountStatementRequestHandler } from "../services/account/account.statement.request.service";


const handler = AccountStatementRequestHandler();

export const SingleStatementAction = async (statementEntryId:number): Promise<AccountDetails>  => {
    const statementresult:AccountStatementRequest = await fetchStatementDataEntriesId(statementEntryId);

    let accountDetails: AccountDetails = {
        accountName: statementresult.accountDTO!.accountTitle!,
        accountNumber: statementresult.accountDTO!.accountId!,
        currency: statementresult.accountDTO!.currency,
        openingBalance: statementresult.summary!.totalCreditAmount!.toString(),
        closingBalance: statementresult.summary!.closingBalance!.toString(),
        startDate: toString(statementresult.startDate),
        endDate: toString(statementresult.endDate),
        totalDebitAmt: statementresult.summary!.totalDebitAmount!.toString(),
        totalCreditAmt: statementresult.summary!.totalCreditAmount!.toString()
    };
          
    return accountDetails
    function toString(date?:Date):string{
        let dateString = date?.toString()
        return dateString == undefined? '' :dateString!
    }
}


export const SingleDataEntriesAction = async (statementRequestId: number): Promise<TransactionHistoryData[]>=> {
    const result:AccountStatementRequest = await fetchStatementDataEntriesId(statementRequestId);
    if(result == undefined){
        return []
    }
    let request:TransactionHistoryData[] = result.statementEntries!.slice(0, 5).map(data=>({
        key: data.statementEntryId!,
        valuedate: data.valueDate!.toString(),
        paymentDetails: data.transactionDetails!,
        moneyIn: data.amountFcy!,
        moneyOut: data.amountLcy!,
        balance: data.runningBalance!.toString(),
        transferRef:data.transReference!
    })) 
return request
}

export const DateSearchAction = async (statementRequestId:number):Promise<Dates>=>{
    const result:AccountStatementRequest = await handler.fetchStatementRequestById(statementRequestId);
    let dates:Dates = {
        startDate:result.startDate.toString(),
        endDate:result.endDate!.toString()
    }    
    return dates

}