import { CREATE_USER_URL } from "@/src/constants/environment";
import axios from "axios";


const CreateProfileHandler = () => {
    const CreateProfileService = async (
      profile: ProfileCreation,
      accessToken: string
    ): Promise<CustomerProfile> => {
      try {
        const response = await axios.post<CustomerProfile>(CREATE_USER_URL, profile, {
          headers: {
            "x-RequestId": "234567",
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Profile created>>",JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        console.error("Profile creation failed>>",error);
        throw error;
      }
    };
  
    return { CreateProfileService };
  };
  
  export { CreateProfileHandler };