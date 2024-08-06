import {UPDATE_CUSTOMER_USER_GROUP } from "@/src/constants/environment";
import axios from "axios";

interface UserPayload {
  groupId?: number;
  platformId?: string; 
  groupName: string;
  description?: string;
  userId?: string;
  permission?: string[];
  createdAt?: string;
  customerId?: number;
}

  
  
  const UPDATEGROUP = async (userPayload: UserPayload,groupId:number,customerId:number,platformId:number) => {
    try {
      const api = `${UPDATE_CUSTOMER_USER_GROUP}/${groupId}/${customerId}/${platformId}`;  
      const response = await axios.put(api, userPayload, {
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
  
  export { UPDATEGROUP };
  
