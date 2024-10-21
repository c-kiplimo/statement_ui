import { CustomerUserProfileAccountHandler } from "@/src/services/userprofile/customer.user.profile.service";

export const UserprofileDetails = async (value: string) => {
  let handler = CustomerUserProfileAccountHandler();

  try {
    let profileDetailsData = await handler.fetchCustomerProfiles(value);

    let details = {
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
