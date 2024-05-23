import { log } from "console";
import { getUserProfileDetails } from "../services/auth/get.profileinfo.service";

export const loggedInProfileDetails =async (userId:number):Promise<CustomerProfile> =>{
    const response:CustomerProfile = await getUserProfileDetails(userId);

    let responseData:CustomerProfile = {
        profileId: response.profileId,
        customerId: response.customerId,
        profileName: response.name!,
        userId: response.userId,
    }
    console.log(responseData);
    
    return responseData
}