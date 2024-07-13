import { ProfileAccountHandler } from "@/src/services/userprofile/custProfile.service";

export const profileDetails = async (value: string): Promise<CompanyProfile> => {
  let handler = ProfileAccountHandler();

  let profileDetails: CustomerProfileType = await handler.fetchCustomerProfiles(value);
  console.log(profileDetails);

  let customerDetails: CompanyProfile = {
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
