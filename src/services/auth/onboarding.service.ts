import axios from 'axios';
import { AuthServiceProvider } from './authserviceProvider';
const onBoardingHandler = () => {
  const { getToken } = AuthServiceProvider();
  let tokenDetails = getToken();
  const searchCustomerService = async (URL: string) => {
    try {
      const response = await axios.get(URL, {
        headers: {
          'X-RequestId': '2345678',
        },
      });
      return response;
    } catch (error) {
      console.error('Search Customer failed:', error);
      throw error;
    }
  };

  const onBoardingOtpService = async (URL: string) => {
    try {
      const response = await axios.get(URL, {
        headers: {
          'X-RequestId': '23456665',
          Authorization: `Bearer ${tokenDetails}`,
        },
      });
      return response;
    } catch (error) {
      console.error('Search Customer failed:', error);
      throw error;
    }
  };

  return {
    searchCustomerService,
    onBoardingOtpService,
  };
};

export { onBoardingHandler };
