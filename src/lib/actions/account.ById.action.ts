import { acctData } from "@/src/components/widgets/acconts-configuration/configuration-form/accounts.configuration";
import { fetchAccountStatus } from "@/src/services/account/account.byId.service";


export const AccountsStmtConfig = async (accountNo:number):Promise<acctData> =>{
  const accountStatus:AccountById = await fetchAccountStatus(accountNo);
  if(!accountStatus){
      alert('Account Doesnt Exist')
  }
  
  let statusresult:acctData = {
      currency:accountStatus.currency,
      name:accountStatus.accountTitle,
      account:accountStatus.accountId,
      lastSubmissionTime:accountStatus.status,
      availableAmount:accountStatus.availableBalance,
      workingBal:accountStatus.closingBalance,
      termDuration:accountStatus.term,
  }
  console.log(accountStatus)
  return statusresult;
}