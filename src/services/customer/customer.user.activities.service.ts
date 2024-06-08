import {GET_CUSTOMER_USER_ACTIVITIES_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

const CustomerUserActivitiesHandler = () => {
  const fetchCustomerUserActivities = async (
    userId: number): Promise<userActivities[]> => {
    const customerUserActivitiesUrl = `${GET_CUSTOMER_USER_ACTIVITIES_URL}/${userId}`;

    try {
      const response = await axios.get(customerUserActivitiesUrl, {
        headers: {
          'X-RequestId': '3456778909',
        },
      }).then((res) => {
      let apiResponse = res.data

      if (apiResponse) {
        let apiRes = apiResponse;
        let customerUserActivities: userActivities[] = [
          ...apiRes,
        ];
        return customerUserActivities;
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
    fetchCustomerUserActivities,
  };
}
export { CustomerUserActivitiesHandler };