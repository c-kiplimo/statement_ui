import axios from "axios";
import {DELETE_CUSTOMER_USER_URL } from "@/src/constants/environment";
import { notification } from "antd";

export const deleteCustomerUser = async (userId: number) => {  
  const deleteUrl = `${DELETE_CUSTOMER_USER_URL}/${userId}`;

  try {
    const response = await axios.delete(deleteUrl, {
      headers: {
        "X-RequestId": "2344",
      },
    });

    notification.success({
      message: 'Deleted User Successfully'
    });

    return response;
  } catch (error) {
    console.error("Network Error while deleting user:", error);

    notification.error({
      message: 'Failed to Delete.....',
    });

    throw error;
  }
};
