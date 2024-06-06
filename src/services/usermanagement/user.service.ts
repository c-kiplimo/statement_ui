import { USER_URL } from "@/src/constants/environment";
import { UserDetails } from "@/src/types/user.type";
import { message, notification } from "antd";
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
    // const userUrl = `${USER_URL}/${userId}`;
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

  return {
    fetchAllUsers,
    deleteUser,
  };
};

export { UserHandler };
