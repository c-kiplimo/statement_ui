import { SCHEDULE_ACCOUNT_URL, SCHEDULE_FETCH_URL, SCHEDULE_UPDATE_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

const AcctScheduleHandler = () => {
  const headers = {
    headers: {
      "X-RequestId": "34567909",
    },
  };

  const postAccountSchedules = async (
    inputAccountSchedules: accSchedulesTypes
  ): Promise<accSchedulesTypes> => {
    try {
      const response: AxiosResponse<accSchedulesTypes> = await axios.post(
        SCHEDULE_ACCOUNT_URL,
        inputAccountSchedules,
        headers
      );

      if (response.data) {
        console.log("Posted account schedules successfully:", response.data); // Logging success
        return response.data;
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      console.error("Error posting account schedules:", error); // Logging error
      throw error;
    }
  };

  const updateAccountSchedules = async (
    inputAccountSchedules: accSchedulesTypes
  ): Promise<accSchedulesTypes> => {
    try {
      const response: AxiosResponse<accSchedulesTypes> = await axios.put(
        SCHEDULE_UPDATE_URL,
        inputAccountSchedules,
        headers
      );

      console.log("Response received:", response.data);

      if (response.data) {
        return response.data;
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      console.error("Error updating account schedules:", error); 
      throw error;
    }
  };

  const fetchAccountSchedules = async (accountID: number): Promise<accSchedulesTypes> => {
    const apiUrl = `${SCHEDULE_FETCH_URL}/${accountID}`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          "X-RequestId": "4354657678",
        },
      });

      let apiResponse = response.data;
      if (apiResponse) {
        let accountInformation: accSchedulesTypes = {
          ...apiResponse,
        };
        console.log("Fetched account schedules successfully:", accountInformation); // Logging success
        return accountInformation;
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      console.error("Error fetching account schedules:", error); // Logging error
      throw error;
    }
  };

  return {
    postAccountSchedules,
    updateAccountSchedules,
    fetchAccountSchedules
  };
};

export { AcctScheduleHandler };
