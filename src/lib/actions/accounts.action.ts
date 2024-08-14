import { AccountHandler } from "@/src/services/account/account.service";

export const AccountAction =  async ( value:number ): Promise<SchedulesData[]> => {
const handler = AccountHandler() 
const data = await handler.getAccountByCustomerId( value)    

    if(data == undefined){
        return []
    }

    
    let accounts:SchedulesData[] = data.map(account=>({
        id:account.accountId,
        accountNumber: account.accountId,
        accountName:account.accountTitle,
        status: account.status,
        currency: account.currency,
    }))

    console.log("Fetched Accounts>>",accounts)
    return accounts
}