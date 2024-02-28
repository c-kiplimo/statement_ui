import { CUSTOMER_DETAILS_URL } from "@/src/constants/environment";
import { CUSTOMER_RESTRICTIONS_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";


const CustomerDetailsHandler= () => {
  const fetchCustomerDetails :(
    onboardingType: string,
    value: string,
    country: string
  )=> Promise<CustomerDetails> = async (
    onboardingType: string,
    value: string,
    country: string
  ) => {
    
     const customerDetailsUrl =`${CUSTOMER_DETAILS_URL}/${onboardingType}/${value}/${country}`;
  

    try {
      const response = await axios.get(customerDetailsUrl, {
        headers: {
          "X-RequestId": "3456778909",
        },
      }).then((res) => {
      let apiResponse = res.data

      if (apiResponse) {
        let apiRes = apiResponse;
        let customerDetails: CustomerDetails = {
          ...apiRes,
        };
        return customerDetails;
      } else {
        throw new Error(apiResponse);
      }
      });
      return response;
    } catch (error) {
       throw error;
    }
  };
  const fetchCustomerRestrictions = async (
    customerId:number
  ) : Promise<CustomerRestrictions[]> => {
    const customerRestrictionsUrl = `${CUSTOMER_RESTRICTIONS_URL}/${customerId}`;

    try {
      const response = await axios.get(customerRestrictionsUrl, {
        headers: {
          "X-RequestId": "3456778909",
        },
      }).then((res) => {
      let apiResponse = res.data

      if (apiResponse) {
        let apiRes = apiResponse;
        let customerRestrictions: CustomerRestrictions[] = [
          ...apiRes,
        ];
        return customerRestrictions;
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
    fetchCustomerDetails,
    fetchCustomerRestrictions,
  };
}
export { CustomerDetailsHandler };