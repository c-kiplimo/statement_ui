import { fetchAccountStatus } from "@/src/services/account/account.byId.service";


export const AccountsStmtConfig = async (accountNo:number) =>{
  const accountStatus:AccountById = await fetchAccountStatus(accountNo);
  if(!accountStatus){
      alert('Account Doesnt Exist')
  }
  
  let statusresult = {
      currency:accountStatus.currency,
      name:accountStatus.accountTitle,
      account:accountStatus.accountId,
      lastSubmissionTime:accountStatus.status,
      availableAmount:accountStatus.availableBalance,
      workingBal:accountStatus.closingBalance,
      termDuration:accountStatus.term,
  }
  return statusresult;
}