import { fetchAccountStatus } from "@/src/services/account/account.byId.service";


export const AccountsProfile = async (accountNo:number) =>{
  const accountStatus:AccountById = await fetchAccountStatus(accountNo);
  if(!accountStatus){
      alert('Account Doesnt Exist')
  }
  
  let statusresult = {
      currency: accountStatus.currency,
      accountId: accountStatus.accountId,
      accountTitle:accountStatus.accountTitle
  }
  return statusresult;
}