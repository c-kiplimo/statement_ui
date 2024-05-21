import { notification } from "antd";
import { PROFILE_CONTEXT_STORE } from "../constants/common";

const useProfileCreated = (): CustomerProfile | null => {
  try {
    const storedResponse = sessionStorage.getItem(PROFILE_CONTEXT_STORE);
    if (storedResponse) {
      const profileDetails = JSON.parse(storedResponse) as CustomerProfile;
      return profileDetails;
    }
    return null;
  } catch (error) {
    console.error("Failed to parse profile from sessionStorage", error);
    return null;
  }
};

export const storeProfile = (profileInfo: CustomerProfile): void => {
  try {
    sessionStorage.setItem(PROFILE_CONTEXT_STORE, JSON.stringify(profileInfo));
  } catch (error) {
    notification.error({
      message: "Profile not stored",
      description: "Failed to store profile in sessionStorage.",
    });
    console.error("Failed to store profile in sessionStorage", error);
  }
};

export default useProfileCreated;

