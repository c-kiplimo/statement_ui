import { useEffect, useState } from "react";
import { notification } from "antd";
import { PROFILE_CONTEXT_STORE } from "../constants/common";

const useProfileCreated = (): CustomerProfile | null => {
  const [profile, setProfile] = useState<CustomerProfile | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedResponse = sessionStorage.getItem(PROFILE_CONTEXT_STORE);
        if (storedResponse) {
          const profileDetails = JSON.parse(storedResponse) as CustomerProfile;
          setProfile(profileDetails);
        }
      } catch (error) {
        console.error("Failed to parse profile from sessionStorage", error);
      }
    }
  }, []);

  return profile;
};

export const storeProfile = (profileInfo: CustomerProfile): void => {
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(PROFILE_CONTEXT_STORE, JSON.stringify(profileInfo));
    } catch (error) {
      notification.error({
        message: "Profile not stored",
        description: "Failed to store profile in sessionStorage.",
      });
      console.error("Failed to store profile in sessionStorage", error);
    }
  }
};

export default useProfileCreated;
