import { DELETE_GROUPS_MEMBER, DELETE_GROUPS_URL, GET_USER_INFO, GROUPS_MEMBERS_URL, GROUPS_PERMISSIONS_URL, SINGLE_GROUPS_URL, USERS_GROUPS_URL } from "@/src/constants/environment";
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

  const fetchSingleGroupDetailsByGroupId = async (groupId: number):Promise<SingleGroupInformation> => {
    const apiUrl = `${SINGLE_GROUPS_URL}/${groupId}`;
    try {
        const response = await axios.get(apiUrl, {
          headers: {
              'X-RequestId': '3456778909',
          }});
        const apiResponse:SingleGroupInformation = response.data;        
          
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


const deleteUsersGroup = async (groupId: string, customerId: string, platformId: string) => {
  const apiUrl = `${DELETE_GROUPS_URL}/${groupId}/${customerId}/${platformId}`;

  try {
    const response = await axios.delete(apiUrl, {
      headers: {
        'X-RequestId': '3456778909',
      },
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || 'Failed to delete Group';
      throw new Error(errorMessage);
    } else {
      throw new Error('Failed to delete Group');
    }
  }
};


  const getGroupMembersUsers =async (groupId:number, platformId:number):Promise<GroupMembersType[]>=>{
    const apiUrl =`${GROUPS_MEMBERS_URL}/${groupId}/${platformId}`
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        }
      });
      const apiResponse: GroupMembersType[] = response.data;

      if (apiResponse) {
        return apiResponse;
      } else {
        throw new Error("No data received from the API");
      }
    } catch (error) {
      throw new Error(`Failed to fetch groups: ${error}`);
    }
  }

  const getGroupPermissions =async (groupId:number, platformId:number):Promise<GroupPermissions[]>=>{
    const apiUrl = `${GROUPS_PERMISSIONS_URL}/${groupId}/${platformId}`
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        }
      });
      const apiResponse: GroupPermissions[] = response.data;

      if (apiResponse) {
        return apiResponse;
      } else {
        throw new Error("No data received from the API");
      }
    } catch (error) {
      throw new Error(`Failed to fetch groups: ${error}`);
    }
  }

  

  const getUserInfo =async (userId:string):Promise<UserInfoType>=>{
    const apiUrl = `${GET_USER_INFO}/${userId}`
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "3456778909",
        }
      });
      const apiResponse: UserInfoType = response.data;  

      if (apiResponse) {
        return apiResponse;
      } else {
        throw new Error("No data received from the API");
      }
    } catch (error) {
      throw new Error(`Failed to fetch groups: ${error}`);
    }
  }
  

  const deleteGroupMembers = async (platformId: string, groupId: string, userId: string) => {
    const apiUrl = `${DELETE_GROUPS_MEMBER}/${platformId}/${groupId}/${userId}`;
  
    try {
      const response = await axios.delete(apiUrl, {
        headers: {
          'X-RequestId': '3456778909',
        },
      });
  
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to delete Group';
        throw new Error(errorMessage);
      } else {
        throw new Error('Failed to delete Group');
      }
    }
  };

  return {
    fetchGroups,
    fetchSingleGroupDetailsByGroupId,
    deleteUsersGroup,
    getGroupMembersUsers,
    getGroupPermissions,
    deleteGroupMembers,
    getUserInfo
  };
};


export default GroupsHandler;






