import { AccountSetupHandler } from "@/src/services/account/account.setup.service";

export const customerCardDetailsAction = async (onboardingtype: string, value: string): Promise<DataSearch[]> => {

    try {
        const handler = AccountSetupHandler();
        const data = await handler.searchCustomer(onboardingtype, value)

        if (!data) {
            return [];
        }


        const account: DataSearch[] = [{
            customerName: data?.customerName!,
            email:data.email,
            industry: data.industry!,
            customerType: data.customerType,
            customerStatus: data.customerStatus!,
            id:data.customerId
        }];

        return account;
    } catch (error) {
        console.error("Error occurred during customerCardDetailsAction:", error);
        throw error; 
    }
}
