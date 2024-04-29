import { DataSearch } from "@/src/components/widgets/account-created-recors-widget/created.record";
import { AccountSetupHandler } from "@/src/services/account/account.setup.service";
export const customerCardDetailsAction =  async (onboardingtype: string, value:string ): Promise<DataSearch[]> => {
const handler = AccountSetupHandler() 
const data = await handler.searchCustomer(onboardingtype, value)    

    if(data == undefined){
        return []
    }
    let account:DataSearch[] = [{
        customerName:data?.customerName!,
        industry:data.industry!,
        customerType:data.customerType,
        customerStatus:data.recordStatus

    }]

    return account
}