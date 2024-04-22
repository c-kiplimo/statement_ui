import { ACCT_STMT_URL } from "@/src/constants/environment";
import axios from "axios";

export const StatementConfig = async (
  accountId: number,
  statementData: statementSetup
): Promise<statementSetup> => {
  try {
    console.log("Statement Data for Update:", statementData);

    statementData.accountId = accountId.toString();
    const response = await axios.post(ACCT_STMT_URL, statementData, {
      headers: {
        "X-RequestId": "23435",
      },
    });

    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to submit form data. Please try again later.");
  }
};
