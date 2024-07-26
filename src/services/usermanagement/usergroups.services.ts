import { USERS_GROUPS_URL } from "@/src/constants/environment";
import axios from "axios";

export type GroupParams = {
  userId: string;
  platformId: string;
  page: number;
  size: number;
  sort: string[];
};

const GroupsHandler = () => {
  const fetchGroups = async (userId: string,platformId: string,page: number,size: number): Promise<GroupUsers[]> => {
    const apiUrl = `${USERS_GROUPS_URL}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        },
        params: {userId,platformId,page,size},
      });
      const apiResponse: GroupUsers[] = response.data;

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
    fetchGroups,
  };
};

export default GroupsHandler;
