import React from 'react';
import AccountDatePicker from '../../../../widgets/datepicker/account.datepicker';
import SubmitButton from '../../statement-search-button/statement.search.button';
import styles from './element.module.css';
import { Dayjs } from 'dayjs';

type DateCardProps = {
  onStartDateChange: (element: string | Dayjs) => void;
  onEndDateChange: (element: string | Dayjs) => void;
  onSubmitChange: (element: React.FormEvent) => void;
};

const DateCard = (props: DateCardProps) => {
  return (
    <div className={styles.container}>
      <AccountDatePicker
        title={'Start Date:'}
        onDateChange={props.onStartDateChange}
      />
      <AccountDatePicker
        title={'End Date:'}
        onDateChange={props.onEndDateChange}
      />
      <div className={styles.submit}>
        <SubmitButton onSubmit={props.onSubmitChange} />
      </div>
    </div>
  );
};
export default DateCard;
