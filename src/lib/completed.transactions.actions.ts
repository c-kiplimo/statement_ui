import { AccountStatementRequestHandler } from "../services/account/account.statement.request.service";

export const CompletedTransactionAction = async (statementRequestId: string): Promise<CompleteTransactions[]>=> {

        const handler = AccountStatementRequestHandler();
        const result:AccountStatementRequest = await handler.fetchStatementRequestById(parseInt(statementRequestId));
        if(result == undefined){
            return []
        }
        
        let completedtransactions:CompleteTransactions[] = [{
            
            id: result.statementRequestId!,
            date: toString(result.startDate),
            time: extractTimeFromDate(result.creationDate),
            accountname: 'Meraki Account'!,
            accountnumber: result.accountId!,
            description: 'Account Statement Generation',
            status: result.status!
        }]
    return completedtransactions
}

function toString(date?:Date):string{
    let dateString = date?.toString()
    return dateString == undefined? '' :dateString!
}

function extractTimeFromDate(date?:Date):string{

   let timeString =date?.toTimeString();

   return timeString == undefined?'':timeString
}
