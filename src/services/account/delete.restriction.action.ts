import axios from "axios";
import { DELET_RESTRICTION_URL } from "@/src/constants/environment";
import { notification } from "antd";

export const deleteRestriction = async (restrictionId: number) => {
  const deleteUrl = `${DELET_RESTRICTION_URL}/${restrictionId}`;
  console.log(`Attempting to delete restriction with ID: ${restrictionId}`);
  console.log(`Delete URL: ${deleteUrl}`);

  try {
    const response = await axios.delete(deleteUrl, {
      headers: {
        "X-RequestId": "2344",
      },
    });
    console.log("Response data:", response.data);

    notification.success({
      message: 'Deleted Successfully'
    });

    return response;
  } catch (error) {
    console.error("Error deleting restriction:", error);

    notification.error({
      message: 'Failed to Delete.....',
    });

    throw error;
  }
};
