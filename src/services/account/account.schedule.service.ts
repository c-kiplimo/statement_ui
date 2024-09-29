import { data } from "@/src/app/statement/(auth)/data";
import { EditScheduletypes } from "@/src/app/statement/(protected)/account-statement-self/accountStatements/account-overview-status/edit-schedule-form/account.scedule.form";
import {
  CREATE_ACCOUNT_SHEDULE,
  GET_ACCOUNT_SCHEDULE_BY_ID,
  UPDATE_ACCOUNT_SHEDULE,
} from "@/src/constants/environment";
import { notification } from "antd";
import axios from "axios";

export const createAccountSchedule = async (
  accountScheduleFormData: SingleAccountsSchedule
): Promise<SingleAccountsSchedule> => {
  const createScheduleUrl = CREATE_ACCOUNT_SHEDULE;

  try {
    const response = await axios.post(
      createScheduleUrl,
      accountScheduleFormData,
      {
        headers: {
          "X-RequestId": "23456786543",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchAccountSheduleById = async (
  id: number
): Promise<SingleAccountSchedule> => {
  const apiUrl = `${GET_ACCOUNT_SCHEDULE_BY_ID}/${id}`;
  try {
    const response = await axios
      .get(apiUrl, {
        headers: {
          "X-RequestId": "4354657678",
        },
      })

      .then((res) => {
        let apiResponse = res.data;
        if (apiResponse) {
          let apiRes = apiResponse;
          let accountinformation: SingleAccountSchedule = {
            ...apiRes,
          };

          return accountinformation;
        } else {
          throw new Error(apiResponse);
        }
      });

    console.log(response);

    return response;
  } catch (error) {
    throw error;
  }
};

export const editAccountSchedule = async (
  id: number,
  accountScheduleFormData: SingleAccountsSchedule
): Promise<SingleAccountsSchedule> => {
  const createScheduleUrl = `${UPDATE_ACCOUNT_SHEDULE}/${id}`;
  try {
    const response = await axios.put(
      createScheduleUrl,
      accountScheduleFormData,
      {
        headers: {
          "X-RequestId": "23456786543",
        },
      }
    );

    return response.data;
  } catch (error) {
    notification.error({
      message: "Failed to update. Try again later",
    });
    throw error;
  }
};
