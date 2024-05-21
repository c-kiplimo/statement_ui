import axios from "axios";
import {
  ONBOARDING_OTP_REQUEST_URL,
  ONBOARDING_OTP_VERIFY_URL,
  OTP_GRANT_TYPE,
  SEARCH_CUSTOMER_URL,
} from "@/src/constants/environment";
import * as headers from "@/src/constants/auth-headers";

const SearchCustomerHandler = () => {
  const SearchCustomerService = async (
    onboardingType: string,
    value: string,
    country: string
  )=> {
    try {
      const searchURL = `${SEARCH_CUSTOMER_URL}${onboardingType}/${value}/${country}`;

      const response = await axios.get(searchURL, {
        headers: {
          "X-RequestId": "2345678",
        },
      });
      console.log("Searched Customer>>", response.data);

      return response.data;
    } catch (error) {
      console.error("Error searchin customer:",error)
      throw error;
    }
  };

  const onBoardingOtpService = async (
    contactType: "EMAIL" | "MOBILE_NUMBER",
    accessToken: string,
    userId:string,
    value:string,
  ) => {
    const onboardingUrl = `${ONBOARDING_OTP_REQUEST_URL}${contactType}/${value}`;
    try {
      const response = await axios.get(onboardingUrl, {
        headers: {
          "X-RequestId": "23456665",
          "X-UserId": userId,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("OTP Sent:", JSON.stringify(response));
      return response;      
    } catch (error) {
      console.error("Eror sending OTP:",error)
      throw error;      
    }
  };

  const validateOtpService = async (accessToken: string, otp: string):Promise<ProfileCreation> => {
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
      console.log("OTP Validation Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error validating OTP:", error);
      throw error;
    }
  };

  return {
    SearchCustomerService,
    onBoardingOtpService,
    validateOtpService,
  };
};
export { SearchCustomerHandler };

