import { USER_GROUP_URL } from "@/src/constants/environment";
import { GROUP_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

const GroupHandler = () => {
    const fetchAllUserGroups = async (userId: number): Promise<UserGroups[]> => {
        const userGroupUrl = `${USER_GROUP_URL}/${userId}`;
        try {
          const response: AxiosResponse<UserGroups[]> = await axios.get(userGroupUrl, {
            headers: {
              'X-RequestId': '3456778909',
            },
          });

          const apiResponse = response.data;
      
          if (apiResponse) {
            const userGroup: UserGroups[] = [...apiResponse];
            console.log(userGroup);
            return userGroup;
          } else {
            throw new Error('API response is empty');
          }
        } catch (error) {
          throw error;
        }
      };
    const fetchAllGroups = async(
    ) : Promise<Groups[]> =>{
        const groupUrl = `${GROUP_URL}`;
        try {
            const response = await axios.get(groupUrl, {
                headers: {
                    'X-RequestId': '3456778909',
                },
            }).then((res) => {
            let apiResponse = res.data

            if (apiResponse) {
                let apiRes = apiResponse;
                let group: Groups[] = [
                    ...apiRes,
                ];
                return group;
            } else {
                throw new Error(apiResponse);
            }
            });
            return response;
        } catch (error) {
           throw error;
        }       
    }

const addUserGroup = async(
    userGroup: UserGroups
) : Promise<UserGroups> =>{
    const userGroupUrl = `${USER_GROUP_URL}`;
    try {
        console.log(userGroup);
        const response = await axios.post(userGroupUrl, userGroup, {
            headers: {
                'X-RequestId': '3456778909',
            },
        }).then((res) => {
        let apiResponse = res.data

        if (apiResponse) {
            let apiRes = apiResponse;
            let userGroup: UserGroups = {
                ...apiRes,
            };
            return userGroup;
        } else {
            throw new Error(apiResponse);
        }
        });
        return response;
    } catch (error) {
        console.log(error);
       throw error;
    }
}
const addGroup = async(
    group: Groups
) : Promise<Groups> =>{
    const groupUrl = `${GROUP_URL}`;
    try {
        const response = await axios.post(groupUrl, group, {
            headers: {
                'X-RequestId': '3456778909',
            },
        }).then((res) => {
        let apiResponse = res.data

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
       console.log(error);
    }
}
const fetchGroupByName = async (
    name: string
    ): Promise<Groups> => {
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
    }
    //DELETE USER GROUP BY ID by GROUP ID
const deleteUserGroup = async (
    groupId: number
    ): Promise<string> => {
    const userGroupUrl = `${USER_GROUP_URL}/${groupId}`;
    try {
        const response = await axios
        .delete(userGroupUrl, {
            headers: {
            "X-RequestId": "3456778909",
            },
        }).then((res) => {
            return res.data;
        })
        return response;
    } catch (error) {
        throw error;
    }
    };
    

//DELETE GROUP BY NAME
const deleteGroup = async (name: string): Promise<string> => {
    const groupUrl = `${GROUP_URL}/${name}`;

    try {
        const response = await axios.delete(groupUrl, {
            headers: {
                "X-RequestId": "3456778909",
            },
        }).then((res) => {
            return res.data;
        })
        return response;
     } catch (error) {
        console.error(`An error occurred while deleting group ${name}`);
        throw error;
    }
};

//update group by name
const updateGroup = async (
    name: string,
    group: Groups
    ): Promise<Groups> => {
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
    }

    return {
        fetchAllUserGroups,
        fetchAllGroups,
        addUserGroup,
        addGroup,
        fetchGroupByName,
        deleteUserGroup,
        deleteGroup,
        updateGroup
    };
}
export { GroupHandler};