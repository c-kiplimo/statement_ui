import { ReactNode } from "react"
import { AccountOverviewData } from "../app/statement/(protected)/dashboard/accounts/[id]/page"
import { SummaryData } from "../components/widgets/accounts-summary-item/accounts.summary.item"
import { AccountsBalances } from "../components/widgets/accounts-table-info/accounts.table.info"
import { CurrencyBalances } from "../components/widgets/chart-overview/chart.overview"
import { ViewMoreAccountsByCustId } from "../services/account/view.more.account"

export const ViewMoreAccounts= async (customerId:number):Promise<SummaryData[]>=>{
    const summarydata:AccountsMore = await ViewMoreAccountsByCustId(customerId)

    let summary:SummaryData[] = summarydata.accountSummary.map((data)=>({
        accountName: `${data.accountType} (${data.numberOfAccounts})`,
        accountBalance:data.totalAmount.toLocaleString(),
        icon:accountIcons(data.accountType),
        imgcolor:bgcolor(data.accountType),
        bgcolor:''

    }))
    return summary
}

function accountIcons(accounttype:string):ReactNode{
    let accountIcon: string = '';
    switch (accounttype) {
        case 'Savings':
            accountIcon = 'saving.svg'
            break;
        case 'Business':
            accountIcon = 'deposit.svg';
            break;
            case 'Investment':
                accountIcon = 'checking.svg';
                break;
        default:
            accountIcon = ''; 
            break;
 }
 return accountIcon;
}
function bgcolor(accounttype:string):string{
    let bgColor: string = '';
    switch (accounttype) {
        case 'Savings':
            bgColor = '#F30039'
            break;
        case 'Business':
            bgColor = '#17D05B';
            break;
            case 'Investment':
                bgColor = '#4272DD';
                break;
        default:
            bgColor = ''; 
            break;
 }
 return bgColor;

}

export const ViewMoreAccountsBalances= async (customerId:number):Promise<AccountsBalances[]>=>{
    const acountsBalances:AccountsMore = await ViewMoreAccountsByCustId(customerId)

    let balances:AccountsBalances[] = acountsBalances.accountList.map((data)=>({
        accountTitle:`${data.accountType} (${data.numberOfAccounts})`,
        amount: commafy(data.totalAmount),
        accountIcon:accountIcons(data.accountType),
        accountsbreakdownInfo:data.accounts.map(result=>({
            accountName: result.accountTitle,
            accountNumber:result.accountId.toString(),
            currentBalance:result.availableBalance.toLocaleString()
        }))
    }))
    
    return balances
    
}
function commafy( number:any ) {
    var str = number.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

export const AccountOverview = async (customerId:number):Promise<AccountOverviewData>=>{
    const overview:AccountsMore = await ViewMoreAccountsByCustId(customerId)

    let overviewdata:AccountOverviewData = {
        totalaccounts: overview.accountOverview.numberOfAccounts,
        totalamount: commafy(overview.accountOverview.totalAmount)
    }

    return overviewdata
}

export const BalancesbyCurrency = async (customerId:number):Promise<CurrencyBalances[]>=>{
    const balances:AccountsMore = await ViewMoreAccountsByCustId(customerId)

    let balancesdata:CurrencyBalances[] = balances.accountOverview.currencyAmount.map(data=>({
        currency: data.currency,
        amount: data.totalAmount.toLocaleString(),
        dollarEquivalent: "",
    }))
    
    return balancesdata
}

