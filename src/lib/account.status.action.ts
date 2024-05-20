import { message } from "antd";
import { AccountOverviewStatus } from "../app/statement/(protected)/account-statement-self/accountStatements/account-overview-status/overview-status/accounts-status";
import {
  fetchAccountShedule,
  fetchAccountStatus,
} from "../services/account/account";
import { AccountSheduleData } from "../app/statement/(protected)/account-statement-self/accountStatements/account-overview-status/account-schedule/account.schedule";
import { ministatementAccountDetails } from "../app/statement/(protected)/account-statement-self/accountStatements/account-overview-status/account-ministatement/account.header";
import { fetchAccountSheduleById } from "../services/account/account.schedule.service";
import { EditScheduletypes } from "../app/statement/(protected)/account-statement-self/accountStatements/account-overview-status/edit-schedule-form/account.scedule.form";

export const AccountStatusAction = async (
  accountNo: number
): Promise<AccountOverviewStatus> => {
  const accountStatus: AccountStatus = await fetchAccountStatus(accountNo);

  if (!accountStatus) {
    alert("Account Doesnt Exist");
  }

  let statusresult: AccountOverviewStatus = {
    openDate: accountStatus.dateCreated,
    accountNumber: accountStatus.accountId,
    category: accountStatus.category,
    customerNumber: accountStatus.customerId,
    status: accountStatus.status,
    currency: accountStatus.currency,
    accountTitle: accountStatus.accountTitle,
  };

  return statusresult;
};

export const MinistatementAccountStatusAction = async (
  accountNo: number
): Promise<ministatementAccountDetails> => {
  const accountStatus: AccountStatus = await fetchAccountStatus(accountNo);

  if (!accountStatus) {
    alert("Account Doesnt Exist");
  }

  let statusresult: ministatementAccountDetails = {
    title: accountStatus.accountTitle,
    currency: accountStatus.currency,
    accountNumber: accountStatus.accountId,
    lastActivityDate: accountStatus.dateCreated,
    availableBalance: accountStatus.closingBalance.toLocaleString(),
    workingBalance: accountStatus.closingBalance.toLocaleString(),
    term: accountStatus.statementFrequency,
  };

  return statusresult;
};

export const AccountScheduleAction = async (
  accountNo: number
): Promise<AccountSheduleData[]> => {
  const accountSchedule: SingleAccountSchedule[] =
    await fetchAccountShedule(accountNo);

  if (!accountSchedule) {
    alert("Account Doesnt Exist");
  }
  let statusresult: AccountSheduleData[] = accountSchedule.map((data) => ({
    key: data.id!,
    date: data.startTime!.toString(),
    time: TimeConverter(data.startTime!.toString()),
    accountNumber: data.accountId,
    accountTitle: data.accountName!,
    frequency: data.frequency!,
    status: data.status!,
    currency: "KES",
    templateType: data.template,
    templateFormat: data.fileFormat,
  }));

  return statusresult;

  function TimeConverter(date: string): string {
    const dateString = new Date(date);
    const hour = dateString.getHours();
    const minutes = dateString.getMinutes();

    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    const formattedTime = `${hour12}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
    return formattedTime;
  }
};

export const getEditScheduleData = async (
  id: number
): Promise<EditScheduletypes> => {
  const results: SingleAccountSchedule = await fetchAccountSheduleById(id);

  let result: EditScheduletypes = {
    frequency: results.frequency,
    time: results.startTime.toString(),
    date: results.startTime.toString(),
    fileformat: results.fileFormat,
    templateFormat: results.template,
  };

  return result;
};
