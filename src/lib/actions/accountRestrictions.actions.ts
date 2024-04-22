import  {DataFetcher} from "@/src/app/statement/(protected)/accountsetup/widgets/table/table";
import { CustomerRestrictionsHandler } from "@/src/services/account/account.restrictions.service";



export const accountRestrictionsAction =  async ( value:number ): Promise<DataFetcher[]> => {
const handler = CustomerRestrictionsHandler() 
const data = await handler.fetchAccountrestrictions( value)    

    if(data == undefined){
        return []
    }

    
    let restrictions:DataFetcher[] = data.map(restrictions=>({

        id:restrictions.accountId,
        entryId:restrictions.restrictionId,
        userName:restrictions.name,
        description:restrictions.rules
    }))
    return restrictions
}