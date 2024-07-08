import { MinistatementTableData } from "../app/statement/(protected)/account-statement-self/accountStatements/account-overview-status/account-ministatement/ministatement.table"
import { AccountMiniStatementHandler } from "../services/account/acccount.ministatement.service"

export const GetMinistatementAction =async (accountNumber:number): Promise<MinistatementTableData[]> =>{
     const handler = AccountMiniStatementHandler()

     const statement:MiniStatement[] = await handler.fetchAccountMiniStatement(accountNumber)
    const accountStatement:MinistatementTableData[] = statement.map(data=>({
        transferDate: convertDateString(data.bookingDate.toString()),
        paymentDetails: data.transactionDetails,
        valueDate: convertDateString(data.valueDate.toString()),
        moneyOut:data.debit ? data.amount.toLocaleString(): "",
        moneyIn:data.credit === true ? data.amount.toLocaleString():"",
        balance:data.runningBalance.toLocaleString(),
    }))    
    
    return accountStatement

    function convertDateString(dateString: string): string {
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate;
    }
}