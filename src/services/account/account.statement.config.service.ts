import { ACCT_STMT_URL } from "@/src/constants/environment";
import { notification } from "antd";
import axios from "axios";

interface StatementSetup {
  accountId?: number;
  
}

export const StatementConfig = async (
  accountId: number,
  statementData: StatementSetup
): Promise<StatementSetup> => {
  try {
    statementData.accountId = accountId;

    const response = await axios.post(ACCT_STMT_URL, statementData, {
      headers: {
        "X-RequestId": "23435",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
    } else {
      console.error("Error:", notification.error);
    }
    throw new Error("Failed to submit form data. Please try again later.");
  }
};
