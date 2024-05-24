import { EDIT_RESTRICTION_URL } from "@/src/constants/environment";
import { notification } from "antd";
import axios from "axios";

interface EditRestrictionData {
  name: string;
  description: string;
}

const editRestriction = async (restrictionId: number, data: EditRestrictionData) => {
  const editUrl = `${EDIT_RESTRICTION_URL}/${restrictionId}`;
  try {
    const response = await axios.put(editUrl, data, {
      headers: {
        "X-RequestId": "1345",
      }
    });
    
    notification.success({
      message: 'Restriction Edited Successfully',
    });
    return response;
  } catch (error) {
    notification.error({
      message: 'Failed to Edit Restriction',
    });
    throw error;
  }
};

export { editRestriction };
