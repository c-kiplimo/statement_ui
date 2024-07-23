import {
  USER_URL,
  AUTH_URL_REGISTER,
  USER_BY_USERID_URL,
} from "@/src/constants/environment";
import { PendingUser, UserDetails, profileDetails } from "@/src/types/user.type";
import { notification } from "antd";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const UserHandler = () => {
  const fetchAllUsers = async (search?: string): Promise<UserDetails[]> => {
    let userUrl = USER_URL;
    if (search) {
      userUrl += `?search=${search}`;
    }

    try {
      const response = await axios
        .get<UserDetails[]>(userUrl, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          let apiResponse = res.data;

          if (apiResponse) {
            let apiRes = apiResponse;
            let user: UserDetails[] = [...apiRes];
            return user;
          } else {
            throw new Error(apiResponse);
          }
        });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchUserByUserId = async (userId: string): Promise<profileDetails> => {
    const config: AxiosRequestConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${USER_BY_USERID_URL}/${userId}`,
      headers: {
        "X-RequestId": "2345678",
      },
    };
    try {
      const response = await axios.request<profileDetails>(config);
      const userDetails: profileDetails = response.data;
      console.log(JSON.stringify(userDetails));
      return userDetails;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const deleteUser = async (userId: string): Promise<UserDetails[]> => {
    const userUrl = USER_URL;

    const data = JSON.stringify([userId]);

    const config: AxiosRequestConfig = {
      method: "delete",
      maxBodyLength: Infinity,
      url: userUrl,
      headers: {
        "X-RequestId": "2345898776",
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const response = await axios.request<UserDetails[]>(config);
      notification.success({
        message: "Success!",
        description: "The user was deleted successfully!",
      });
      console.log("Deleted user>>", response.data);
      return response.data;
    } catch (error) {
      notification.error({
        message: "Error!",
        description: "The user was not deleted!",
      });
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  // : Promise<UserFormData[]> 
  // const registerUserService = async (
  //   URL: string,
  //   PAYLOAD: UserFormData
  // )=> {
  //   const { firstName, lastName, mobileNumber, email,groupId} = PAYLOAD;

  //   const payload = {
  //     firstName,
  //     lastName,
  //     mobileNumber,
  //     email,
  //     groupId,
  //   };

  //   try {
  //     //const response = await axios.post<UserFormData[]>(URL, payload, {
  //       const response = await axios.post(URL, payload, {
  //       headers: {
  //         "X-RequestId": "35342323",
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("Registered user>>", response.data);
  //     // return response.data;
  //     return response;
  //   } catch (error) {
  //     console.error("User registration failed:", error);
  //     throw error;
  //   }
  // };

  // const registerUser=async(data:UserFormData):Promise<UserFormData[]>=>{
  //   const payload = {
  //     firstName: data.firstName,                                                                                                               
  //     lastName: data.lastName,
  //     mobileNumber: data.mobileNumber,
  //     email: data.email,
  //     groupId:data.groupId,
  //   };

  //   try{
  //     const response = await axios.post<UserFormData[]>(AUTH_URL_REGISTER,payload,{
  //       headers: {
  //         'X-RequestId': '35342323',
  //         'Content-Type': 'application/json'
  //       }, 
  //     })
  //       console.log("Registered user>>", response.data);
  //       return response.data;
  //   }catch(error){
  //     console.error("User registration failed:", error);
  //     throw error;
  //   }
  // }
   
  // const RegisterUser = async (data: UserFormData): Promise<UserFormData[]>=> {
  //   const jsonData = JSON.stringify({
  //     firstName: data.firstName,                                                                                                               ,
  //     lastName: data.lastName,
  //     mobileNumber: data.mobileNumber,
  //     email: data.email,
  //     groupId:data.userGroup
  //   });
  
  //   const config: AxiosRequestConfig = {
  //     method: 'post',
  //     maxBodyLength: Infinity,
  //     url: AUTH_URL_REGISTER,
  //     headers: {
  //       'X-RequestId': '35342323',
  //       'Content-Type': 'application/json'
  //     },
  //     data: jsonData
  //   };
  
  //   try {
  //     const response = await axios.request(config);
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  
 
  return {
    fetchAllUsers,
    fetchUserByUserId,
    deleteUser,
    // registerUserService,
    // registerUser
  };
};

export { UserHandler };