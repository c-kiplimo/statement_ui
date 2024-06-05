import { UserInformationDetails } from "../app/statement/(protected)/settings/profile-form/profile.form";
import { getUserProfileDetails } from "../services/auth/get.profileinfo.service";
import { getUserDetails } from "../services/auth/get.user.byUserId";
//endpoint to get profile information
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


//Endpoint to get user information for settings

export const profileInformationDetails = async (userId:string):Promise<UserInformationDetails>=> {
    const profileInfo = await getUserDetails(userId);

    let response:UserInformationDetails = {
        firstname: profileInfo.firstName,
        lastname: profileInfo.lastName!,
        email: profileInfo.email,
        phone: profileInfo.mobileNumber,
        language: profileInfo.language
    }

    console.log(response);
    
    return response;
}



