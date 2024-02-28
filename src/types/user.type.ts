import React from 'react';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  mobileNumber: string;
  mfaEnabled: boolean;
  mfaRegistered: boolean;
  securityQuestionEnabled: boolean;
  consent: boolean;
};

export type UserDetailProps = {
  userName?: string;
  firstName?: string;
  lastName?: string;
  mobileNumber?: string;
  profileComplete?: boolean;
};
export type UserDetails = {
  key: React.Key;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
};
