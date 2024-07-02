import { Profile } from "@/src/app/statement/(protected)/usermanagement/branch/customer-profile/[id]/customer-profile";
import { ProfileAccountHandler } from "@/src/services/userprofile/custProfile.service";

export const profileDetails = async (value: string): Promise<Profile> => {
  let handler = ProfileAccountHandler();

  let profileDetails: ProfileType = await handler.fetchCustomerProfiles(value);
  console.log(profileDetails);

  let customerDetails: Profile = {
    userName: profileDetails.payload.customerName!,
    userId: profileDetails.payload.customerId!,
    userType: profileDetails.payload.customerType!,
    country: profileDetails.payload.country!,
    branch: profileDetails.payload.branch!,
    email: profileDetails.payload.email!,
    phoneNumber: profileDetails.payload.mobileNumber!,
    status: profileDetails.payload.recordStatus!,
  };
  console.log(customerDetails);
  return customerDetails;
};
