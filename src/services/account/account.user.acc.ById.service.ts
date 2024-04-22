import axios from "axios";
import { GET_USERS_URL } from "@/src/constants/environment";

export const AccountUserHandler = () => {
  const fetchAccountUsers = async (userId: number) => {
    const AccountUserUrl = `${GET_USERS_URL}/${userId}`;

    try {
      const response = await axios.get(AccountUserUrl, {
        headers: {
          "X-RequestId": "4566",
        },
      });
      
      return response.data;
    } catch (error) {
      console.error("Error fetching account users:", error);
      throw error;
    }
  };

  return {
    fetchAccountUsers,
  };
};
