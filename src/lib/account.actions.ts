import { TransfersData } from "../components/widgets/accounts-transactions-summary/accounts.transactions.summary";
import { CashFlowProgress } from "../components/widgets/cash-flow-card-home/cashflow.card.home";
import { fetchAccountDetailsById } from "../services/account/account";

export const getTransactionAccounts = async (accountNumber:number):Promise<TransfersData[]> =>{

    let accounttransactions:AccountInformations = await fetchAccountDetailsById(accountNumber);

    let transactions:TransfersData[] = accounttransactions.transfers.map(balance=>({
        id: balance.accountId,
        // icon: undefined,
        title: balance.creditAccount,
        date: balance.processingDate,
        amount: balance.creditAccount,
    }))

    return transactions
}

export const getCashFlowData = async (accountNumber:number):Promise<CashFlowProgress[]> =>{

    let accounttransactions:AccountInformations = await fetchAccountDetailsById(accountNumber);

    let transactions:CashFlowProgress[] = accounttransactions.statementEntries.map(data=>({
        id: data.statementEntryId,
        // icon: undefined,
        title:data.productCategory,
        description:data.transactionDetails
        
    }))

    console.log(transactions.slice(0,4));
    
    return transactions.slice(0, 4)
}



