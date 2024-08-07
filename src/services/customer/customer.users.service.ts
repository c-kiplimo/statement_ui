import axios from "axios";
import { GET_CUSTOMER_USERS_URL, GET_REGISTERED_USER_URL } from "@/src/constants/environment";

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
  
    const fetchRegisteredUsers = async (customerId: number) => {
      const RegisteeredUserUrl = `${GET_REGISTERED_USER_URL}/${customerId}`;
  
      try {
        const response = await axios.get(RegisteeredUserUrl, {
          
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
    fetchRegisteredUsers
  };
};
