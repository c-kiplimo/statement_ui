import { ADD_CUSTOMER_USER_ACCOUNT } from "@/src/constants/environment";
import axios from "axios";

interface UserPayload {
  accountId: number;
  email: string;
  role: string;
  status: string;
}



const createCustomerAccountUser = async (
  userPayload: UserPayload
)=> {
  try {
    const api = `${ADD_CUSTOMER_USER_ACCOUNT}`;
    console.log(userPayload);
    
    const response = await axios.post(api, userPayload, {
      headers: {
        "X-RequestId": "3445",
      },
    });
    return response.data;
  } catch (error:any) {
    console.error("Error creating user:", error.message || error);
    throw error;
  }
};

export { createCustomerAccountUser };
