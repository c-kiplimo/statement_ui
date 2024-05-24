import { DataSearch } from "@/src/components/widgets/account-created-recors-widget/created.record";
import { AccountSetupHandler } from "@/src/services/account/account.setup.service";

export const customerCardDetailsAction = async (onboardingtype: string, value: string): Promise<DataSearch[]> => {
    console.log("Starting customerCardDetailsAction with parameters:", onboardingtype, value);

    try {
        const handler = AccountSetupHandler();
        const data = await handler.searchCustomer(onboardingtype, value)

        if (!data) {
            console.log("No data found for the search parameters:", onboardingtype, value);
            return [];
        }


        const account: DataSearch[] = [{
            customerName: data?.customerName!,
            industry: data.industry!,
            customerType: data.customerType,
            customerStatus: data.customerStatus!,
            id:data.customerId!
        }];


        return account;
    } catch (error) {
        console.error("Error occurred during customerCardDetailsAction:", error);
        throw error; 
    }
}
