import {
  AccountDetails,
  Dates,
} from "../components/widgets/branch-account-statement/account-detail-table/account.detail.table";
import { TransactionHistoryData } from "../components/widgets/branch-account-statement/transactions-history-table/transaction.history.table";
import { fetchStatementDataEntriesId } from "../services/account/account";
import { AccountStatementRequestHandler } from "../services/account/account.statement.request.service";

const handler = AccountStatementRequestHandler();

export const SingleStatementAction = async (
  statementEntryId: number
): Promise<AccountDetails> => {
  const statementresult: AccountStatementRequest =
    await fetchStatementDataEntriesId(statementEntryId);

  let accountDetails: AccountDetails = {
    accountName: statementresult.accountDTO!.accountTitle!,
    accountNumber: statementresult.accountDTO!.accountId!,
    currency: statementresult.accountDTO!.currency,
    openingBalance:
      statementresult.summary!.totalCreditAmount!.toLocaleString(),
    closingBalance: statementresult.summary!.closingBalance!.toLocaleString(),
    startDate: toString(statementresult.startDate),
    endDate: toString(statementresult.endDate),
    totalDebitAmt: statementresult.summary!.totalDebitAmount!.toLocaleString(),
    totalCreditAmt:
      statementresult.summary!.totalCreditAmount!.toLocaleString(),
  };

  return accountDetails;
  function toString(date?: Date): string {
    let dateString = date?.toString();
    return dateString == undefined ? "" : dateString!;
  }
};

export const SingleDataEntriesAction = async (
  statementRequestId: number
): Promise<TransactionHistoryData[]> => {
  const result: AccountStatementRequest =
    await fetchStatementDataEntriesId(statementRequestId);
  if (result == undefined) {
    return [];
  }

  let request: TransactionHistoryData[] = result.statementEntries!.map(
    (data) => ({
      key: data.statementEntryId!,
      valuedate: convertDateString(data.valueDate!.toString()),
      paymentDetails: data.transactionDetails!,
      moneyIn:
        data.debit === false ? formatAmount(data.amount!.toString()) : "",
      moneyOut:
        data.credit === false ? formatAmount(data.amount!.toString()) : "",
      balance: data.runningBalance!.toLocaleString(),
      transferRef: data.transReference!,
    })
  );

  return request;
  function convertDateString(dateString: string): string {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  function formatAmount(numString: string): string {
    const parts = numString.split(".");
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? `.${parts[1]}` : "";
    if (integerPart.length > 3) {
      const integerDigits = integerPart.split("").reverse();
      const formattedDigits = [];
      for (let i = 0; i < integerDigits.length; i++) {
        if (i > 0 && i % 3 === 0) {
          formattedDigits.push(",");
        }
        formattedDigits.push(integerDigits[i]);
      }
      integerPart = formattedDigits.reverse().join("");
    }
    const formattedNumber = integerPart + decimalPart;

    return formattedNumber;
  }
};

export const DateSearchAction = async (
  statementRequestId: number
): Promise<Dates> => {
  const result: AccountStatementRequest =
    await handler.fetchStatementRequestStatementId(statementRequestId);

  let dates: Dates = {
    startDate: toString(result.startDate),
    endDate: toString(result.endDate),
  };
  return dates;

  function toString(date: Date): string {
    try {
      const dates = new Date(date);
      let dateString = dates.toLocaleDateString("en-US", {
        day: "numeric",
        year: "numeric",
        month: "long",
      });
      return dateString;
    } catch (error) {
      console.error("Error occurred while formatting date:", error);
      return "";
    }
  }
};
