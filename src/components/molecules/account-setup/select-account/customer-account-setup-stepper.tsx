'use client';
import React from 'react';
import CustomerProfileLayout from '../../shared-features/layout/customerProfileLayout';
import { useTokens } from '@/src/app/(context)/ColorContext';
import { useFont } from '@/src/app/(context)/ColorContext';
import style from './select-account.module.css';
import { Text } from '@/src/components/atoms/typography/primary_text';
import RadioButton from '@/src/components/atoms/button/radioButton/radio';
import CustomSearch from '@/src/components/atoms/input/customSearch';

export default function CustomerAccountSetupStepper() {
  const token = useTokens();
  const font = useFont();

  return (
    <CustomerProfileLayout>
      <div className={style.accountSelect}>
        <div className={style.stepperTitle}>
          <Text
            title="Do you want to Search by"
            font={font}
            textcolor={token.text.primary}
            lineHeight="1.5rem"
            className={style.stepperTitle}
          />
        </div>
        <div className={style.stepperRadio}>
          <RadioButton
            id="radio1"
            name="radio"
            label="Account Number"
            onChange={() => console.log('changed')}
            value="Account Number"
          />
          <RadioButton
            id="radio2"
            name="radio"
            value="Customer Number"
            label="Customer Number"
            onChange={() => console.log('changed')}
          />
        </div>
        <div className={style.customSearch}>
          <CustomSearch
            onSearch={function (value: string): void {
              throw new Error('Function not implemented.');
            }}
            dataSource={[]}
          />
        </div>
      </div>
    </CustomerProfileLayout>
  );
}
