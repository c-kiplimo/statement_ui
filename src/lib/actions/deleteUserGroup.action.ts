import { GroupHandler } from '@/src/services/usermanagement/user.goups.service';

export const deleteUserGroupAction = async (groupId: number): Promise<void> => {
    const { deleteUserGroup} = GroupHandler();

    try {
        await deleteUserGroup(groupId);
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Failed to delete group with ID ${groupId}: ${error.message}`);
        } else {
          throw new Error(`Failed to delete group with ID ${groupId}: Unknown error`);
        }
      }
};
