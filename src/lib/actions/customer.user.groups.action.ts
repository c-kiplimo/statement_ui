import { DataFetcher } from "@/src/app/statement/(protected)/accountsetup/widgets/table/table";
import { UserGroupsHandler } from "@/src/services/account/accounts.user.groups.service";

export const CustomerUserGroupsAction = async (value: number): Promise<DataFetcher[]> => {
    const handler = UserGroupsHandler();

    try {
        const data = await handler.getUserGroupsByUserId(value);

        if (!data || data.length === 0) {
            return [];
        }

        const result: DataFetcher[] = data.map(account => ({
            id: account.platformGroup.groupId,
            createdOn: account.platformGroup.createdAt,
            joinedOn: account.joinedOn,
            description: account.platformGroup.description,
            userName: account.platformGroup.groupName,
        }));

        return result;
    } catch (error) {
        console.error("Error fetching user accounts:", error);
        return [];
    }
};
