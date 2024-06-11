import {
  CUSTOMERS_URL,
  USER_GROUPS_URL,
  CREATE_ROLE_URL,
} from "@/src/constants/environment";
import { GROUP_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

const GroupHandler = () => {
  const fetchUserGroups = async (customerId: number): Promise<UserGroup[]> => {
    const userGroupsUrl = `${USER_GROUPS_URL}${customerId}`;
    try {
      const response: AxiosResponse<UserGroup[]> = await axios.get(
        userGroupsUrl,
        {
          headers: {
            "X-RequestId": "3456778909",
          },
        }
      );

      const apiResponse = response.data;

      if (apiResponse) {
        const userGroups: UserGroup[] = [...apiResponse];
        console.log("User Groups>>", userGroups);
        return userGroups;
      } else {
        throw new Error("API response is empty");
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchAllGroups = async (): Promise<Groups[]> => {
    const groupUrl = `${GROUP_URL}`;
    try {
      const response = await axios
        .get(groupUrl, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          let apiResponse = res.data;

          if (apiResponse) {
            let apiRes = apiResponse;
            let group: Groups[] = [...apiRes];
            return group;
          } else {
            throw new Error(apiResponse);
          }
        });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchCustomerData = async (
    customerId: number
  ): Promise<customerInfo> => {
    const customerURL = `${CUSTOMERS_URL}/${customerId}`;

    try {
        const response: AxiosResponse<customerInfo> = await axios.get(
          customerURL,
          {
            headers: {
              'X-RequestId': '346543',
            },
          }
        );
    
        const payload = response.data.payload;
        console.log('Customer Payload:', payload);
    
        return response.data;
      } catch (error) {
        console.error('Error fetching customer data:', error);
        throw error;
      }
  };
  
  const addUserGroup = async (data: UserGroup): Promise<UserGroup> => {
    try {
      const response = await axios.post<UserGroup>(CREATE_ROLE_URL, data, {
        headers: { 
          'X-RequestId': '234567890', 
          'Content-Type': 'application/json'
        }
      });
      console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const editUserGroup =async(groupId:number,newData:UserGroup):Promise<UserGroup>=>{
    try{
      const response = await axios.put<UserGroup>(`EDIT_ROLE_URL/${groupId}`, newData,{
        headers: { 
          'X-RequestId': '234567890', 
          'Content-Type': 'application/json'
        }
      });
      console.log("Edited roles>>",JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Error editing role:", error);
      throw error;
    }
  }
  
  const addGroup = async (group: Groups): Promise<Groups> => {
    const groupUrl = `${GROUP_URL}`;
    try {
      const response = await axios
        .post(groupUrl, group, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          let apiResponse = res.data;

          if (apiResponse) {
            let apiRes = apiResponse;
            let group: Groups = {
              ...apiRes,
            };
            return group;
          } else {
            throw new Error(apiResponse);
          }
        });
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };
  const fetchGroupByName = async (name: string): Promise<Groups> => {
    const groupUrl = `${GROUP_URL}/${name}`;
    try {
      const response = await axios
        .get(groupUrl, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          let apiResponse = res.data;
          if (apiResponse) {
            let apiRes = apiResponse;
            let group: Groups = {
              ...apiRes,
            };
            return group;
          } else {
            throw new Error(apiResponse);
          }
        });
      return response;
    } catch (error) {
      throw error;
    }
  };

  //DELETE USER GROUP BY ID by GROUP ID
  const deleteUserGroup = async (groupId: number): Promise<string> => {
    const userGroupUrl = `${USER_GROUPS_URL}/${groupId}`;
    try {
      const response = await axios
        .delete(userGroupUrl, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          return res.data;
        });
      return response;
    } catch (error) {
      throw error;
    }
  };

  //DELETE GROUP BY NAME
  const deleteGroup = async (name: string): Promise<string> => {
    const groupUrl = `${GROUP_URL}/${name}`;

    try {
      const response = await axios
        .delete(groupUrl, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          return res.data;
        });
      return response;
    } catch (error) {
      console.error(`An error occurred while deleting group ${name}`);
      throw error;
    }
  };

  //update group by name
  const updateGroup = async (name: string, group: Groups): Promise<Groups> => {
    const groupUrl = `${GROUP_URL}/${name}`;
    try {
      const response = await axios
        .put(groupUrl, group, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          let apiResponse = res.data;
          if (apiResponse) {
            let apiRes = apiResponse;
            let group: Groups = {
              ...apiRes,
            };
            return group;
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
    fetchAllGroups,
    fetchCustomerData,
    addUserGroup,
    addGroup,
    editUserGroup,
    fetchGroupByName,
    deleteUserGroup,
    deleteGroup,
    updateGroup,
    fetchUserGroups,
  };
};
export { GroupHandler };
