import { ACCOUNT_OVERVIEW_URL, GET_ACCOUNT_CONFIG } from "@/src/constants/environment";
import axios from "axios";

export const fetchAccountStatus = async (accountNumber: number): Promise<AccountById> => {
  const apiUrl = `${ACCOUNT_OVERVIEW_URL}/${accountNumber}`;


  
  try {
    
    
    const response = await axios.get(apiUrl, {
      headers: {
        "X-RequestId": "2345",
      },
    });

    const apiResponse = response.data;
    if (apiResponse) {

      const accountInformation: AccountById = {
        ...apiResponse,
      };

      
      return accountInformation;
    } else {
      console.error("Empty API response");
      throw new Error("Empty API response");
    }
  } catch (error) {
    console.error("Error fetching account data:", error);
    throw error;
  }
};
