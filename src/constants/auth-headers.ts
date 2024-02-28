import {
  CLIENT_ID,
  CLIENT_SECRET,
  OTP_GRANT_TYPE,
} from './environment';

export const authHeaders = {
  'Content-Type': 'application/json',
  'X-RequestId': '123',
};

const base64encodedData = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64',
);

export const RequestTokenHeaders = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Basic ${base64encodedData}`,
};
export const RequestOTPHeaders = {
  'Content-Type': 'multipart/form-data',
  Authorization: `Basic ${base64encodedData}`,
  'grant-type': OTP_GRANT_TYPE,
};

export const plainHeaders = {
  'Content-Type': 'application/json',
  'X-RequestId': '123',
};

export const OAuthHeaders = {
  'Content-Type': 'application/json',
  'X-RequestId': '123',
};
