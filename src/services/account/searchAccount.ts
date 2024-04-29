import axios from "axios";
import { SEARCH_CUSTOMER_URL } from "@/src/constants/environment";

const SearchCustomerHandler = async (accountNumber: string): Promise<Card []> => {
  const searchaccounturl = `${SEARCH_CUSTOMER_URL}/${accountNumber}`;

  try {
    const response = await axios.get(searchaccounturl, {
      headers: {
        'X-RequestId': '345678907',
      },
    });

    const apiResponse = response.data;

    if (apiResponse) {
      const accountOverview: Card [] = [
        ...apiResponse,
    ];
      return accountOverview;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error) {
    throw new Error(`Failed to fetch account overview:`);
  }
};

export default SearchCustomerHandler;