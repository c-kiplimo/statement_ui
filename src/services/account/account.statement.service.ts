import { ACCOUNT_STATEMENT_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";


const AccountStatementHandler = () => {
  const fetchAccountStatement: (
    accountId: string,
    startDate: string,
    endDate: string
  ) => Promise<AccountStatement > = async (
    accountId: string,
    startDate: string,
    endDate: string
  ) => {
    const accountStatementUrl = `${ACCOUNT_STATEMENT_URL}/${accountId}?startDate=${startDate}&endDate=${endDate}`;

    try {
      const response= await axios.get(accountStatementUrl, {
        headers: {
          'X-RequestId': '3456778909',
        },
      }).then((res) => {

      let apiResponse = res.data;

      if (apiResponse) {
        let apiRes = apiResponse;
        let statement: AccountStatement = {
          ...apiRes,
        };
        return statement
      } else {
        throw new Error('Empty response');
      }
    });
    return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchAccountStatement,
  };
};

export { AccountStatementHandler };
