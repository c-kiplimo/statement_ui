import { GET_USER_PROFILE_DETAILS } from "@/src/constants/environment";
import { notification } from "antd";
import axios from "axios";
// get user profile information on the settings page
export const getUserDetails = async (userId:string):Promise<userDetails> => {
    const apiUrl = `${GET_USER_PROFILE_DETAILS}/${userId}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'X-RequestId': '3456778909',
        },
      });

      const apiRes = response.data
      let userData:userDetails = {
        ...apiRes
      }

      console.log();
      
      return userData;
    } catch (error) {
        notification.error({
            message:'Failed to fetch Data'
        })
      throw error;
      
    }
  };




//update user profile details by id
export const updateUserDetails = async (userId: string, editProfileData: userDetails): Promise<userDetails> => {
  const createScheduleUrl = `${GET_USER_PROFILE_DETAILS}/${userId}`;

  try {
    const response = await axios.put(createScheduleUrl, editProfileData, {
      headers: {
        "X-RequestId": "23456786543",
      },
    });
    return response.data;
  } catch (error) {
    notification.error({
      message: 'Failed to update. Try again later',
    });
    throw error;
  }
};








