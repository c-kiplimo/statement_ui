import { UserAccountHandler } from "@/src/services/account/customer.user.accounts.service";

export const CustomerUserAccountAction = async (value: number): Promise<DataFetcher[]> => {
    const handler = UserAccountHandler();
    try {
        const data = await handler.getAccountByUserId(value);

        if (!data) {
            return [];
        }
        

        const result:DataFetcher[] = data.map(account => ({
            id:account.accountId,
            createdOn:account.dateCreated,
            userName:account.accountTitle,
            status:account.status,
        }));
        
        return result;
    } catch (error) {
        console.error("Error fetching user accounts:", error);
        return [];
    }
};
