import { ACCOUNT_STATEMENT_REQUEST_URL, SEARCH_DATA_URL } from "@/src/constants/environment";
import axios from "axios";


//CREATE ACCOUNT STATEMENT REQUEST
const AccountStatementRequestHandler = () => {
    const createAccountStatementRequest = async (
        accountStatementRequest: AccountStatementRequest
    ): Promise<AccountStatementRequest> => {
        const accountStatementRequestUrl = `${SEARCH_DATA_URL}`;
        try {
        const response = await axios
            .post(accountStatementRequestUrl, accountStatementRequest, {
            headers: {
                "X-RequestId": "23456785",
            },
            })
            
        return response.data;
        
        } catch (error) {
        throw error;
        }
    };

const fetchStatementRequestById = async (
    id: number
    ): Promise<AccountStatementRequest> => {
    const accountStatementRequestUrl = `${ACCOUNT_STATEMENT_REQUEST_URL}/${id}`;
    try {
        
        const response = await axios
        .get(accountStatementRequestUrl, {
            headers: {
            "X-RequestId": "234567890",
            },
        })
        
        .then((res) => {
            let apiResponse = res.data;
            if (apiResponse) {
        
            let apiRes = apiResponse
            let accountStatementRequest: AccountStatementRequest = {
                ...apiRes,
            };
            console.log('the results',accountStatementRequest);
            
            return accountStatementRequest;
            } else {
            throw new Error(apiResponse);
            }
        });
        console.log(response);
        
        return response;
    } catch (error) {
        throw error;
    }
    }

    
    return {
        createAccountStatementRequest,
        fetchStatementRequestById,
    };
    }
    export { AccountStatementRequestHandler };