import { CONFIRM_USER_PASSWORD, USER_URL } from "@/src/constants/environment";
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


export const fetchUserDetailsByUserId =async (userId:string)=>{
  const url =`${USER_URL}/${userId}`
  try {
    const response= await axios.get(url,{
      headers: {
        "X-RequestId": "3456778909",
      },
    });
    const apiResponse = response.data;
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
