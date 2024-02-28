import { AccountStatementHandler } from '../../services/account/account.statement.service';
const accountStatementHandler = AccountStatementHandler();


describe.skip('test fetch account statement ', () => {
describe('given accountId ,startDate and EndDate ', () => {
  it('it should fetch acccount statement', async () => {
   
    
    const mockAccountId = '1026272611';
    const mockStartDate = '20231228';
    const mockEndDate = '20231228';

 
    const statement = await accountStatementHandler.fetchAccountStatement(
      mockAccountId,
      mockStartDate,
      mockEndDate
    );
   
    expect(statement.accountDTO.accountId).toBe(mockAccountId);
    expect(statement.customer).toHaveProperty('customerId');
    expect(statement.statementEntries.some(entry => entry.accountId === mockAccountId)).toBe(true);
    console.log(statement.statementEntries);
    statement.statementEntries.forEach(entry => {
      expect(entry.accountId).toBe(mockAccountId);
      
    });
    

  });
});

});
