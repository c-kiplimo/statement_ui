import { ReactNode, useState } from "react";
import { AccountDataHome } from "../components/widgets/accounts-details-card/account.details.card";
import { CardDataHome } from "../components/widgets/cardtype-details-info/cardtype.details.info";
import { BalanceByCurrencyHome } from "../components/widgets/total-available-balance-card/total.available.balance.card";
import { TranSactionHistoryHome } from "../components/widgets/transaction-history-card/transaction.history.card";
import { AccountHandler } from "../services/account/account.service";

//Personal Accounts server Action
export const PersonalAccountOverviewActions = async (accountId:number): Promise<AccountDataHome[]>=>  {
    const accountHandler = AccountHandler(); 
    const accountOverview = await accountHandler.getAccountOverview(accountId);
     
  let accountards:AccountDataHome[] = accountOverview.accounts.map(account=>({
      id: parseInt(account.accountId),
      icon: accountIcons(account.accountTitle),
      accountName: account.accountTitle,
      accountInfo: `View Your ${account.accountTitle}`
  }))
      
  return accountards

  function accountIcons(accounttype:string):ReactNode{
    let accountIcon: string = '';
    switch (accounttype) {
        case 'Student Account':
            accountIcon = 'moneymarket.svg'
            break;
        case 'Fixed Deposit Account':
            accountIcon = 'currentAccount.svg';
            break;
        case 'Savings Account':
            accountIcon = 'savingss.svg';
            break;
        case 'Fixed Account':
            accountIcon = 'currentAccount.svg';
            break;
        default:
            accountIcon = ''; 
            break;
 }
 return accountIcon;

}
}

//Cards server Action
export const AccountCardsOverviewActions = async (accountId:number): Promise<CardDataHome[]>=>  {
    const accountHandler = AccountHandler(); 
    const accountOverview = await accountHandler.getAccountOverview(accountId);
     
  let cards:CardDataHome[] = accountOverview.cards.map(cards=>({
    id:parseInt(cards.cardNumber),
    icon: cardTypeIcons(cards.cardType),
    accountName: cards.cardType,
    accountInfo: cards.cardExpiryDate,
  }))
      
  return cards
  function cardTypeIcons(cardtype:string):ReactNode{
    let cardIcon: string = '';
    switch (cardtype) {
        case 'Credit':
            cardIcon = 'Master.svg'
            break;
        case 'Prepaid':
            cardIcon = 'Visa.svg';
            break;
        case 'Visa':
            cardIcon = 'Visa.svg';
            break;
        case 'Debit':
            cardIcon = 'Master.svg';
            break;
        default:
            cardIcon = ''; 
            break;
 }
 return cardIcon;

}
}

//Transaction history server action
export const TransactionOverviewActions = async (accountId:number): Promise<TranSactionHistoryHome[]>=>  {
    const accountHandler = AccountHandler(); 
    const accountOverview = await accountHandler.getAccountOverview(accountId);
     
  let transactionhistory:TranSactionHistoryHome[] = accountOverview.transfers.map(transaction=>({
    key: transaction.transactionId,
    account: transaction.accountType,
    dateTime: transaction.processingDate.toString().split('T')[0],
    time: transaction.processingDate.toString().split(' ')[0],
    number: transaction.transactionId,
    description: transaction.paymentDetails,
    currency: transaction.debitCurrency,
    status: transaction.status
  }))
      
  return transactionhistory

}

//Balance Overview
export const BalancesByCurrencyOverviewActions = async (accountId:number): Promise<BalanceByCurrencyHome[]>=>  {
    const accountHandler = AccountHandler(); 
    const accountOverview = await accountHandler.getAccountOverview(accountId);
     
  let transactionhistory:BalanceByCurrencyHome[] = accountOverview.availableBalanceDTOS.map(balances=>({
    icon: flagIcons(balances.currency)!,
    countryCurrency:countryIconsCurrencies(balances.currency),
    balanceDescription: 'Available Balance',
    availableAmount: balances.availableBalance,
    currencyCode: balances.currency,
  }))
      
  return transactionhistory

  function countryIconsCurrencies(countryCurrencyCode: string): string {
    let currencyName: string = '';
    switch (countryCurrencyCode) {
        case 'KES':
            currencyName = 'Kenyan Shillings';
            break;
        case 'EURO':
            currencyName = 'European';
            break;
        case 'RWF':
            currencyName = 'Rwandan Francs';
            break;
        case 'USD':
            currencyName = 'US Dollar';
            break;
        default:
            currencyName = ''; 
            break;
    }

    return currencyName;
}

 function flagIcons(currencycode:string):ReactNode{
    let flagIcon: string = '';
    switch (currencycode) {
        case 'KES':
            flagIcon = 'KenyanFlagIcon.svg'
            break;
        case 'EURO':
            flagIcon = 'EuropeFlagIcon.svg';
            break;
        case 'RWF':
            flagIcon = 'RwandanFlagIcon.svg';
            break;
        case 'USD':
            flagIcon = 'UsFlagIcon.svg';
            break;
        default:
            flagIcon = ''; 
            break;
 }
 return flagIcon;

}

}