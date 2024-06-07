import axios from "axios";
import { GET_CUSTOMER_USERS_URL, GET_USERS_URL } from "@/src/constants/environment";

export const CustomerUserHandler = () => {
  const fetchCustomerUsers = async (userId: number) => {
    const AccountUserUrl = `${GET_CUSTOMER_USERS_URL}/${userId}`;

    try {
      const response = await axios.get(AccountUserUrl, {
        
        headers: {
          "X-RequestId": "1234",
        },
      });

      console.log("Fetched data:", response.data);
      
      return response.data;
      
    } catch (error) {
      console.error("Error fetching account users:", error);
      throw error;
    }
    
  };
  
  

  return {
    fetchCustomerUsers,
  };
};
