import axios from "axios";
import * as headers from "../../constants/auth-headers";
import {
  ONBOARDING_OTP_REQUEST_URL,
  ONBOARDING_OTP_VERIFY_URL,
  OTP_GRANT_TYPE,
  SEARCH_CUSTOMER_URL,
} from "@/src/constants/environment";

const onBoardingHandler = () => {
  const searchCustomerService = async (accountNumber: string) => {
    const searchURL = `${SEARCH_CUSTOMER_URL}/${accountNumber}`;
    try {
      const response = await axios.get(searchURL, {
        headers: {
          "X-RequestId": "2345678",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };  

  const onBoardingOtpService = async (accessToken: string) => {
    try {
      const response = await axios.get(ONBOARDING_OTP_REQUEST_URL, {
        headers: {
          "X-RequestId": "23456665",
          "X-UserId": "motus",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const validateOtpService =async (accessToken: string, otp: string)=>{    
    try {
      const OTP_FORM = {
        grant_type: OTP_GRANT_TYPE,
        otp,
        assertion: accessToken,
        challenge: "444159",
      };
      const response = await axios.post(ONBOARDING_OTP_VERIFY_URL, OTP_FORM, {
        headers: headers.RequestOTPHeaders,
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      throw error;
    }
}

  return {
    searchCustomerService,
    onBoardingOtpService,
    validateOtpService,
  };
};

export { onBoardingHandler };
