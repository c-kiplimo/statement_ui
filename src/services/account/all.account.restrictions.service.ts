import { All_RESTRICTIONS_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

const FetchAllAccountRestrictions = async (): Promise<restrictionsTypes> => {
  const accountRestrictionsUrl = All_RESTRICTIONS_URL;

  try {
    const response: AxiosResponse<restrictionsTypes> = await axios.get(accountRestrictionsUrl, {
      headers: {
        'X-RequestId': '345',
      },
    });

    if (response.data) {
      console.log('Fetched Account Restrictions:', response.data);
      const data = response.data;

      const apiRes:restrictionsTypes = {
        ...data
      }
      console.log(apiRes);
      
      return apiRes
    } else {
      throw new Error('No data received from API');
    }
  } catch (error:any) {
    console.error('Error fetching account restrictions:', error.message);
    throw error;
  }
};

export { FetchAllAccountRestrictions };
