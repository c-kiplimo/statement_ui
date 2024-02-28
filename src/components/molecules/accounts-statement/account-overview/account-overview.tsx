import { useAccountStatementContext } from '@/src/app/(context)/account-statement-context';
import {
  InfoIconItem,
  InfoItem,
} from '@/src/components/atoms/cards/infoitems/info.item';
import { AccountHandler } from '@/src/services/account/account.service';
import { useEffect, useState } from 'react';

const AccountOverview = () => {
  const { accountId } = useAccountStatementContext();
  const [datas, setData] = useState<Account | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { getAccountOverview } = AccountHandler();
      try {
        const response = await getAccountOverview(accountId);
        console.log(response);
        if (response) {
          setData(response);
        }
      } catch (error) {
        console.error('Error fetching account statement:', error);
      }
    };
    fetchData();
  }, [accountId]);

  const data = [
    {
      title: 'Open Date',
      content: datas?.dateCreated ?? '',
      description: '',
    },
    {
      title: 'Account Number',
      content: datas?.accountTitle ?? '',
      description: `KES ${datas?.accountId ?? ''}`,
    },
    {
      title: 'Category',
      content: datas?.customerId ?? '',
      description: datas?.category ?? '',
    },
    {
      title: 'Customer Number',
      content: datas?.customerId ?? '',
      description: '',
    },
    {
      title: 'Status',
      status: datas?.status ?? '',
    },
  ];

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        borderRadius: '8px',
        width: '100%',
      }}
    >
      {data.map((item, index) => {
        if ('content' in item) {
          return (
            <InfoItem
              key={index}
              title={item.title}
              content={String(item.content)}
              description={item.description}
            />
          );
        } else if ('status' in item) {
          return (
            <InfoIconItem
              key={index}
              title={item.title}
              status={String(item.status)}
            />
          );
        }
        return null;
      })}
    </div>
  );
};
export default AccountOverview;
