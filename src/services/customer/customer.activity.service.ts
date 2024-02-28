import { CUSTOMER_ACTIVITIES_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

const CustomerActivitiesHandler = () => {
  const fetchCustomerActivities = async (
    customerId: number): Promise<CustomerActivity[]> => {
    const customerActivitiesUrl = `${CUSTOMER_ACTIVITIES_URL}/${customerId}`;

    try {
      const response = await axios.get(customerActivitiesUrl, {
        headers: {
          'X-RequestId': '3456778909',
        },
      }).then((res) => {
      let apiResponse = res.data

      if (apiResponse) {
        let apiRes = apiResponse;
        let customerActivities: CustomerActivity[] = [
          ...apiRes,
        ];
        return customerActivities;
      } else {
        throw new Error(apiResponse);
      }
      });
      return response;
    } catch (error) {
       throw error;
    }
  };

  return {
    fetchCustomerActivities,
  };
}
export { CustomerActivitiesHandler };