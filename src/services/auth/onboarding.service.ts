import axios from "axios";
import * as headers from "../../constants/auth-headers";
import { AuthServiceProvider } from "./authserviceProvider";
import {
  ONBOARDING_OTP_REQUEST_URL,
  ONBOARDING_OTP_VERIFY_URL,
  OTP_GRANT_TYPE,
} from "@/src/constants/environment";

const onBoardingHandler = () => {



  const { getToken } = AuthServiceProvider();
  let tokenDetails = getToken();
  
  const searchCustomerService = async (URL: string) => {
    try {
      const response = await axios.get(URL, {
        headers: {
          "X-RequestId": "2345678",
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error("Search Customer failed:", error);
      throw error;
    }
  };

  const otpService = async (URL: string) => {
    try {
      const response = await axios.get(URL, {
        headers: {
          "X-RequestId": "23456665",
          Authorization: `Bearer ${tokenDetails}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Search Customer failed:", error);
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

  const verifyOnboardingOtpService = async (
    accessToken: string,
    otp: string
  ) => {
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
  };

  return {
    searchCustomerService,
    otpService,
    onBoardingOtpService,
    verifyOnboardingOtpService,
  };
};

export { onBoardingHandler };
