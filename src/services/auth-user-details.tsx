import { UserDetailProps } from '../types/user.type';
import { AuthServiceProvider } from './auth/authserviceProvider';

const jwt = require('jsonwebtoken');

const userDetails = () => {
  const { getToken } = AuthServiceProvider();

  let tokenDetails = getToken();
  if (tokenDetails) {
    let accessToken = tokenDetails.accessToken;
    const decoded = jwt.decode(accessToken); 
    const { firstName, lastName, userName, mobileNumber, profileComplete } =
      decoded.userInfo;

    let userDetails: UserDetailProps = {
      userName,
      firstName,
      lastName,
      mobileNumber,
      profileComplete,
    };
    return userDetails;
  }
};

export { userDetails };
