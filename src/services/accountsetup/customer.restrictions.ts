
import { CUSTOMER_RESTRICTIONS } from "@/src/constants/environment";
import axios from "axios";

const RestrictionHandler = () => {
  const fetchCustomerRestrictions = async (
    customerId: number
  ): Promise<CustomerRestrictions[]> => {
    const apiUrl = `${CUSTOMER_RESTRICTIONS}/${customerId}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        },
      });
      const apiResponse: CustomerRestrictions[] = response.data;    
      if (apiResponse) {
        return apiResponse;
      } else {
        throw new Error("No data received from the API");
      }
    } catch (error) {
      throw new Error(`Failed to fetch groups: ${error}`);
    }
  };

  const fetchAllRestrictions = async (
    page: number,
    size:number,
    sort:string
  ): Promise<AllRestrictions> => {
    const apiUrl = `${CUSTOMER_RESTRICTIONS}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        },
        params:{page,size,sort}
      });
      const apiResponse: AllRestrictions = response.data;          
      if (apiResponse) {
        return apiResponse;
      } else {
        throw new Error("No data received from the API");
      }
    } catch (error) {
      throw new Error(`Failed to fetch groups: ${error}`);
    }
  };

  return {
    fetchCustomerRestrictions,
    fetchAllRestrictions
  };
};

export default RestrictionHandler;
