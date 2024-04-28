export const API_URL = 'http://45.79.252.234:9001';
export const PROFILE_URL = 'http://45.79.252.234:9002';

export const AUTH_URL_LOGIN = `${API_URL}/oauth2/token`;
export const AUTH_URL_REGISTER = `${API_URL}/api/v1/user`;
export const CLIENT_ID = 'message-client';
export const CLIENT_SECRET = 'test123';
export const AUTH_GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:motus';
export const OTP_GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:OTP';

export const REQUEST_OTP_URL = `${API_URL}/api/v1/multifactor/otp`;
export const VERIFY_OTP_URL = `${API_URL}/oauth2/token`;

export const USER_PROFILE_URL = `${PROFILE_URL}/api/v1/profile/`;
export const AGGREGATE_PROFILE_URL = `${PROFILE_URL}/api/v1/aggregateprofiles/`;

export const SEARCH_CUSTOMER_URL = `${PROFILE_URL}/api/v1/onboarding/`;

export const ONBOARDING_OTP_REQUEST_URL = `${API_URL}/api/v1/multifactor/otp/`;

export const ONBOARDING_OTP_VERIFY_URL = `${API_URL}/oauth2/token`;

export const RESET_PASSWORD_URL = `${API_URL}/api/v1/user/forgot?email=`;

export const RESET_PASSWORD_VALIDATE_OTP_URL = `${API_URL}/api/v1/user/validate?otp=`;

export const SET_NEW_PASSWORD_URL = `${API_URL}/api/v1/user/reset?userId=`;

export const ACCOUNT_STATEMENT_URL = `${PROFILE_URL}/api/v1/accounts/statements`;

export const ACCOUNT_MINI_STATEMENT_URL = `${PROFILE_URL}/api/v1/accounts/ministatement`;

export const ACCOUNT_OVERVIEW_URL = `${PROFILE_URL}/api/v1/accounts`;

export const ACCOUNT_SCHEDULES_URL = `${PROFILE_URL}/api/v1/accounts/schedule`;

export const CARDS_URL = `${PROFILE_URL}/api/v1/cards`;

export const CUSTOMER_ACTIVITIES_URL = `${PROFILE_URL}/api/v1/activities`;

export const CUSTOMER_ACCOUNT_URL = `${PROFILE_URL}/api/v1/customers/account`;

export const CUSTOMER_DETAILS_URL = `${PROFILE_URL}/api/v1/onboarding`;

export const ACCOUNT_RESTRICTIONS_URL = `${PROFILE_URL}/api/v1/accounts/restrictions`;

export const CUSTOMER_RESTRICTIONS_URL = `${PROFILE_URL}/api/v1/customers/restrictions`;

export const ACCOUNT_STATEMENT_REQUEST_URL =`${PROFILE_URL}/api/v1/statement-request`;

export const USER_PERMISSION_URL = `${API_URL}/api/v1/user-permission`;

export const USER_GROUP_URL = `${API_URL}/api/v1/user-group`;

export const USER_URL = `${API_URL}/api/v1/user`;

export const PERMISSION_URL=`${API_URL}/api/v1/permission`;

export const GROUP_URL = `${API_URL}/api/v1/group`;

export const USER_ACCOUNTS_OVERVIEW = `${PROFILE_URL}/api/v1/aggregateprofiles`
export const USER_ACCOUNTS_BY_ACCOUNTS_ID = `${PROFILE_URL}/api/v1/accounts`
export const USER_CARD_BY_CARD_NUMBER = `${PROFILE_URL}/api/v1/cards`

export const SEARCH_DATA_URL = `${PROFILE_URL}/api/v1/statement-request`
export const STATEMENT_ENTRY_BY_ID = `${PROFILE_URL}/api/v1/statemententries`

