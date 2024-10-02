import { AccountStatementRequestHandler } from "../services/account/account.statement.request.service";


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

export const completeTransactionActionByUserId = async (
  userId: string
): Promise<CompleteTransactions[]> => {
  const handler = AccountStatementRequestHandler();
  const result: AccountStatementRequest[] =
    await handler.fetchStatementRequestByUserId(userId);
  if (result === undefined) {
    return [];
  }

  let completedtransactions: CompleteTransactions[] = result
    .filter((data) => data.status! === "COMPLETE")
    .map((data) => ({
      id: data.statementRequestId!,
      date: toString(data.startDate),
      time: extractTimeFromDate(data.creationDate),
      accountname: data.accountName!,
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
  const result: AccountStatementRequest = await handler.fetchStatementRequestStatementId(
    parseInt(statementRequestId)
  );

  if (result.status ) {
    let completedtransactions: CompleteTransactions[] = [
      {
        id: result.statementRequestId!,
        date: result.startDate ? result.startDate.toString() : '',
        time: result.creationDate ? extractTimeFromDate(result.creationDate) : '',
        accountname: result.accountName!,
        accountnumber: result.accountId!,
        description: result.description!,
        status: result.status!,
      },
    ];
    return completedtransactions;
  }
  return [];
};


function toString(date?: Date): string {
  let dateString = date?.toString();
  return dateString == undefined ? "" : dateString!;
}

function extractTimeFromDate(date?: Date): string {
  let timeString = date?.toTimeString();

  return timeString == undefined ? "" : timeString;
}
