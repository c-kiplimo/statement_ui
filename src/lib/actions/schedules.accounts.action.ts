import { AccountHandler } from "@/src/services/account/account.service";

export const SchedulesAccountAction = async (value: number): Promise<SchedulesData[]> => {
  const handler = AccountHandler();
  const data = await handler.getAccountByCustomerId(value);
  console.log(data);
  

  if (data === undefined) {
    return [];
  }

  return data.map(account => ({
    id: account.accountId,
    accountNumber: account.accountId,
    accountName:account.accountTitle,
    status: account.status,
    currency: account.currency,
  }));
};
