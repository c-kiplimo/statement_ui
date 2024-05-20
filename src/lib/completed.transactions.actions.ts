import { AccountStatementRequestHandler } from "../services/account/account.statement.request.service";

// export const CompletedTransactionAction = async (statementRequestId: string): Promise<CompleteTransactions[]>=> {

//         const handler = AccountStatementRequestHandler();
//         const result:AccountStatementRequest = await handler.fetchStatementRequestById(parseInt(statementRequestId));
//         if (result === undefined || result.status !== 'COMPLETE') {
//             return [];
//         }

//         let completedtransactions:CompleteTransactions[] = [{

//             id: result.statementRequestId!,
//             date: toString(result.startDate),
//             time: extractTimeFromDate(result.creationDate),
//             accountname: 'Meraki Account'!,
//             accountnumber: result.accountId!,
//             description: result.description!,
//             status: result.status!
//         }]
//     return completedtransactions
// }
export const completeTransactionAction = async (
  statementRequestId: string
): Promise<CompleteTransactions[]> => {
  const handler = AccountStatementRequestHandler();
  const result: AccountStatementRequest[] =
    await handler.fetchStatementRequestById(parseInt(statementRequestId));
  if (result === undefined) {
    return [];
  }

  let completedtransactions: CompleteTransactions[] = result
    .filter((data) => data.status! === "COMPLETE")
    .map((data) => ({
      id: data.statementRequestId!,
      date: toString(data.startDate),
      time: extractTimeFromDate(data.creationDate),
      accountname: "Meraki Account",
      accountnumber: data.accountId!,
      description: data.description!,
      status: data.status!,
    }));

  return completedtransactions;
};
export const pendingTransactionAction = async (
  statementRequestId: string
): Promise<CompleteTransactions[]> => {
  const handler = AccountStatementRequestHandler();
  const result: AccountStatementRequest[] =
    await handler.fetchStatementRequestById(parseInt(statementRequestId));
  if (result === undefined) {
    return [];
  }

  let completedtransactions: CompleteTransactions[] = result
    .filter((data) => data.status! === "PENDING")
    .map((data) => ({
      id: data.statementRequestId!,
      date: toString(data.startDate),
      time: extractTimeFromDate(data.creationDate),
      accountname: "Meraki Account",
      accountnumber: data.accountId!,
      description: data.description!,
      status: data.status!,
    }));

  return completedtransactions;
};

export const ActiveTransactionAction = async (
  statementRequestId: string
): Promise<CompleteTransactions[]> => {
  const handler = AccountStatementRequestHandler();
  const result: AccountStatementRequest =
    await handler.fetchStatementRequestStatementId(
      parseInt(statementRequestId)
    );

  let completedtransactions: CompleteTransactions[] = [
    {
      id: result.statementRequestId!,
      date: toString(result.startDate),
      time: extractTimeFromDate(result.creationDate),
      accountname: "Meraki Account"!,
      accountnumber: result.accountId!,
      description: result.description!,
      status: result.status!,
    },
  ];

  return completedtransactions;
};

function toString(date?: Date): string {
  let dateString = date?.toString();
  return dateString == undefined ? "" : dateString!;
}

function extractTimeFromDate(date?: Date): string {
  let timeString = date?.toTimeString();

  return timeString == undefined ? "" : timeString;
}
