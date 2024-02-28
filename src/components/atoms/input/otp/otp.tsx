'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

export const RE_DIGIT = new RegExp(/^\d+$/);

export type Props = {
  value: string;
  valueLength: number;
  onChange: (value: string) => void;
};

// Our child component
const OTPInputContainer = ({
  value = '654321',
  valueLength,
  onChange,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef('');
  const [otp, setOtp] = useState('654321');

  const refs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRef.current = inputValue;
  }, [inputValue]);

  const valueItems = useMemo(() => {
    const valueArray = value.split('');
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push('');
      }
    }

    return items;
  }, [value, valueLength]);

  const inputOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const currentRefs = refs.current;
    const target = e.target as HTMLInputElement;
    if (e.key == 'Backspace' && target.value == '') {
      const myRef = currentRefs[idx - 1];
      if (myRef) {
        myRef.focus();
      }
      return;
    }
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;
    target.setSelectionRange(0, target.value.length);
  };

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const target = e.target;
    let targetValue = target.value;

    const isTargetValueDigit = RE_DIGIT.test(targetValue);
    if (!isTargetValueDigit && targetValue !== '') {
      return;
    }
    targetValue = isTargetValueDigit ? targetValue : ' ';
    const newValue =
      value.substring(0, idx) + targetValue + value.substring(idx + 1);
    const added =
      newValue.replaceAll(' ', '').length > value.replaceAll(' ', '').length;

    const inputRef = refs.current;
    onChange(newValue);
    if (added) {
      const myRef = inputRef[idx + 1];

      if (myRef) {
        myRef.focus();
      }
    } else {
      const myRef = inputRef[idx];
      if (myRef) {
        myRef.focus();
      }
    }
  };

  return (
    <div
      style={{ width: '60px' }}
      id="OTPInputGroup"
      className="digitGroup"
      data-autosubmit="true"
    >
      {valueItems.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (refs.current[index] = el!)}
          className="center-text-input"
          type="text"
          maxLength={1}
          pattern="\d{1}"
          value={digit}
          onChange={(e) => inputOnChange(e, index)}
          onKeyDown={(e) => inputOnKeyDown(e, index)}
          onFocus={inputOnFocus}
        />
      ))}
    </div>
  );
};
export default OTPInputContainer;
