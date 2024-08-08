import {
  DEACTIVATE_USER,
  GET_PLATFORM_GROUPS,
  UPDATE_USER_URL,
} from "@/src/constants/environment";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const createUserHandler = () => {
  type ResponseData = PlatformGroup[];

  type CreateUserProps = {
    register: {
      password: string;
      firstName: string;
      lastName: string;
      mobileNumber: string;
      email: string;
      groupId: string;
      customerId:string;
    };
  };

  type DeactivateUserResponse = {
    message: string; 
  };

  type DeactivateUserError = {
    message: string;
  };

  const fetchPlatformGroupService = async (
    platformId: number
  ): Promise<ResponseData> => {
    const url = `${GET_PLATFORM_GROUPS}?platformId=${platformId}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "X-RequestId": "23456789",
        },
      });
      console.log("Fetched platform groups:", response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch platform group data", error);
      throw error;
    }
  };

  const createUserService = async (URL: string, PAYLOAD: CreateUserProps) => {
    const { password, firstName, lastName, mobileNumber, email, groupId,customerId } =
      PAYLOAD.register;

    const payload = {
      password,
      firstName,
      lastName,
      mobileNumber,
      email,
      groupId,
      customerId,
    };

    try {
      const response = await axios.post(URL, payload, {
        headers: {
          "X-RequestId": "35342323",
        },
      });
      console.log("Created user::", response.data);
      return response;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const deactivateUserService = async (
    userId: string
  ): Promise<DeactivateUserResponse | DeactivateUserError> => {
    const config: AxiosRequestConfig = {
      method: "put",
      maxBodyLength: Infinity,
      url: `${DEACTIVATE_USER}/${userId}`,
      headers: {
        "X-RequestId": "23456789",
      },
    };

    try {
      const response: AxiosResponse<DeactivateUserResponse> =
        await axios.request(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          message: error.message,
        };
      } else {
        return {
          message: "An unexpected error occurred",
        };
      }
    }
  };

const updateUserService = async (userId: string, data: UpdateUserData): Promise<any> => {
  const config: AxiosRequestConfig = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `${UPDATE_USER_URL}/${userId}`,
    headers: { 
      'X-RequestId': '34567890-', 
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

  return {
    fetchPlatformGroupService,
    createUserService,
    deactivateUserService,
    updateUserService
  };
};

export { createUserHandler };
