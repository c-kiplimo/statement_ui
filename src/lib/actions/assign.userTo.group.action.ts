import { MemberData } from "@/src/app/statement/(protected)/user-management/user-groups/add-user-to-group/addUserToGroup";
import { fetchUserDetails, UserDetails } from "@/src/services/usermanagement/edit.permission.service";

export const fetchUseremailDetails = async (
  search: string,
  customerId:number,
    page: number,
    size: number,
): Promise<MemberData[]> => {
  try {
    const response: { [key: number]: UserDetails } = await fetchUserDetails(search,customerId,page, size);

    
    const responseArray = Object.values(response);

    console.log(responseArray);

    
    const details: MemberData[] = responseArray.map((data) => ({
      key: data.username,
      username: `${data.firstName} ${data.lastName}`,
      Phone: data.mobileNumber,
      createdOn: data.createdAt,
      email: data.email,
    }));

    console.log(details);

    return details;
  } catch (error) {
    console.error("Failed to fetch user details:", error);
    throw error;
  }
};
