import { profilesType } from "@/src/app/statement/(protected)/accountsetup/customers/accounts/[id]/page";
import { ProfileAccountHandler } from "@/src/services/userprofile/custProfile.service";


export const profileDetails =  async ( value:string ):Promise<profilesType> => {
    let handler =  ProfileAccountHandler()

    let profiledetailsdata:ProfileType = await handler.fetchCustomerProfiles(value)   

    

   let details:profilesType ={
       userName:profiledetailsdata.payload.customerName!,
       industry: profiledetailsdata.payload.deptAcctOfficer!,
       town: profiledetailsdata.payload.branch!,
       customerType:profiledetailsdata.payload.customerGroup!,
   }

    return details
}