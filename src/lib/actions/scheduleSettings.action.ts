import { message } from "antd";
import { AcctScheduleHandler } from "@/src/services/account/post.account.schedule";
import { SheduleData } from "@/src/app/statement/(protected)/account-setup-self/schedules/settings-modal/settings.modal";

export const getAccountScheduleSettings = async (accountNumber: number): Promise<SheduleData> => {
  try {
    const { fetchAccountSchedules } = AcctScheduleHandler();
    const results = await fetchAccountSchedules(accountNumber);

    let result: SheduleData = {
      statementFrequency: results.statementFrequency,
      time: results.startDateTime.toString(),
      date:results.startDateTime.toString(),
      templateFormat: results.fileFormat,
      templateType: results.templateType,
      SwiftStatement:results.allowSwiftStatement,
      OnlineStatement:results.allowOnlineStatement,
      scheduleStatement:results.scheduleStatement,
      notificationType:results.notificationType,
    };

    return result;
  } catch (error) {
        throw error;
  }
};
