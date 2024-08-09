import {
  GET_USER_INFO,
  PENDING_USER,
  USER_URL,
} from "@/src/constants/environment";
import { PendingUser, UserDetails, profileDetails } from "@/src/types/user.type";
import { notification } from "antd";
import axios, { AxiosRequestConfig} from "axios";

export type UserDetailResponse={
  userResponseDTO:profileDetails;
  userGroups:UsersGroups[];
}

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
  const registerUser = async (
    URL: string,
    PAYLOAD: PendingUser
  ): Promise<PendingUser[]> => {
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

  const fetchUserByUserId = async (userId: string): Promise<profileDetails> => {
    const config: AxiosRequestConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${USER_URL}/${userId}`,
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

  const fetchUserDetailsByUserId =async (userId:string): Promise<UserDetailResponse>=>{
    const url =`${GET_USER_INFO}/${userId}`
    try {
      const response= await axios.get(url,{
        headers: {
          "X-RequestId": "3456778909",
        },
      });
      const apiResponse: UserDetailResponse = response.data;
      console.log(apiResponse)
      if (apiResponse) {
        return apiResponse;
      } else {
        throw new Error("No data received from the API");
      }
    } catch (error) {
      throw new Error(`Error fetching user details: ${error}`);
    }
  }
  const fetchPendingUser = async (): Promise<UserDetails[]> => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: PENDING_USER,
        headers: {
          "X-RequestId": "35342323",
        },
      };

      const response = await axios.request(config);
      return response.data.content as UserDetails[];
    } catch (error) {
      console.error("Error fetching pending users:", error);
      throw error;
    }
  };

  return {
    fetchAllUsers,
    fetchUserByUserId,
    deleteUser,
    fetchUserDetailsByUserId,
    registerUser,
    fetchPendingUser

  };
};

export { UserHandler };