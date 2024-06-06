import { LOGOUT_USER } from "@/src/constants/environment";
import axios from "axios";

export const logout = async (userId: string) => {
  let logoutApi = `${LOGOUT_USER}/${userId}`;

  try {
    const response = await axios
      .get(logoutApi, {
        headers: {
          "X-RequestId": "4354657678",
        },
      })

      .then((res) => {
        let apiResponse = res.data;
        if (apiResponse) {
          let apiRes = apiResponse;
          let accountinformation: NotificationSettingTypes = {
            ...apiRes,
          };

          return accountinformation;
        } else {
          throw new Error(apiResponse);
        }
      });

    return response;
  } catch (error) {
    throw error;
  }
};
