import { plainHeaders } from "@/src/constants/auth-headers";
import { CUSTOMERS_URL} from "@/src/constants/environment";
import axios from "axios";

const ProfileAccountHandler = () => {
  const fetchCustomerProfiles = async (customerId?: string) => {
    const profileUrl = `${CUSTOMERS_URL}${`/${customerId}`}`;
  
    
    try {
      const response: ProfileType = await axios.get(profileUrl, {
        headers: plainHeaders 
      }).then((res) => {
        let apiResponse = res.data;
        
        
        if (apiResponse) {
          let apiRes = apiResponse;
          let profile: ProfileType = {
            ...apiRes,
          };
          return profile;
        } else {
          throw new Error(apiResponse);
        }
      });

      console.log(response);
      
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchCustomerProfiles,
  };
};

export { ProfileAccountHandler };
