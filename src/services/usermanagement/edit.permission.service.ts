import axios from "axios";
import { FETCH_USER_DETAILS } from "@/src/constants/environment";

export type UserDetails = {
    
        firstName:string,
        lastName: string,
        mobileNumber: string,
        email: string,
        username: string,
        userType: string,
        status: string,
        createdAt: string
      
};

export const fetchUserDetails = async (
  search: string,
  customerId:number,
    page: number,
    size: number,
): Promise<UserDetails[]> => {
  const userDetailsUrl = `${FETCH_USER_DETAILS}`;
  try {
    const response = await axios.get(userDetailsUrl, {
      headers: {
        "X-RequestId": "34456",
      },
      params: {
        search,
        customerId,
        page,
        size
      },
    });

    let apiResponse = response.data;
    

    if (apiResponse) {
      let userDetails: UserDetails[] = {
        ...apiResponse,
      };
      return userDetails;
    } else {
      throw new Error("No data returned from API");
    }
  } catch (error) {
    throw error;
  }
};
