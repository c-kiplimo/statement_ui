import { ADD_USER_TO_GROUP_URL } from "@/src/constants/environment";
import axios from "axios";

interface UsergroupTypes {
    customerId: number;
    permission?: any[];
    groupName: string;
    createdAt: number;  
}

const AddUserToGroup = async ({ customerId, groupName, createdAt, permission = [] }: UsergroupTypes) => {
  try {
    console.log("Starting AddUserToGroup function");
    
    const api = `${ADD_USER_TO_GROUP_URL}/${customerId}`;

    const userGroupData = {
      permission,
      groupName,
      createdAt
    };

    const response = await axios.post(api, userGroupData, {
      headers: {
        "X-RequestId": "3445",
      },
    });

    console.log("Response data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating user:", error.message || error);
    throw error;
  }
};

export { AddUserToGroup };
