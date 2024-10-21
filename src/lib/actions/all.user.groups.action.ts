import { UserGroupsHandler } from "@/src/services/account/accounts.user.groups.service";

export const CustomerAllUserGroupsAction = async (value: number) => {
    const handler = UserGroupsHandler();

    try {
        const data = await handler.getUserGroupsByPlatformId(value);
      
        if (!data || data.length === 0) {
            return [];
        }

        const result = data.map(account => ({
            groupId: account.groupId,
            platformId: account.platformId,
            groupName: account.groupName,
            description: account.description,
        }));

        return result;
    } catch (error) {
        console.error("Error fetching user accounts:", error);
        return [];
    }
};
