import { AccountHandler } from "@/src/services/account/account.service";
export const AccountAction =  async ( value:number ): Promise<DataFetcher[]> => {
const handler = AccountHandler() 
const data = await handler.getAccountByCustomerId( value)    

    if(data == undefined){
        return []
    }

    
    let accounts:DataFetcher[] = data.map(account=>({
        id:account.accountId,
        createdOn:account.accountId,
        userName:account.accountTitle,
        status:account.status,
        currency:account.currency,
    }))
    return accounts
}