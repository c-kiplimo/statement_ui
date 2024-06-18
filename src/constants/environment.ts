export const API_URL = "http://41.80.34.214:9001";
export const PROFILE_URL = "http://41.80.34.214:9002";
export const DOWNLOAD_URL = "http://41.80.34.214:9003";



export const AUTH_URL_LOGIN = `${API_URL}/oauth2/token`;

export const AUTH_URL_REGISTER = `${API_URL}/api/v1/user`;

export const CLIENT_ID = "message-client";

export const CLIENT_SECRET = "test123";

export const AUTH_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:motus";

export const OTP_GRANT_TYPE = "urn:ietf:params:oauth:grant-type:OTP";

export const REQUEST_OTP_URL = `${API_URL}/api/v1/multifactor/otp`;

export const VERIFY_OTP_URL = `${API_URL}/oauth2/token`;

export const CREATE_USER_URL=`${API_URL}/api/user/profile/v1`;

export const USER_PROFILE_URL = `${PROFILE_URL}/api/v1/profile/`;

export const AGGREGATE_PROFILE_URL = `${PROFILE_URL}/api/v1/aggregateprofiles/`;

export const SEARCH_CUSTOMER_URL = `${PROFILE_URL}/api/v1/onboarding/`;

export const ACCOUNT_SETUP = `${PROFILE_URL}/api/v1/account-setup`;

export const ONBOARDING_OTP_REQUEST_URL = `${API_URL}/api/v1/multifactor/otp/`;

export const ONBOARDING_OTP_VERIFY_URL = `${API_URL}/oauth2/token`;

export const RESET_PASSWORD_URL = `${API_URL}/api/v1/user/forgot?email=`;

export const RESET_PASSWORD_VALIDATE_OTP_URL = `${API_URL}/api/v1/user/validate?otp=`;

export const SET_NEW_PASSWORD_URL = `${API_URL}/api/v1/user/reset?userId=`;

export const ACCOUNT_STATEMENT_URL = `${PROFILE_URL}/api/v1/accounts/statements`;

export const ACCOUNT_MINI_STATEMENT_URL = `${PROFILE_URL}/api/v1/accounts/ministatement`;

export const ACCOUNT_OVERVIEW_URL = `${PROFILE_URL}/api/v1/accounts`;

export const CUSTOMERS_URL = `${PROFILE_URL}/api/v1/customers`;

export const ACCOUNT_SCHEDULES_URL = `${PROFILE_URL}/api/v1/accounts/schedule`;

export const CARDS_URL = `${PROFILE_URL}/api/v1/cards`;

export const CUSTOMER_ACTIVITIES_URL = `${PROFILE_URL}/api/v1/activities`;


export const CUSTOMER_ACCOUNT_URL = `${PROFILE_URL}/api/v1/customers/account`;

export const CUSTOMER_DETAILS_URL = `${PROFILE_URL}/api/v1/onboarding`;

export const ACCOUNT_RESTRICTIONS_URL = `${PROFILE_URL}/api/v1/accounts/restrictions`;

export const CUSTOMER_RESTRICTIONS_URL = `${PROFILE_URL}/api/v1/restrictions`;

export const ACCOUNT_STATEMENT_REQUEST_URL = `${PROFILE_URL}/api/v1/statement-request`;

export const REGISTER_PENDING_USER= `${API_URL}/api/v1/user/pending`;

export const PENDING_USER=`${API_URL}/api/v1/user/pending`;

export const AUTHORIZE_USER=`${API_URL}/api/v1/user/authorize`;

export const UNAUTHORIZE_USER=`${API_URL}/api/v1/user/unauthorize`;

export const USER_PERMISSION_URL = `${API_URL}/api/v1/user-permission`;

export const USER_GROUP_URL = `${API_URL}/api/platform/group/v1`;

export const USER_GROUPS_URL =`${PROFILE_URL}/api/v1/groups/`;

export const CREATE_ROLE_URL=`${PROFILE_URL}/api/v1/groups`;

export const EDIT_ROLE_URL=`${PROFILE_URL}/api/v1/groups`;

export const USER_URL = `${API_URL}/api/v1/user`;

export const USER_BY_USERID_URL=`${API_URL}/api/v1/user/profile`;

export const PERMISSION_URL = `${API_URL}/api/v1/permission`;

export const GROUP_URL = `${API_URL}/api/v1/group`;

export const GET_PROFILE_DETAILS = `${API_URL}/api/user/profile/v1`;

export const GET_USER_PROFILE_DETAILS = `${API_URL}/api/v1/user/profile`;

