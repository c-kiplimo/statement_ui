import { VIEW_MORE_ACCOUNT_BY_CUSTID } from "@/src/constants/environment";
import axios from "axios";

export const ViewMoreAccountsByCustId = async (custId:number):Promise<AccountsMore>=>{
    const apiUrl = `${VIEW_MORE_ACCOUNT_BY_CUSTID}/${custId}`;

    try {
        const response = await axios.get(apiUrl, {
          headers: {
            'X-RequestId': '23456789',
          },
        });
    
        const apiResponse:AccountsMore = response.data;
    
        if (apiResponse) {
          const accounts = {
            ...apiResponse,
          };          
          return accounts;
        } else {
          throw new Error("No data received from the API");
        }
      } catch (error) {
        throw new Error(`Failed to fetch account overview:`);
      }
}