import { AccountHandler } from "@/src/services/account/account.service";

const accountHandler = AccountHandler();

describe.skip("test fetch account", () => {
    describe.skip("given accountId ", () => {
        it("it should fetch acccount overview", async () => {

            const mockAccountId = "1026272611";

            const accountOverview = await accountHandler.getAccountOverview(mockAccountId);


            expect(accountOverview).toHaveProperty('accountId');
            expect(accountOverview.accountId).toBe(mockAccountId);

        });
    });

    describe.skip("given customerId ", () => {
        it("it should fetch acccount ", async () => {

            const mockCustomerId = 1;

            const customerAccount = await accountHandler.getAccountByCustomerId(mockCustomerId);

            
            expect(customerAccount.some((account) => account.customerId === mockCustomerId)).toBe(true);
            console.log(customerAccount);

        });
    });
    describe.skip("given accountId ", () => {
        it("it should fetch acccount restrictions", async () => {

            const mockAccountId = "1026272611";

            const accountRestrictions = await accountHandler.fetchAccountRestrictions(mockAccountId);

            expect(accountRestrictions.some((account) => account.accountId === mockAccountId)).toBe(true);
            console.log(accountRestrictions);

        });
    });
});