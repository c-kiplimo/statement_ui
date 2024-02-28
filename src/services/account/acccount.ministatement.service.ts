import { ACCOUNT_MINI_STATEMENT_URL } from "@/src/constants/environment";
import axios from "axios";

const AccountMiniStatementHandler = () => {
  const fetchAccountMiniStatement = async (
    accountId: string
  ): Promise<MiniStatement[]> => {
    const accountMiniStatementUrl = `${ACCOUNT_MINI_STATEMENT_URL}/${accountId}`;

    try {
      const response = await axios
        .get<MiniStatement[]>(accountMiniStatementUrl, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          let apiResponse = res.data;

          if (apiResponse) {
            let apiRes = apiResponse;
            let miniStatement: MiniStatement[] = [...apiRes];
            return miniStatement;
          } else {
            throw new Error("Empty response");
          }
        });

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchAccountMiniStatement,
  };
};

export { AccountMiniStatementHandler };
