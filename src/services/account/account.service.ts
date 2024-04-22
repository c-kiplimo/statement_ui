import { ACCOUNT_OVERVIEW_URL, CUSTOMER_RESTRICTIONS_URL, USER_ACCOUNTS_OVERVIEW, USER_ACCOUNTS_URL } from "@/src/constants/environment";
import { CUSTOMER_ACCOUNT_URL } from "@/src/constants/environment";
import { ACCOUNT_RESTRICTIONS_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

const AccountHandler = () => {
    const getAccountOverview: (
        accountId: number,
    ) => Promise<AccountProfile> = async (
        accountId: number,
    ) => {
        const accountOverviewUrl = `${USER_ACCOUNTS_OVERVIEW}/${accountId}`;

        try {
            const response = await axios.get(accountOverviewUrl, {
                headers: {
                    'X-RequestId': '2345678987654',
                },
            }).then((res) => {
            let apiResponse = res.data

            if (apiResponse) {
                let apiRes = apiResponse;
                let accountOverview: AccountProfile = {
                    ...apiRes,
                };
                return accountOverview;
            } else {
                throw new Error(apiResponse);
            }
            });
            return response;
        } catch (error) {
           throw error;
        }
    };

const getAccountByCustomerId =async(
    customerId: number
):Promise< Account [] > => {
 
    const customerAccountUrl = `${CUSTOMER_ACCOUNT_URL}/${customerId}`;

    try {
        const response = await axios.get<Account[]>(customerAccountUrl, {
            headers: {
                'X-RequestId': '3456778909',
            },
        }).then((res) => {
        let apiResponse = res.data

        if (apiResponse) {
            let apiRes = apiResponse;
            let account: Account[] = [
                ...apiRes,
            ];
            return account;
        } else {
            throw new Error(apiResponse);
        }
        });
        return response;
    } catch (error) {
       throw error;
    }
};

    const fetchCustomerRestrictions = async (
        customerId: number
    ): Promise<CustomerRestrictions[]> => {
        const customerRestrictionsUrl = `${CUSTOMER_RESTRICTIONS_URL}/${customerId}`;
     

        try {
            const response = await axios.get<CustomerRestrictions[]>(customerRestrictionsUrl, {
                headers: {
                    'X-RequestId': '3456778909',
                },
            }).then((res) => {
            let apiResponse = res.data

            console.log("Fetched customer restrictions data:", apiResponse);

            if (apiResponse) {
                let apiRes = apiResponse;
                let customerRestrictionsUrl: CustomerRestrictions[] = [
                    ...apiRes,
                ];
                return customerRestrictionsUrl;
            } else {
                throw new Error(apiResponse);
            }
            });
            return response;
        }catch (error) {
            throw error;
        }

        
};







const fetchUserAcounts = async (
    customerId: number
): Promise<CustomerRestrictions[]> => {
    const customerRestrictionsUrl = `${USER_ACCOUNTS_URL}/${customerId}`;

    try {
        const response = await axios.get<CustomerRestrictions[]>(customerRestrictionsUrl, {
            headers: {
                'X-RequestId': '3456778909',
            },
        }).then((res) => {
        let apiResponse = res.data

        if (apiResponse) {
            let apiRes = apiResponse;
            let customerRestrictionsUrl: CustomerRestrictions[] = [
                ...apiRes,
            ];
            return customerRestrictionsUrl;
        } else {
            throw new Error(apiResponse);
        }
        });
        return response;
    }catch (error) {
        throw error;
    }

    
};






const fetchAccountRestrictions = async (
    accountId: number
): Promise<AccountRestrictions[]> => {
    const accountRestrictionsUrl = `${ACCOUNT_RESTRICTIONS_URL}/${accountId}`;
    
    try {
        const response = await axios.get<AccountRestrictions[]>(accountRestrictionsUrl, {
            headers: {
                'X-RequestId': '3456778909',
            },
        });

        if (response.data) {
            return response.data;
        } else {
            throw new Error('Empty response from the server');
        }
    } catch (error) {
        throw error;
    }
};



    return {
        fetchAccountRestrictions,
        getAccountOverview,
        getAccountByCustomerId,
        fetchCustomerRestrictions
    };
}
export { AccountHandler };