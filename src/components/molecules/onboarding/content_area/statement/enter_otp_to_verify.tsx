'use client';

import { authServiceHandler } from '@/src/services/auth/auth.service';
import OTPInputContainer from '@/src/components/atoms/input/otp/otp';
import { useTokens } from '@/src/app/(context)/ColorContext';
import { useAuthContext } from '@/src/app/(context)/authentication-context';
import FormBuilder from '@/src/components/molecules/shared-features/form_builder';
import { Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { userDetails } from '@/src/services/auth-user-details';

type OtpVerifytProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const EnterOtpToVerify = (props: OtpVerifytProps) => {
  const user_details = userDetails();
  const firstName = user_details?.firstName;
  const [value, valueChanged] = useState('');
  const { token } = useAuthContext();
  const { requestOtpService, verifyOtpService } = authServiceHandler();

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onOtpSubmit(value);
  };

  const tokenColor = useTokens();
  const router = useRouter();

  const onOtpSubmit = async (otp: string) => {
    try {
      // const accessToken: string = token?.accessToken || '';
      // const otpVerificationResponse = await verifyOtpService(accessToken, otp);
      // router.push('/statement/dashboard');
    } catch (error) {
      console.error('Error during OTP verification:', error);
    }
  };

  const [timer, timerChanged] = useState(300);

  const interValRef = useRef<number>(0);

  const formatTime = (time: number) => {
    const secs = Math.floor(time) % 60;
    const mins = Math.floor(time / 60) % 60;
    return `${mins}:${secs}`;
  };

  const stopTimer = () => {
    window.clearInterval(interValRef.current);
  };

  function resendOtp(event: React.MouseEvent<HTMLDivElement>): void {
    event.preventDefault();
    timerChanged(300);
    stopTimer();
    requestOtpService(token?.accessToken || '');
  }

  useEffect(() => {
    interValRef.current = window.setInterval(() => {
      timerChanged((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : prevTimer));
    }, 1000);

    return () => {
      stopTimer();
    };
  }, [timer]);
  return (
    <FormBuilder>
      <div className="text-center">
        <h1 className="otp-title-text text-left">Enter OTP to verify</h1>
        <div className="otp-leading-text-description my-8 text-left">
          Please enter the verification code just sent to your email
          <span className="otp-email-link-text" style={{ margin: '5px' }}>
            <Link href="#">{firstName}</Link>
          </span>
        </div>
        <div className="space-y-5">
          <OTPInputContainer
            valueLength={6}
            value={value}
            onChange={(e: string) => {
              valueChanged(e);
            }}
          />
        </div>

        <div className="otp-leading-text-description text-left">
          Didn’t get code?
          <div className="otp-email-link-text">
            <span style={{ color: tokenColor.accent.info }} onClick={resendOtp}>
              Send again
            </span>
          </div>
        </div>

        <p
          style={{ color: tokenColor.text.description_01 }}
          className=" mt-5 w-52 text-left"
        >
          Time Remaining :{' '}
          <strong style={{ color: tokenColor.default.black }}>
            {formatTime(timer)} minutes remaining
          </strong>
        </p>

        <div
          style={{ marginTop: '2rem', minWidth: '100%' }}
          className="digitGroup"
        >
          <Button
            style={{ padding: '0', color: tokenColor.text.description_01 }}
            type="link"
            onClick={(event) => {
              props.onClick(event);
            }}
          >
            Back
          </Button>

          <div
            style={{
              backgroundColor: tokenColor.default.white,
              minWidth: '100%',
            }}
          >
            <button
              type="submit"
              onClick={handleSubmit}
              style={{
                height: '40px',
                borderRadius: '5px',
                minWidth: '250px',
                color: tokenColor.default.white,
                backgroundColor: 'var(--brand-brand-primary)',
              }}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </FormBuilder>
  );
};

export default EnterOtpToVerify;
