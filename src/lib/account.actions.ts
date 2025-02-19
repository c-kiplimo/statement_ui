import { ReactNode } from "react";
import {
  AccountMoneyInOut,
  Accountbalances,
} from "../app/statement/(protected)/dashboard/accounts/singleAccount/[id]/page";
import { TransfersData } from "../components/widgets/accounts-transactions-summary/accounts.transactions.summary";
import { CashFlowProgress } from "../components/widgets/cash-flow-card-home/cashflow.card.home";
import { fetchAccountDetailsById } from "../services/account/account";
import { AccountsDara } from "../components/widgets/account-summary-Balances/account.summary";

export const getTransactionAccounts = async (
  accountNumber: number
): Promise<TransfersData[]> => {
  let accounttransactions: AccountInformations =
    await fetchAccountDetailsById(accountNumber);

  let transactions: TransfersData[] = accounttransactions.transfers.map(
    (balance) => ({
      id: balance.accountId,
      icon: accountIcons(balance.creditAccount),
      title: balance.creditAccount,
      date: balance.processingDate.split("T")[0],
      amount: balance.creditAmount.toLocaleString('en-US'),
    })
  );  
  return transactions;

  function accountIcons(accounttype: string): ReactNode {
    let accountIcon: string = "";
    switch (accounttype) {
      case "Spotify":
        accountIcon = "spotify.svg";
        break;
      case "Google":
        accountIcon = "google.svg";
        break;
      case "Uber":
        accountIcon = "savingss.svg";
        break;
      case "Linkedln":
        accountIcon = "LinkedIn.svg";
        break;
      case "Apple Music":
        accountIcon = "apple.svg";
      default:
        accountIcon = "accounts.svg";
        break;
    }
    return accountIcon;
  }
};

export const getCashFlowData = async (
  accountNumber: number
): Promise<CashFlowProgress[]> => {
  let accounttransactions: AccountInformations =
    await fetchAccountDetailsById(accountNumber);

  let transactions: CashFlowProgress[] =
    accounttransactions.statementEntries.map((data) => ({
      id: data.statementEntryId,
      title: data.productCategory,
      description: data.transactionDetails,
    }));

  return transactions;
};

export const getMoneyInOut = async (
  accountNumber: number
): Promise<AccountMoneyInOut> => {
  let moneyflow: AccountInformations =
    await fetchAccountDetailsById(accountNumber);

  let money: AccountMoneyInOut = {
    moneyIn: moneyflow.summary.totalDebitAmount.toLocaleString(),
    moneyOut: moneyflow.summary.totalCreditAmount.toLocaleString(),
  };

  return money;
};

export const getAccountSummaryBalances = async (
  accountNumber: number
): Promise<AccountsDara[]> => {
  let accountbalances: AccountInformations =
    await fetchAccountDetailsById(accountNumber);
    
  let balances: AccountsDara[] = [
    {
      type: 'Opening Balance',
      value: accountbalances.accountDTO.openingBalance.toLocaleString(),
      icon: 'openingbal.svg',
    },
    {
      type: 'Closing Balance',
      value: accountbalances.accountDTO.closingBalance.toLocaleString(),
      icon: 'closing.svg',
    },
    {
      type: 'Spending',
      value: accountbalances.accountDTO.spending.toLocaleString(),
      icon: 'spending.svg',
    },
    {
      type: 'Received',
      value: accountbalances.accountDTO.received.toLocaleString(),
      icon: 'received.svg',
    },
  ];
  
  return balances;
};





