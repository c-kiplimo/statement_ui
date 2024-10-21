import { ProfileAccountHandler } from "@/src/services/userprofile/custProfile.service";


export const profileDetails =  async ( value:string ) => {
    let handler =  ProfileAccountHandler()

    let profiledetailsdata:ProfileType = await handler.fetchCustomerProfiles(value)   

    

   let details ={
       userName:profiledetailsdata.payload.customerName!,
       industry: profiledetailsdata.payload.deptAcctOfficer!,
       town: profiledetailsdata.payload.branch!,
       customerType:profiledetailsdata.payload.customerGroup!,
   }

    return details
}