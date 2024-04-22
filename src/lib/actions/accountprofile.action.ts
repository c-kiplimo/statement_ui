import { profilesTypeprops } from "@/src/app/statement/(protected)/accountsetup/account-profile/account.profile";
import { fetchAccountStatus } from "@/src/services/account/account.byId.service";


export const AccountsProfile = async (accountNo:number):Promise<profilesTypeprops> =>{
  const accountStatus:AccountById = await fetchAccountStatus(accountNo);
  if(!accountStatus){
      alert('Account Doesnt Exist')
  }
  
  let statusresult:profilesTypeprops = {
      currency: accountStatus.currency,
      accountId: accountStatus.accountId,
      accountTitle:accountStatus.accountTitle
  }
  return statusresult;
}