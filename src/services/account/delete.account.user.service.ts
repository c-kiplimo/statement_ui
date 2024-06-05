import axios from "axios";
import { DELETE_ACCOUNT_USER } from "@/src/constants/environment";
import { notification } from "antd";

export const deleteAccountUser = async (userId: number) => {  
  const deleteUrl = `${DELETE_ACCOUNT_USER}/${userId}`;

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
