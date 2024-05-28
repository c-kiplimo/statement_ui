import { ADD_RESTRICTION_URL } from "@/src/constants/environment";
import axios from "axios";

interface CreateRestriction {
  [x: string]: string;
  name: string;
  description: string;
}

const createRestriction = async (
  customerId: number,
  accountRestrictions: CreateRestriction
): Promise<number> => {
  try {
    accountRestrictions.customerId = customerId.toString();
    const response = await axios.post(ADD_RESTRICTION_URL, accountRestrictions, {
      headers: {
        "X-RequestId": "456789876543",
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
