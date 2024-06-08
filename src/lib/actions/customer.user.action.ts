import { userProfile } from "@/src/app/statement/(protected)/accountsetup/user-view-profile/user.view.profile";
import { CustomerUserProfileAccountHandler } from "@/src/services/userprofile/customer.user.profile.service";

export const UserprofileDetails = async (value: string): Promise<userProfile> => {
  let handler = CustomerUserProfileAccountHandler();

  try {
    let profileDetailsData = await handler.fetchCustomerProfiles(value);

    let details: userProfile = {
         userId:profileDetailsData.userId,
        username: profileDetailsData.username, 
      role: profileDetailsData.role,
      email: profileDetailsData.email,
      status: profileDetailsData.status,
    };

    return details;
  } catch (error) {
    throw error;
  }
};
