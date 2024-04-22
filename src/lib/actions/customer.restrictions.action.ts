import  {DataFetcher} from "@/src/app/statement/(protected)/accountsetup/widgets/table/table";
import { AccountHandler } from "@/src/services/account/account.service";


export const RestrictionsAction =  async ( value:number ): Promise<DataFetcher[]> => {
const handler = AccountHandler() 
const data = await handler.fetchCustomerRestrictions( value)    

    if(data == undefined){
        return []
    }

    
    let restrictions:DataFetcher[] = data.map(restrictions=>({

        id:restrictions.customerId,
        entryId:restrictions.restrictionId,
        createdOn:restrictions.createdAt,
        userName:restrictions.name,
        status:restrictions.status,
        role:restrictions.description,
    }))
    return restrictions
}