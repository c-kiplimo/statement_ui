import { plainHeaders } from "@/src/constants/auth-headers";
import { CUSTOMERS_URL } from "@/src/constants/environment";
import axios from "axios";

const ProfileAccountHandler = () => {
  const fetchCustomerProfiles = async (customerId?: string) => {
    const profileUrl = customerId ? `${CUSTOMERS_URL}/${customerId}` : CUSTOMERS_URL;
    
    try {
      const response = await axios.get(profileUrl, { headers: plainHeaders });
      const apiResponse = response.data;
      console.log(apiResponse);
      
      if (apiResponse) {
        return {
          ...apiResponse,
        };
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

export { ProfileAccountHandler };
