import { CUSTOMER_ACTIVITIES } from "@/src/constants/environment";
import axios from "axios";

const ActivitiesHandler = () => {
  const fetchCustomerActivities = async (
    customerId: number
  ): Promise<CustomerActivities[]> => {
    const apiUrl = `${CUSTOMER_ACTIVITIES}/${customerId}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        },
      });
      const apiResponse: CustomerActivities[] = response.data;

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
    fetchCustomerActivities,
  };
};

export default ActivitiesHandler;
