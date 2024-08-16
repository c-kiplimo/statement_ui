
import { ADD_RESTRICTION_URL, CUSTOMER_RESTRICTIONS, SINGLE_CUSTOMER_RESTRICTIONS } from "@/src/constants/environment";
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

  const fetchSingleRestrictions = async (
    restrictionId : number,
  ): Promise<SingleRestriction> => {
    const apiUrl = `${SINGLE_CUSTOMER_RESTRICTIONS}/${restrictionId}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        }
            });
      const apiResponse: SingleRestriction = response.data;          
      if (apiResponse) {
        return apiResponse;
      } else {
        throw new Error("No data received from the API");
      }
    } catch (error) {
      throw new Error(`Failed to fetch groups: ${error}`);
    }
  };

  const createCustomerRestriction = async (
    customerId: number,
    accountRestrictions: Number[],
  ): Promise<number> => {
    try {
      const api = `${ADD_RESTRICTION_URL}/${customerId}`;
      
      const response = await axios.post(api, accountRestrictions, {
        headers: {
          "X-RequestId": "3563",
        },
      });
      return response.data.id;
    } catch (error) {
      console.error("Error creating restriction:", error);
      throw error;
    }
  };

  

  const deleteCustomerRestriction = async (
    id : number,
  ) => {
    const apiUrl = `${CUSTOMER_RESTRICTIONS}/${id}`;
    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        },
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to delete Group";
        throw new Error(errorMessage);
      } else {
        throw new Error("Failed to delete Group");
      }
    }
  };

  return {
    fetchCustomerRestrictions,
    fetchAllRestrictions,
    deleteCustomerRestriction,
    fetchSingleRestrictions,
    createCustomerRestriction
  };
};

export default RestrictionHandler;