export const CLOSE_ACCOUNT_URL = `${API_URL}/api/v1/user-settings`;

export const USER_ACCOUNTS_OVERVIEW = `${PROFILE_URL}/api/v1/aggregateprofiles`
export const USER_ACCOUNTS_BY_ACCOUNTS_ID = `${PROFILE_URL}/api/v1/accounts`
export const USER_CARD_BY_CARD_NUMBER = `${PROFILE_URL}/api/v1/card-overview`

export const SEARCH_DATA_URL = `${PROFILE_URL}/api/v1/statement-request`;

export const STATEMENT_ENTRY_BY_ID = `${PROFILE_URL}/api/v1/statemententries`;

export const FIND_USER_ACCOUNT_BY_ID = `${PROFILE_URL}/api/v1/account-overview`;

export const VIEW_MORE_ACCOUNT_BY_CUSTID = `${PROFILE_URL}/api/v1/accounts/summary`;

export const DOWNLOAD_DEFAULT_TEMPLATE = `${DOWNLOAD_URL}/api/v1/statement/download`;

export const GET_ACCOUNT_STATUS = `${PROFILE_URL}/api/v1/accounts`;

export const GET_ACCOUNT_SCHEDULE = `${PROFILE_URL}/api/v1/accounts/schedule`;

export const ACCOUNT_STATEMENT_REQUEST_COMPLETE = `${PROFILE_URL}/api/v1/statement-request/account`;

export const CREATE_ACCOUNT_SHEDULE = `${PROFILE_URL}/api/v1/accounts/schedule`;

export const DELETE_ACCOUNT_SCHEDULE = `${PROFILE_URL}/api/v1/accounts/schedule`;

export const GET_ACCOUNT_SCHEDULE_BY_ID = `${PROFILE_URL}/api/v1/accounts/schedule/account`;

export const UPDATE_ACCOUNT_SHEDULE = `${PROFILE_URL}/api/v1/accounts/schedule`;

export const RAISE_QUESTION_URL = `${PROFILE_URL}/api/v1/customer-help`;

export const CREATE_USER_NOTIFICATION_STATUS = `${PROFILE_URL}/api/v1/notification`;

export const FETCH_USER_NOTIFICATION_STATUS = `${PROFILE_URL}/api/v1/notification`;

export const ACCOUNT_STATEMENT_BY_USER_ID = `${PROFILE_URL}/api/v1/statement-request/user`;

export const DELET_RESTRICTION_URL = `${PROFILE_URL}/api/v1/restrictions`;

export const ADD_RESTRICTION_URL = `${PROFILE_URL}/api/v1/restrictions/assign`;

export const EDIT_RESTRICTION_URL = `${PROFILE_URL}/api/v1/restrictions`;

export const ACCT_STMT_URL = `${PROFILE_URL}/api/v1/accounts/configure`;

export const GET_ACCOUNT_CONFIG = `${PROFILE_URL}/api/v1/accounts/configure`;

export const GET_USERS_URL= `${PROFILE_URL}/api/v1/accounts/users`;

export const GET_CUSTOMER_USERS_URL= `${PROFILE_URL}/api/v1/customers/users`;

export const DELETE_USER_ACCOUNT_URL= `${PROFILE_URL}/api/v1/accounts`;

export const LOGOUT_USER= `${API_URL}/api/v1/user/logout`;


export const USER_ACCOUNTS_URL = `${PROFILE_URL}/api/v1/accounts/users`;

export const All_RESTRICTIONS_URL = `${PROFILE_URL}/api/v1/restrictions?page=0&size=10&sort=name,asc`;

export const DELETE_ACCOUNT_USER =`${PROFILE_URL}/api/v1/accounts`;

export const ADD_CUSTOMER_USER_ACCOUNT=`${PROFILE_URL}/api/v1/accounts/assign`;

export const CUSTOMER_USER_PROFILE=`${PROFILE_URL}/api/v1/customers/user`;

export const DELETE_CUSTOMER_USER_URL= `${PROFILE_URL}/api/v1/customers/users`;

export const GET_CUSTOMER_USER_ACTIVITIES_URL = `${PROFILE_URL}/api/account/user/activities/v1`;

export const GET_CUSTOMER_USER_ACCOUNT_URL = `${PROFILE_URL}/api/v1/accounts/user`;

export const  GET_CUSTOMER_USER_GROUPS_URL = `${API_URL}/api/platform/group/v1`;

export const ADD_CUST_USER_URL =`${PROFILE_URL}/api/v1/customers/assign`;