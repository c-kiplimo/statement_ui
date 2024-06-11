import { plainHeaders } from "@/src/constants/auth-headers";
import { CUSTOMER_USER_PROFILE } from "@/src/constants/environment";
import axios from "axios";

const CustomerUserProfileAccountHandler = () => {
  const fetchCustomerProfiles = async (userId:string) => {
    const profileUrl = `${CUSTOMER_USER_PROFILE}/${userId}`;
    
    try {
      const response = await axios.get(profileUrl, { headers: plainHeaders });
      const apiResponse = response.data;
      
      if (apiResponse) {
        return apiResponse;
      } else {
        throw new Error("No data returned from API");
      }
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchCustomerProfiles,
  };
};

export { CustomerUserProfileAccountHandler };
