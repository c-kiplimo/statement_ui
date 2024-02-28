'use client';

import React from 'react';
import { useTokens } from '@/src/app/(context)/ColorContext';

const CompoundIndividualBusinessBtn = ({ text, children }: any) => {
  const token = useTokens();
  return (
    <div className="text-center align-top">
      <div
        style={{
          display: 'flex',
          width: '460px',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: '40px',
          backgroundColor: 'red',
        }}
      >
        <h6
          style={{
            color: 'var(--text-text-secondary)',

            // fontFamily: "Roboto",
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '32px',
          }}
          className="text[textColor] font-medium  text-left  mb-2 "
        >
          {text}
        </h6>
        {children}
      </div>
    </div>
  );
};

export default CompoundIndividualBusinessBtn;
