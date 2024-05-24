import axios from "axios";
import { DELET_RESTRICTION_URL } from "@/src/constants/environment";
import { notification } from "antd";


export const deleteRestriction = async (restrictionId: number) => {
  const deleteUrl = `${DELET_RESTRICTION_URL}/${restrictionId}`;
  try {
    const response = await axios.delete(deleteUrl,{
      headers: {
        "X-RequestId": "2344",
      }
    });
    notification.success({
      message: 'Deleted Successfully'
    });


    return response;
  } catch (error) {

    notification.error({
      message: 'Failed to Delete.....',
      
    });

    throw Error;
  }
};