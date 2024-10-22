import { CONFIRM_USER_PASSWORD } from "@/src/constants/environment";
import axios from "axios";

export interface passwordType {
    password:string
}

export const confirmUserPassword = async (userId: string, password: passwordType): Promise<UsersGroup[]> => {
  const apiUrl = `${CONFIRM_USER_PASSWORD}/${userId}`;

  try {
    const response = await axios.post(apiUrl,password , {
        headers: {
          "X-RequestId": "3456778909",
        },
      }
    );

    const apiResponse = response.data;

    if (apiResponse) {
      return apiResponse;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error: any) {
    throw new Error(`Failed to confirm user password: ${error.message}`);
  }
};
