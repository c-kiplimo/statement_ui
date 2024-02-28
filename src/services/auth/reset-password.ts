import axios from 'axios';
import {
  RESET_PASSWORD_URL,
  RESET_PASSWORD_VALIDATE_OTP_URL,
  SET_NEW_PASSWORD_URL,
} from '../../constants/environment';

const resetPasswordHandler = () => {
  const resetPasswordService = async (email?: string) => {
    const resetUrl = `${RESET_PASSWORD_URL}${email}`;
    try {
      const response = await axios.get(resetUrl, {
        headers: {
          'X-RequestId': '3456778909',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const validateOtpService = async (otp: string, userId: string) => {
    const validateOtpUrl = `${RESET_PASSWORD_VALIDATE_OTP_URL}${otp}&userId=${userId}`;
    try {
      const response = await axios.post(validateOtpUrl, null, {
        headers: {
          'X-RequestId': '3456778909',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const setNewPasswordService = async (password: string, userId: string) => {
    const setNewPasswordUrl = `${SET_NEW_PASSWORD_URL}${userId}`;
    try {
      const response = await axios.put(
        setNewPasswordUrl,
        { password: password },
        {
          headers: {
            'X-RequestId': '3456778909',
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    resetPasswordService,
    validateOtpService,
    setNewPasswordService,
  };
};

export { resetPasswordHandler };
