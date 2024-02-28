import React, { useState } from 'react';
import { useFont, useTokens } from '@/src/app/(context)/ColorContext';
import { CustomText } from '../../atoms/typography/primary_text';

import RadioButton from '../../atoms/button/radioButton/radio';
import style from './frequency-molecule-component.module.css';

import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, Select, TimePicker } from 'antd';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Button from '../../atoms/button/button';

interface FrequencyMoleculeProps {
  data?: AccountSchedule;
  onSubmit: (data: AccountSchedule) => void;
}

const FrequencyMoleculeComponent: React.FC<FrequencyMoleculeProps> = ({
  data,
  onSubmit,
}) => {
  const token = useTokens();
  const font = useFont();

  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    data ? data.frequency : undefined,
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    data ? data.startDate : undefined,
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    data ? data.endDate : undefined,
  );
  const [selectedFile, setSelectedFile] = useState<undefined | string>(
    data ? data.fileFormat : undefined,
  );
  const [selectedTemplate, setSelectedTemplate] = useState<undefined | string>(
    data ? data.template : undefined,
  );

  const radioOptions = [
    { id: 'Monthly', label: 'Monthly', name: 'frequencyOption' },
    { id: 'BiWeekly', label: 'BiWeekly', name: 'frequencyOption' },
    { id: 'Weekly', label: 'Weekly', name: 'frequencyOption' },
    { id: 'Daily', label: 'Daily', name: 'frequencyOption' },
  ];

  const onSubmitHandler = () => {
    const dataToSave: AccountSchedule = {
      frequency: selectedOption,
      startDate: startDate,
      template: selectedTemplate,
    };

    console.log('dataToSave', dataToSave);
    onSubmit(dataToSave);
  };

  const onFileChange = (value: string | undefined) => {
    setSelectedFile(value);
  };

  const onTemplateChange = (value: string) => {
    setSelectedTemplate(value);
  };

  const handleRadioButtonChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleStartDateChange = (date: string | Dayjs | null) => {
    if (date && typeof date !== 'string') {
      const startDateAsDate = (date as Dayjs).toDate();
      setStartDate(startDateAsDate);
      const formattedDate = (date as Dayjs).format('YYYY-MM-DD');
      console.log('Selected Start Date:', formattedDate);
    } else {
      console.error('Invalid date object:', date);
    }
  };

  dayjs.extend(customParseFormat);

  const onChange = (value: Dayjs | null, dateString: string) => {
    console.log('Selected Time:', value);
    console.log('Formatted Time String:', dateString);
    setEndDate(value ? new Date(value.toISOString()) : undefined);
  };

  const optionsFile = [
    { label: 'Option A', value: 'A' },
    { label: 'Option B', value: 'B' },
  ];

  const optionsTemplate = [
    { label: 'Template 1', value: 'Template1' },
    { label: 'SWIFT', value: 'SWIFT' },
  ];

  return (
    <>
      <div className={style.container}>
        <CustomText
          title="Statement Frequency "
          fontSize={font.typography.body.regular.fontSize}
          textColor={token.text.secondary}
          lineHeight={font.typography.body.regular.lineHeight}
          fontWeight={font.typography.body.regular.fontWeight}
          className="custom-text"
        />

        <div className={style.radioGroupContainer}>
          {radioOptions.map((option) => (
            <RadioButton
              key={option.id}
              id={option.id}
              name={option.name}
              label={option.label}
              checked={selectedOption === option.id}
              onChange={() => handleRadioButtonChange(option.id)}
            />
          ))}
        </div>

        <div className={style.dateAndTimeContainer}>
          <DatePicker
            style={{ position: 'relative', zIndex: '1' }}
            id="endDate"
            placement="bottomLeft"
            onChange={handleStartDateChange}
          />
          <TimePicker
            onChange={onChange}
            defaultValue={dayjs('00:00:00', 'HH:mm:ss')}
          />
        </div>
        <div className={style.selectDropdownContainer}>
          <div className={style.selectDropdown}>
            <CustomText
              title="File Format"
              fontSize={font.typography.body.regular.fontSize}
              textColor={token.text.secondary}
              lineHeight={font.typography.body.regular.lineHeight}
              fontWeight={font.typography.body.regular.fontWeight}
              className="custom-text"
            />
            <Select
              options={optionsFile}
              style={{ width: 120 }}
              value={selectedFile}
              placeholder="Select an option"
              onChange={onFileChange}
            />
          </div>

          <div className={style.selectDropdown}>
            <CustomText
              title="Template"
              fontSize={font.typography.body.regular.fontSize}
              textColor={token.text.secondary}
              lineHeight={font.typography.body.regular.lineHeight}
              fontWeight={font.typography.body.regular.fontWeight}
              className="custom-text"
            />

            <Select
              options={optionsTemplate}
              style={{ width: 124 }}
              value={selectedTemplate}
              placeholder="Select an option"
              onChange={onTemplateChange}
            />
          </div>
        </div>
      </div>

      <div className={style.submitButtonContainer}>
        <div className={style.submitButton}>
          <Button
            width="101px"
            label="SUBMIT"
            borderRadius="4px"
            opacity="0.8"
            bgColor={token.brand.primary}
            textColor="white"
            onClick={onSubmitHandler}
            style={{}}
          />
        </div>
      </div>
    </>
  );
};

export default FrequencyMoleculeComponent;
