import { GET_CUSTOMER_USER_GROUPS_URL, USERS_GROUPS_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

export type GroupParams = {
  userId: string;
  platformId: string;
  page: number;
  size: number;
  sort: string[];
};

const GroupsHandler = () => {
  const fetchGroups = async (customerId: string,platformId: string,page: number,size: number): Promise<UsersGroup[]> => {
    const apiUrl = `${USERS_GROUPS_URL}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        },
        params: {customerId,platformId,page,size},
      });
      const apiResponse: UsersGroup[] = response.data;

      if (apiResponse) {
        return apiResponse;
      } else {
        throw new Error("No data received from the API");
      }
    } catch (error) {
      throw new Error(`Failed to fetch groups: ${error}`);
    }
  };

  const fetchUserGroupsByUserId = async (userId: number): Promise<UserGroupType[]> => {
    const customerAccountUrl = `${GET_CUSTOMER_USER_GROUPS_URL}/${userId}`;

    try {
        const response: AxiosResponse<UserGroupType[]> = await axios.get(customerAccountUrl, {
            headers: {
                'X-RequestId': '34567',
            },
        });

        if (response.data) {
            return response.data;
        } else {
            throw new Error("No data received from API");
        }
    } catch (error) {
        console.error("Error fetching groups by user ID:", error);
        throw error;
    }
};

  return {
    fetchGroups,
    fetchUserGroupsByUserId
  };
};

export default GroupsHandler;






