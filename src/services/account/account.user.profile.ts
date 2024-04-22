import { CUSTOMERS_URL } from "@/src/constants/environment";

const getUserProfile = async () => {
    try {
      const response = await fetch(CUSTOMERS_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };
  
  export { getUserProfile };
  