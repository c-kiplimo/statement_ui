import { allgroupsTypes } from "@/src/app/statement/(protected)/accountsetup/users/user-group/add-user-group/add.user.groups";
import { UserGroupsHandler } from "@/src/services/account/accounts.user.groups.service";

export const CustomerAllUserGroupsAction = async (value: number): Promise<allgroupsTypes[]> => {
    const handler = UserGroupsHandler();

    try {
        const data = await handler.getUserGroupsByPlatformId(value);
        console.log(data);
        

        if (!data || data.length === 0) {
            return [];
        }

        const result: allgroupsTypes[] = data.map(account => ({
            groupId: account.groupId,
            platformId: account.platformId,
            groupName: account.groupName,
            description: account.description,
        }));

 
console.log(result);

        return result;
    } catch (error) {
        console.error("Error fetching user accounts:", error);
        return [];
    }
};
