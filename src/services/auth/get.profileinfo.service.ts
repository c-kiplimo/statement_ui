import { GET_PROFILE_DETAILS } from "@/src/constants/environment";
import axios from "axios";

export const getUserProfileDetails = async (userId:string):Promise<CustomerProfile> => {
    const apiUrl = `${GET_PROFILE_DETAILS}/${userId}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'X-RequestId': '3456778909',
        },
      });

      const apiRes = response.data
      let profileData:CustomerProfile = {
        ...apiRes
      }

      console.log(profileData);
      return profileData;
    } catch (error) {
      throw error;
    }
  };