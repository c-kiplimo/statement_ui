import { SINGLE_GROUPS_URL, USERS_GROUPS_URL } from "@/src/constants/environment";
import axios from "axios";

export type GroupParams = {
  userId: string;
  platformId: string;
  page: number;
  size: number;
  sort: string[];
};

const GroupsHandler = () => {
  const fetchGroups = async (userId: string,platformId: string,page: number,size: number): Promise<UsersGroup[]> => {
    const apiUrl = `${USERS_GROUPS_URL}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        },
        params: {userId,platformId,page,size},
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

  const fetchSingleGroupDetailsByGroupId = async (groupId: number, platformId:number): Promise<UsersGroup> => {
    const apiUrl = `${SINGLE_GROUPS_URL}/${groupId}/${platformId}`;
    try {
        const response = await axios.get(apiUrl, {
          headers: {
              'X-RequestId': '3456778909',
          }});
        const apiResponse: UsersGroup = response.data;
        console.log(apiResponse);
        

        if (apiResponse) {
            return apiResponse;
        } else {
            throw new Error("No data received from the API");
        }
    } catch (error) {
        const errorMessage = error || error || 'Unknown error';
        throw new Error(`Failed to fetch group details: ${errorMessage}`);
    }
};


  return {
    fetchGroups,
    fetchSingleGroupDetailsByGroupId
  };
};

export default GroupsHandler;






