import { EDIT_PERMISSION } from "@/src/constants/environment";
import axios from "axios";

type UpdatePermissions = {
  permissionsToAdd: string[],
  permissionsToRemove: string[]
}

const EDITUSERGROUP = async (groupId: number, platformId: number, permissions: UpdatePermissions) => {
  try {
    const api = `${EDIT_PERMISSION}/${groupId}/${platformId}`;
    
    const response = await axios.put(api, permissions, { 
      headers: {
        "X-RequestId": "3445",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error editing user group:", error.message || error);
    throw error;
  }
};

export { EDITUSERGROUP };
