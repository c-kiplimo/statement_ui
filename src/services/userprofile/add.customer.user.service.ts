import { ADD_CUST_USER_URL } from "@/src/constants/environment";
import axios from "axios";

interface UserPayload {
  platformUserId?: number;
  customerId: number;
  email: string;
  description?: string;
  role: string;
  status: string;
}

const createCustomerUser = async (userPayload: UserPayload) => {
  try {
    const api = `${ADD_CUST_USER_URL}`;
    const response = await axios.post(api, userPayload, {
      headers: {
        "X-RequestId": "3445",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating user:", error.message || error);
    throw error;
  }
};

export { createCustomerUser };
