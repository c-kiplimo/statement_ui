import {ADD_CUSTOMER_USER_GROUP } from "@/src/constants/environment";
import axios from "axios";

interface UserPayload {
    groupId?: number;
    platformId: string;
    groupName: string;
    description: string;
    userId: string;
    permission: string[];
    createdAt?: string;
  }
  
  
  const CREATEUSERGROUP = async (userPayload: UserPayload) => {
    try {
      const api = `${ADD_CUSTOMER_USER_GROUP}`;
      
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
  
  export { CREATEUSERGROUP };
  
