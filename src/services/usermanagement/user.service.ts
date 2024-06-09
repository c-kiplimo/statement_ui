import { USER_URL,REGISTER_PENDING_USER, PENDING_USER} from "@/src/constants/environment";
import { PendingUser, UserDetails } from "@/src/types/user.type";
import {notification } from "antd";
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

  const registerUser = async (URL: string, PAYLOAD: PendingUser): Promise<PendingUser[]> => {
    const { password, firstName, lastName, mobileNumber, email } = PAYLOAD;
  
    const payload = {
      password,
      firstName,
      lastName,
      mobileNumber,
      email,
    };
  
    try {
      const response = await axios.post<PendingUser[]>(URL, payload, {
        headers: {
          "X-RequestId": "35342323",
          "Content-Type": "application/json",
        },
      });
      console.log("Pending user>>", response.data);
      return response.data;
    } catch (error) {
      console.error("User registration failed:", error);
      throw error;
    }
  };

  const fetchPendingUser = async (): Promise<UserDetails[]> => {
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: PENDING_USER,
        headers: {
          'X-RequestId': '35342323'
        },
      };
  
      const response = await axios.request(config);
      return response.data as UserDetails[]; 
    } catch (error) {
      console.error('Error fetching pending users:', error);
      throw error;
    }
  };

  return {
    fetchAllUsers,
    deleteUser,
    registerUser,
    fetchPendingUser
  };
};

export { UserHandler };
