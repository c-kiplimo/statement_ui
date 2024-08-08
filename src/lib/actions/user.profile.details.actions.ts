import { UserDetailResponse, UserHandler } from "@/src/services/usermanagement/user.service";
import { profileDetails } from "@/src/types/user.type";

export const userDetailsAction = async (value: string): Promise<profileDetails> => {
  let handler = UserHandler();

  let profileDetails: profileDetails = await handler.fetchUserByUserId(value);
  console.log(profileDetails);

  let customerDetails: profileDetails = {
    firstName:profileDetails.firstName,
    lastName:profileDetails.lastName,
    username: profileDetails.username,
    userType: profileDetails.userType,
    email: profileDetails.email!,
    mobileNumber: profileDetails.mobileNumber,
    status: profileDetails.status,
    createdAt:profileDetails.createdAt
  };
  console.log(customerDetails);
  return customerDetails;
};


export const fetchUserDetailsAction = async (userId: string): Promise<UserDetailResponse> => {
  let handler = UserHandler();

  try {
    let userDetailsResponse: UserDetailResponse = await handler.fetchUserDetailsByUserId(userId);
    const { userResponseDTO, userGroups } = userDetailsResponse;
    console.log("User Details:", userResponseDTO);
    console.log("User Groups:", userGroups);
    return {
      userResponseDTO: userResponseDTO, 
      userGroups,
    };
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw new Error(`Failed to fetch user details for userId: ${userId}`);
  }
};