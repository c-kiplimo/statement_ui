import { ReactNode } from "react";
import { AccountDataHome } from "../components/widgets/accounts-details-card/account.details.card";
import { CardDataHome } from "../components/widgets/cardtype-details-info/cardtype.details.info";
import { BalanceByCurrencyHome } from "../components/widgets/total-available-balance-card/total.available.balance.card";
import { TranSactionHistoryHome } from "../components/widgets/transaction-history-card/transaction.history.card";
import { AccountHandler } from "../services/account/account.service";
import { UsersAccounts } from "../app/statement/(protected)/account-statement-self/accountStatements/active-statement-item/active.statement.item";
import { NotificationAccounts } from "../app/statement/(protected)/settings/notifications/enable-accounts/enable.accounts";

//Personal Accounts server Action
export const PersonalAccountOverviewActions = async (
  accountId: number
): Promise<AccountDataHome[]> => {
  const accountHandler = AccountHandler();
  const accountOverview = await accountHandler.getAccountOverview(accountId);

  let accountards: AccountDataHome[] = accountOverview.accounts.map(
    (account) => ({
      id: parseInt(account.accountId),
      icon: accountIcons(account.accountTitle),
      accountName: account.accountTitle,
      accountInfo: `${account.accountId}`,
    })
  );

  return accountards;

  function accountIcons(accounttype: string): ReactNode {
    let accountIcon: string = "";
    switch (accounttype) {
      case "MERAKI CURRENT ACCOUNT":
        accountIcon = "moneymarket.svg";
        break;
      case "GOLDEN ACCOUNT":
        accountIcon = "currentAccount.svg";
        break;
        case "Business Account":
          accountIcon = "currentAccount.svg";
          break;
      case "MERAKI SAVINGS":
        accountIcon = "savingss.svg";
        break;
        case "Savings Account":
          accountIcon = "savingss.svg";
          break;
      case "Fixed Account":
        accountIcon = "currentAccount.svg";
        break;
        case "Investment Account":
          accountIcon = "moneymarket.svg";
          break;
      default:
        accountIcon = "currentAccount.svg";
        break;
    }
    return accountIcon;
  }
};

//Cards server Action
export const AccountCardsOverviewActions = async (
  accountId: number
): Promise<CardDataHome[]> => {
  const accountHandler = AccountHandler();
  const accountOverview = await accountHandler.getAccountOverview(accountId);

  let cards: CardDataHome[] = accountOverview.cards.map((cards) => ({
    id: parseInt(cards.cardNumber),
    icon: cardTypeIcons(cards.cardType),
    accountName: cards.cardType,
    accountInfo: cards.cardNumber,
  }));

  return cards;
  function cardTypeIcons(cardtype: string): ReactNode {
    let cardIcon: string = "";
    switch (cardtype) {
      case "Credit":
        cardIcon = "Master.svg";
        break;
      case "Prepaid":
        cardIcon = "Visa.svg";
        break;
      case "Visa":
        cardIcon = "Visa.svg";
        break;
      case "Debit":
        cardIcon = "Master.svg";
        break;
      default:
        cardIcon = "";
        break;
    }
    return cardIcon;
  }
};

//Transaction history server action
export const TransactionOverviewActions = async (
  accountId: number
): Promise<TranSactionHistoryHome[]> => {
  const accountHandler = AccountHandler();
  const accountOverview = await accountHandler.getAccountOverview(accountId);

  let transactionhistory: TranSactionHistoryHome[] =
    accountOverview.transfers.map((transaction) => ({
      key: transaction.transactionId,
      account: transaction.accountType,
      dateTime: transaction.processingDate,
      // time: transaction.processingDate.toString().split(' ')[0],
      number: transaction.transactionId,
      description: transaction.paymentDetails,
      currency: transaction.debitCurrency,
      status: transaction.status,
    }));

  return transactionhistory;
};

//Balance Overview
export const BalancesByCurrencyOverviewActions = async (
  accountId: number
): Promise<BalanceByCurrencyHome[]> => {
  const accountHandler = AccountHandler();
  const accountOverview = await accountHandler.getAccountOverview(accountId);

  let transactionhistory: BalanceByCurrencyHome[] =
    accountOverview.availableBalanceDTOS.map((balances) => ({
      icon: flagIcons(balances.currency)!,
      countryCurrency: countryIconsCurrencies(balances.currency),
      balanceDescription: "Available Balance",
      availableAmount: balances.availableBalance.toLocaleString(),
      currencyCode: balances.currency,
    }));

  return transactionhistory;

  function countryIconsCurrencies(countryCurrencyCode: string): string {
    let currencyName: string = "";
    switch (countryCurrencyCode) {
      case "KES":
        currencyName = "Kenyan Shillings";
        break;
      case "EURO":
        currencyName = "European";
        break;
      case "EUR":
        currencyName = "European";
          break;
      case "RWF":
        currencyName = "Rwandan Francs";
        break;
      case "GBP":
        currencyName = "British Pound";
        break;
      case "USD":
        currencyName = "US Dollar";
        break;
      default:
        currencyName = "";
        break;
    }

    return currencyName;
  }

  function flagIcons(currencycode: string): ReactNode {
    let flagIcon: string = "";
    switch (currencycode) {
      case "KES":
        flagIcon = "KenyanFlagIcon.svg";
        break;
      case "EURO":
        flagIcon = "EuropeFlagIcon.svg";
        break;
        case "EUR":
          flagIcon = "EuropeFlagIcon.svg";
          break;
      case "RWF":
        flagIcon = "RwandanFlagIcon.svg";
        break;
      case "USD":
        flagIcon = "UsFlagIcon.svg";
        break;
      case "GBP":
        flagIcon = "gbpicon.svg";
        break;
      default:
        flagIcon = "";
        break;
    }
    return flagIcon;
  }
};

export const getCustomerId = async (profileId: number) => {
  const accountHandler = AccountHandler();
  const accountOverview = await accountHandler.getAccountOverview(profileId);

  let custId = accountOverview.customerResponseDTO.customerId;

  return custId;
};

export const singleUsersAccounts = async (
  profileId: number
): Promise<UsersAccounts[]> => {
  const accountHandler = AccountHandler();
  const accountOverview = await accountHandler.getAccountOverview(profileId);

  let accounts: UsersAccounts[] = accountOverview.accounts.map((account) => ({
    key: parseInt(account.accountId),
    value: parseInt(account.accountId),
    option: `Current Account ${account.currency} ${account.accountId}`,
  }));

  return accounts;
};

export const notificationsersAccounts = async (
  profileId: number
): Promise<NotificationAccounts[]> => {
  const accountHandler = AccountHandler();
  const accountOverview = await accountHandler.getAccountOverview(profileId);

  let accounts: NotificationAccounts[] = accountOverview.accounts.map((account) => ({
    accountNumber:account.accountId,
    accountDescription:account.accountTitle
  }));

  return accounts;
};
