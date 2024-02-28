import { AccountMiniStatementHandler } from "@/src/services/account/acccount.ministatement.service";
const accountMiniStatementHandler = AccountMiniStatementHandler();


describe.skip("test fetch account mini statement ", () => {
    describe("given accountId ", () => {
        it("it should fetch acccount mini statement", async () => {


            const mockAccountId = "1026272611";


            const miniStatement = await accountMiniStatementHandler.fetchAccountMiniStatement(mockAccountId);
         
            expect(miniStatement[0].accountId).toBe(mockAccountId);
            expect(Array.isArray(miniStatement)).toBe(true);
            expect(miniStatement.some(entry => entry.accountId === mockAccountId)).toBe(true);
            expect(miniStatement.forEach(entry => entry.accountId === mockAccountId));
           console.log(miniStatement);                      
        
        });
    });
});