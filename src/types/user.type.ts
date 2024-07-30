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
  profileComplete?:boolean
};

export type UserDetailProps = {
  id?:string;
  userName?: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email?:string;
  profileComplete: boolean;
};

export type UserDetails = {
  key: React.Key;
  content?:string[];
  createdAt?:string;
  id?:string;
  usersName?:string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  status?:string;
  username?:string;
}

export type profileDetails={
  username:string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber:string;
  language?:string;
  userType:string;
  status?:boolean;
  createdAt:string;
}

export type PendingUser = {
  userName?: string;
  firstName: string;
  lastName: string;
  userType?: string;
  password: string;
  status?: string;
  mobileNumber: string;
  email: string;
};


