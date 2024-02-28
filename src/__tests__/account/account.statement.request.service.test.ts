import { AccountStatementRequestHandler } from '@/src/services/account/account.statement.request.service';

import axios from 'axios';

const accountStatementRequestHandler = AccountStatementRequestHandler();

describe.skip('Statement Request Service', () => {
  describe.skip('Test createAccountStatementRequest', () => {
    it('should create account statement request', async () => {
      // Mock data
      const mockAccountId = '1026272611';
      const mockStartDate = '2023-12-28';
      const mockEndDate = '2023-12-28';

      const mockStatementequest = {
        accountId: mockAccountId,
        startDate: new Date(mockStartDate),
        endDate: new Date(mockEndDate),
      };

      const statementRequest =
        await accountStatementRequestHandler.createAccountStatementRequest(
          mockStatementequest,
        );

      expect(statementRequest).toHaveProperty('accountId', mockAccountId);

      console.log(statementRequest);
    });
  });
  describe.skip('Test fetchStatementRequestById', () => {
    it('should fetch statement request by id', async () => {
      const mockId = 1;
      const statementRequest =
        await accountStatementRequestHandler.fetchStatementRequestById(mockId);
      expect(statementRequest).toHaveProperty('accountId', '1026272611');
      console.log(statementRequest);
    });
  });
});
