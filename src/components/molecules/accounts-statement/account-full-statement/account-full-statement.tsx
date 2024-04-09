import ViewEyeIcon from '@/src/components/atoms/view-eye-icon/view-eye-icon';
import DateCard from '../../shared/statement-core/pickdate/pickdate.submit';
import TableDisplay from '../accounts-table/account-statement-table';
import { Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { AccountStatementRequestHandler } from '@/src/services/account/account.statement.request.service';
import { useAccountStatementContext } from '@/src/app/(context)/account-statement-context';
import { useCoreProps, useTokens } from '@/src/app/(context)/ColorContext';
import { Dayjs } from 'dayjs';
import AccountSearchResults from '@/src/components/widgets/account-search-results/account-search-results';

const AccountStatementTab = () => {
  const [startDate, setStartDate] = useState<string | null>('2023-12-28');
  const [endDate, setEndDate] = useState<string | null>('2023-12-28');
  const [loading, setLoading] = useState<boolean>(false);
  const [tagContent, setTagContent] = useState<string>('Pending');
  const [viewDetails, setViewDetails] = useState(false);
  const [createResponseId, setCreateResponseId] = useState<
    number | undefined
  >();
  const { accountId } = useAccountStatementContext();
  const startDateRef = useRef<string | null>(null);
  const endDateRef = useRef<string | null>(null);
  const selectedAccount = useRef<string | null>(null);
  const token = useTokens();
  const { colorToken, font } = useCoreProps();

  const onEyeIconClick = (apiId?: string | undefined) => {
    console.log(`Viewing account ${apiId}`);
    setViewDetails(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { createAccountStatementRequest } =
        AccountStatementRequestHandler();

      if (startDate && endDate && accountId && loading === true) {
        try {
          const formattedStartDate = new Date(startDate);
          const formattedEndDate = new Date(endDate);
          console.log(formattedStartDate, formattedEndDate, accountId);

          // Calling the first API to create a statement request
          const createResponse = await createAccountStatementRequest({
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            accountId,
          });
          console.log('api response', createResponse);
          console.log('api response', createResponse?.statementRequestId);
          // Checking if the statement request was successfully created
          if (createResponse?.statementRequestId) {
            setCreateResponseId(createResponse.statementRequestId);
            console.log('Statement request created successfully');

            setTagContent('Completed');
            console.log(`Statement Request Id ${createResponseId}`);

            console.log('Statement request created successfully');
          } else {
            console.log('Failed to create statement request');
          }
        } catch (error) {
          console.error('Error fetching account statement:', error);
        } finally {
          console.log('Request completed');
        }
      } else {
        console.log('Missing startDate, endDate, or accountId');
      }
    };

    // Fetch data only when loading is true
    if (loading) {
      fetchData();
    }
  }, [loading]);

  const onStartDateChanged = (el: string | Dayjs) => {
    if (el && typeof el !== 'string') {
      startDateRef.current = el.format('YYYY-MM-DD');
      setStartDate(el.format('YYYY-MM-DD'));
      console.log(`on Start Date selected ${el.format('YYYY-MM-DD')}`);
    }
  };

  const onEndDateChanged = (el: string | Dayjs) => {
    if (el && typeof el !== 'string') {
      endDateRef.current = el.format('YYYY-MM-DD');
      setEndDate(el.format('YYYY-MM-DD'));
      console.log(`on End Date selected ${el.format('YYYY-MM-DD')}`);
    }
  };

  const onSubmit = () => {
    console.log(
      `startDate ${startDateRef.current} and end date ${endDateRef.current} account statement ${selectedAccount.current}`,
    );
    setLoading(true);
  };
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const time_of_day = hours >= 12 ? 'PM' : 'AM';
  const formatted_hours = hours % 12 || 12;

  const cards = [
    {
      title: 'Date',
      content: `${day}-${month}-${year}`,
      additionalContent: `${formatted_hours}:${minutes} ${time_of_day}`,
    },
    {
      title: 'Account Number',
      content: 'Meraki Current Account',
      additionalContent: `KES ${selectedAccount.current}`,
    },
    {
      title: 'Description',
      content: 'Account Statement Generation ',
    },
    {
      title: 'Status',
      additionalContent: (
        <Tag
          bordered={false}
          style={{
            padding: '4px 16px',
            fontSize: '14px',
            fontWeight: '500',
            color: token.accent.success,
            lineHeight: '24px',
            background: token.accent.success_invert_01,
            borderRadius: '4px',
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          {tagContent}
        </Tag>
      ),
    },

    {
      title: '',
      content: (
        <ViewEyeIcon
          style={{
            cursor: 'pointer',
            color: '#979992',
          }}
          onClick={(createResponseId) => {
            onEyeIconClick(createResponseId);
            setViewDetails(true);
            console.log(`Viewing account ${createResponseId}`);
          }}
        />
      ),
      additionalContent: '',
    },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '19px',
        alignSelf: 'stretch',
        background: colorToken.default.white,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          gap: '19px',
          marginBottom: '10px',
        }}
      >
        <DateCard
          onStartDateChange={onStartDateChanged}
          onEndDateChange={onEndDateChanged}
          onSubmitChange={onSubmit}
        />
      </div>

      {viewDetails ? (
        <TableDisplay
          colorTokens={token}
          font={font}
          statementRequestId={createResponseId}
        />
      ) : (
        <>
          {loading ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                gap: '19px',
                width: '100%',
              }}
            >
              <AccountSearchResults
                customStyle={{ boxShadow: 'none', alignItems: 'baseline' }}
                cards={cards}
              />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};
export default AccountStatementTab;
