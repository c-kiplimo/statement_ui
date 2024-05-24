import { ACCOUNT_SETUP } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";
import { generateRequestId } from "../util/requestIdGenerateUtil";

const AccountSetupHandler = () => {

  
  const searchCustomer = async (
    onboardingType: string,
    value: string
  ): Promise<AccountSetup> => {
    let accountSetupUrl = ACCOUNT_SETUP;

    if (onboardingType === 'ACCOUNT_NUMBER' || onboardingType === 'CUSTOMER_NUMBER') {
      accountSetupUrl += `/${onboardingType}/${value}/Kenya`;
    } else {
      throw new Error('Invalid onboarding type');
    }

    const requestId = generateRequestId();

    try {
      const response = await axios.get<AccountSetup>(accountSetupUrl, {
        headers: {
          'X-RequestId': requestId,
        },
      });
      
      const apiResponse = response.data;
      if (apiResponse) {
        return apiResponse;
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      throw error;
    }
    
  };

  
  
  return {
    searchCustomer,
  };
};

export { AccountSetupHandler };
