import axios from "axios";
import { DELETE_USER_ACCOUNT_URL } from "@/src/constants/environment";
import { notification } from "antd";

export const deleteUser = async (accountId: number) => {
  const deleteUrl = `${DELETE_USER_ACCOUNT_URL}/${accountId}`;
  try {
    const response = await axios.delete(deleteUrl, {
      headers: {
        "X-RequestId": "123",
      },
    });
    
    notification.success({
      message: 'Account Deleted Successfully',
    });

    return response;
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';

    if (axios.isAxiosError(error) && error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    notification.error({
      message: 'Failed to Delete Account',
      description: errorMessage,
    });

    throw error;
  }
};
