import React from 'react';
import style from './account-setup-activity.module.css';
import RadioButton from '@/src/components/atoms/button/radioButton/radio';
import Label from '@/src/components/atoms/label/label';
import { DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import Button from '@/src/components/atoms/button/button';
import { useTokens } from '@/src/app/(context)/ColorContext';

function SetupCard() {
  const currentDate = new Date();
  const format = 'HH:mm';
  const token = useTokens();
  return (
    <>
      <div className={style.setupCardContainer}>
        <div>
          <Label
            htmlFor="radio1"
            label="Allow MT 940 / MT 950 Statements"
            required={false}
            style={{ marginBottom: '50rem' }}
          />
          <div className={style.setupCardRadio}>
            <RadioButton
              id="radio1"
              name="radio"
              label="No"
              onChange={() => console.log('changed')}
              value="No"
              checked
            />
            <RadioButton
              id="radio2"
              name="radio"
              value="Yes"
              label="Yes"
              onChange={() => console.log('changed')}
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="radio2"
            label="Allow for Online Statement"
            required={false}
          />
          <div className={style.setupCardRadio}>
            <RadioButton
              id="radio1"
              name="radio"
              label="No"
              onChange={() => console.log('changed')}
              value="No"
            />
            <RadioButton
              id="radio2"
              name="radio"
              value="Yes"
              label="Yes"
              checked
              onChange={() => console.log('changed')}
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="radio3"
            label="Scheduled Statements"
            required={false}
          />
          <div className={style.setupCardRadio}>
            <RadioButton
              id="radio1"
              name="radio"
              label="No"
              onChange={() => console.log('changed')}
              value="No"
            />
            <RadioButton
              id="radio2"
              name="radio"
              value="Yes"
              label="Yes"
              checked
              onChange={() => console.log('changed')}
            />
          </div>
        </div>
        <div>
          <Label
            htmlFor="radio3"
            label="Statement Frequency"
            required={false}
          />
          <div className={style.setupCardRadio}>
            <RadioButton
              id="radio1"
              name="radio"
              label="Monthly"
              onChange={() => console.log('changed')}
              value="No"
              checked
            />
            <RadioButton
              id="radio1"
              name="radio"
              label="Bi Weekly"
              onChange={() => console.log('changed')}
              value="No"
            />
            <RadioButton
              id="radio2"
              name="radio"
              value="Yes"
              label="Weekly"
              onChange={() => console.log('changed')}
            />
            <RadioButton
              id="radio2"
              name="radio"
              value="Yes"
              label="Daily"
              onChange={() => console.log('changed')}
            />
          </div>
        </div>
        <div className={style.setupCardDate}>
          <DatePicker defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')} />
          <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
        </div>
      </div>
      <div
        style={{
          marginTop: '20px',
          width: ' 100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          width="101px"
          height="42px"
          label="Next"
          bgColor={token.brand.primary}
          textColor="white"
          onClick={() => console.log('clicked')}
        />
      </div>
    </>
  );
}

export default SetupCard;
