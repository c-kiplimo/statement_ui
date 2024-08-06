import { createUserHandler } from "@/src/services/usermanagement/create.user.service";

export const updateUserAction = async (userData: UpdateUserData): Promise<void> => {
    const handler = createUserHandler();
    try {
      const response = await handler.updateUserService(userData.userId, userData);
      console.log("User updated successfully", response);
      return response;
    } catch (error) {
      console.error("Update failed:", error);
      throw error;
    }
  };