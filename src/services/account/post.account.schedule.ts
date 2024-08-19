import { SCHEDULE_ACCOUNT_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

const AcctScheduleHandler = () => {
    const postAccountSchedules = async (
      inputAccountSchedules: accSchedulesTypes
    ): Promise<accSchedulesTypes> => {
      const accountSchedulesUrl = SCHEDULE_ACCOUNT_URL;
  
      try {
        const response: AxiosResponse<accSchedulesTypes> = await axios.post(
          accountSchedulesUrl,
          inputAccountSchedules,
          {
            headers: {
              "X-RequestId": "34567909",
            },
          }
        );
  
        if (response.data) {
          return response.data;
        } else {
          throw new Error("Empty response");
        }
      } catch (error) {
        console.error("Error posting account schedules:", error);
        throw error;
      }
    };
  
    return {
      postAccountSchedules,
    };
  };
  
  export { AcctScheduleHandler };
  