import { ADD_RESTRICTION_URL } from "@/src/constants/environment";
import axios from "axios";

const createRestriction = async (
  customerId: number,
  accountRestrictions: any,
): Promise<number> => {
  try {
    const api = `${ADD_RESTRICTION_URL}/${customerId}`;
    
    const response = await axios.post(api, accountRestrictions, {
      headers: {
        "X-RequestId": "3563",
      },
    });
    console.log("Response:", response.data);
    return response.data.id;
  } catch (error) {
    console.error("Error creating restriction:", error);
    throw error;
  }
};

export { createRestriction };