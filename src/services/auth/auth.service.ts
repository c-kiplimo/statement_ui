import axios from "axios";
import * as headers from "../../constants/auth-headers";
import {
  AUTH_GRANT_TYPE,
  OTP_GRANT_TYPE,
  REQUEST_OTP_URL,
  VERIFY_OTP_URL,
} from "@/src/constants/environment";

const authServiceHandler = () => {
  type RegisterProps = {
    register: {
      password: string;
      firstName: string;
      lastName: string;
      mobileNumber: string;
      email: string;
    };
  };

  type LoginProps = {
    login: {
      username: string;
      password: string;
      confirm?: boolean;
    };
  };

  const registerUserService = async (URL: string, PAYLOAD: RegisterProps) => {
    const { password, firstName, lastName, mobileNumber, email } =
      PAYLOAD.register;

    const payload = {
      password,
      firstName,
      lastName,
      mobileNumber,
      email,
    };
    try {
      const response = await axios.post(URL, payload, {
        headers: {
          "X-RequestId": "35342323",
        },
      });
      return response;
    } catch (error) {
      console.error("Register User failed:", error);
      throw error;
    }
  };

  const loginService = async (URL: string, PAYLOAD: LoginProps) => {
    const { username, password, confirm } = PAYLOAD.login;

    const payload = {
      username,
      password,
      grant_type: AUTH_GRANT_TYPE,
      confirm,
    };
    try {
      const response = await axios.post(URL, payload, {
        headers: headers.RequestTokenHeaders,
      });
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const requestOtpService = async (accessToken: string) => {
    try {
      const response = await axios.get(REQUEST_OTP_URL, {
        headers: {
          "X-RequestId": "12323",
          "X-UserId": "motus",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const verifyOtpService = async (accessToken: string, otp: string) => {
    try {
      const OTP_FORM = {
        grant_type: OTP_GRANT_TYPE,
        otp,
        assertion: accessToken,
        challenge: "444159",
      };
      const response = await axios.post(VERIFY_OTP_URL, OTP_FORM, {
        headers: headers.RequestOTPHeaders,
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    registerUserService,
    loginService,
    requestOtpService,
    verifyOtpService,
  };
};

export { authServiceHandler };
