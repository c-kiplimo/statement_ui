import { SCHEDULE_UPDATE_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

export const UpdateAccountSchedules = async (
  inputAccountSchedules: accSchedulesTypes
): Promise<accSchedulesTypes> => {
  try {
    const response: AxiosResponse<accSchedulesTypes> = await axios.put(
      SCHEDULE_UPDATE_URL,
      inputAccountSchedules,
      {
        headers: {
          "X-RequestId": "4354657678",
        },
      }
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
