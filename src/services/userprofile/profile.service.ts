import { plainHeaders } from "@/src/constants/auth-headers";
import {
  AGGREGATE_PROFILE_URL,
  USER_PROFILE_URL,
} from "@/src/constants/environment";
import { makeAuthHeaders } from "@/src/utils/makeAuthHeaders";
import axios from "axios";

const ProfileHandler = () => {
  const authHeaders = makeAuthHeaders();

  //get profile id
  const fetchCustomerProfiles: (
    userId?: string
  ) => Promise<CustomerProfile> = async (userId?: string) => {
    const profileUrl = `${USER_PROFILE_URL}${userId}`;
    try {
      const response: CustomerProfile = await axios
        .get(profileUrl, {
          headers: authHeaders,
        })
        .then((res) => {
          let apiResponse = res.data;

          if (apiResponse) {
            let apiRes = apiResponse.payload[0];
            let profile: CustomerProfile = {
              ...apiRes,
            };
            return profile;
          } else {
            throw new Error(apiResponse);
          }
        });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchProfileDetails = async (profileId?: string) => {
    const profileDataUrl = `${AGGREGATE_PROFILE_URL}${profileId}`;
    try {
      const response = await axios
        .get(profileDataUrl, {
          headers: {
            "X-RequestId": "3456778",
          },
        })
        .then((res) => {
          let apiResponse = res.data;
          if (apiResponse) {
            let apiRes = apiResponse.payload;
            let profile: CustomerProfile = {
              ...apiRes,
            };
            return profile;
          } else {
            throw new Error(apiResponse);
          }
        });
    } catch (error) {
      throw error;
    }
  };

  return {
    profileService: fetchCustomerProfiles,
    profileDataService: fetchProfileDetails,
  };
};

export { ProfileHandler };
