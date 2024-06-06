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
        restrictionId:restrictions.restrictions.restrictionId,
        entryId:restrictions.id,
        createdOn:restrictions.restrictions.createdAt,
        userName:restrictions.restrictions.name,
        status:restrictions.restrictions.status,
        role:restrictions.restrictions.description,
    }))
    return restrictions
}