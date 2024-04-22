import { ACCOUNT_RESTRICTIONS_URL } from "@/src/constants/environment";
import axios from "axios";

const CustomerRestrictionsHandler = () => {
  const fetchAccountrestrictions = async (
    accountId: number): Promise<accountRestrictionsTypes[]> => {
    const accountrestrictionsUrl = `${ACCOUNT_RESTRICTIONS_URL}/${accountId}`;

    try {
      const response = await axios.get(accountrestrictionsUrl, {
        headers: {
          'X-RequestId': '456789876543',
        },
      }).then((res) => {
      let apiResponse = res.data

      if (apiResponse) {
        let apiRes = apiResponse;
        let accountrestrictions: accountRestrictionsTypes[] = [
          ...apiRes,
        ];

        console.log('Fetched Account Restrictions:', accountrestrictions)
        return accountrestrictions;
      } else {
        throw new Error(apiResponse);
      }
      });
      return response;
    } catch (error) {
       throw error;
    }
  };

  return {
    fetchAccountrestrictions,
  };
}
export { CustomerRestrictionsHandler };