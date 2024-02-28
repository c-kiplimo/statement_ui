import { ACCOUNT_SCHEDULES_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

const AccountSchedulesHandler = () => {
  const fetchAccountSchedules: (
    accountId: string
  ) => Promise<AccountSchedule> = async (accountId: string) => {
    const accountSchedulesUrl = `${ACCOUNT_SCHEDULES_URL}/${accountId}`;

    try {
      const response = await axios
        .get(accountSchedulesUrl, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          let apiResponse = res.data;

          if (apiResponse) {
            let apiRes = apiResponse;
            let accountSchedules: AccountSchedule = {
              ...apiRes,
            };
            return accountSchedules;
          } else {
            throw new Error("Empty response");
          }
        });
      return response;
    } catch (error) {
      throw error;
    }
  };
  const createAccountSchedules: (
    accountSchedules: AccountSchedule
  ) => Promise<AccountSchedule> = async (
    inputAccountSchedules: AccountSchedule
  ) => {
    const accountSchedulesUrl = `${ACCOUNT_SCHEDULES_URL}`;

    try {
      const response = await axios.post(
        accountSchedulesUrl,
        inputAccountSchedules,
        {
          headers: {
            "X-RequestId": "3456778909",
          },
        }
      ).then((res) => {

        let apiResponse = res.data;

        if (apiResponse) {
          let apiRes = apiResponse;
          let accountSchedules: AccountSchedule = {
            ...apiRes,
          };
          return accountSchedules;
        } else {
          throw new Error("Empty response");
        }

        
      });
        return response;
    } catch (error) {
      throw error;
    }
  };

  const updateAccountSchedule: (
    accountId: string,
    accountSchedules: AccountSchedule
  ) => Promise<AccountSchedule> = async (
    accountId: string,
    accountSchedules: AccountSchedule
  ) => {
    const accountSchedulesUrl = `${ACCOUNT_SCHEDULES_URL}/${accountId}`;

    try {
        const response = await axios.put(
        accountSchedulesUrl,
        accountSchedules,
        {
          headers: {
            "X-RequestId": "3456778909",
          },
        }
      ).then((res) => {

        let apiResponse = res.data;

        if (apiResponse) {
          let apiRes = apiResponse;
          let accountSchedules: AccountSchedule = {
            ...apiRes,
          };
          return accountSchedules;
        } else {
          throw new Error("Empty response");
        }
      });
        return response;
    } catch (error) {
      console.error("Error updating account schedule:", error);
      throw error;
    }
  };
  const deleteAccountSchedule: (accountId: string) => Promise<string> = async (
    accountId: string
  ) => {
    const accountSchedulesUrl = `${ACCOUNT_SCHEDULES_URL}/${accountId}`;

    try {
      const response = await axios
        .delete(accountSchedulesUrl, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          return res.data;
        });
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete account schedule");
    }
  };

  return {
    fetchAccountSchedules,
    createAccountSchedules,
    updateAccountSchedule,
    deleteAccountSchedule,
  };
};
export { AccountSchedulesHandler };
