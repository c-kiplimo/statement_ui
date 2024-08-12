import { SchedulesDataTypes } from "@/src/app/statement/(protected)/account-setup-self/schedules/schedules-table/schedules.table";
import { AccountHandler } from "@/src/services/account/account.service";

export const SchedulesAccountAction = async (value: number): Promise<SchedulesDataTypes[]> => {
  const handler = AccountHandler();
  const data = await handler.getAccountByCustomerId(value);

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
