import { ASSIGN_ACCOUNT_USER } from "@/src/constants/environment";
import axios from "axios";

const createRestriction = async (
  accountId: number,
  accountRestrictions: any,
): Promise<number> => {
  try {
    const api = `${ASSIGN_ACCOUNT_USER}/${accountId}`;
    
    const response = await axios.post(api, accountRestrictions, {
      headers: {
        "X-RequestId": "3445",
      },
    });
    console.log("Response:", response.data);
    return response.data.id;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export { createRestriction };