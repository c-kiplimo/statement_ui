import axios from "axios";
import { ACCOUNT_STATEMENT_REQUEST_URL, DELETE_ACCOUNT_SCHEDULE, DOWNLOAD_BRANCH_STATEMENT, DOWNLOAD_SELF_STATEMENT, FIND_USER_ACCOUNT_BY_ID, GET_ACCOUNT_SCHEDULE, GET_ACCOUNT_STATUS, USER_ACCOUNTS_BY_ACCOUNTS_ID, USER_CARD_BY_CARD_NUMBER } from "@/src/constants/environment";
import { notification } from "antd";

export const getAccountById = async (accountId: string): Promise<Account> => {
  const accountOverviewUrl = `${USER_ACCOUNTS_BY_ACCOUNTS_ID}/${accountId}`;

  try {
    const response = await axios.get(accountOverviewUrl, {
      headers: {
        'X-RequestId': '23456789',
      },
    });

    const apiResponse = response.data;

    if (apiResponse) {
      const accountOverview: Account = {
        ...apiResponse,
      };
      return accountOverview;
    } else {
      throw new Error("No data received from the API");
    }
  } catch (error) {
    throw new Error(`Failed to fetch account overview:`);
  }
};

const getCardByCardNumber = async (cardNumber: string): Promise<Card> => {
  const cardurl = `${USER_CARD_BY_CARD_NUMBER}/${cardNumber}`;
  try {
    const response = await axios.get(cardurl, {
      headers: {
        'X-RequestId': '345678907',
      },
    });
    const apiResponse = response.data;
    
    const accountOverview: Card = {
      ...apiResponse
    };

      return accountOverview;
        } catch (error) {
    throw new Error(`Failed to fetch account overview:`);
  }
};

export default getCardByCardNumber;

export const fetchStatementDataEntriesId = async (
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
          const jsonentries = JSON.parse(apiResponse.data)
          const statementEntries = jsonentries.statementEntries.slice(0, 10);
          let apiRes = jsonentries;          
          let accountStatementRequest: AccountStatementRequest = {
              ...apiRes,
          };
          
          return accountStatementRequest;
          } else {
          throw new Error(apiResponse);
          }
      });      
      return response;
  } catch (error) {
      throw error;
  }
  }

export const fetchAccountDetailsById  = async (accountNumber:number):Promise<AccountInformations>=>{
    const apiUrl = `${FIND_USER_ACCOUNT_BY_ID}/${accountNumber}`
    try {
        
      const response = await axios
      .get(apiUrl, {
          headers: {
          "X-RequestId": "4354657678",
          },
      })
      
      .then((res) => {
          let apiResponse = res.data;
          if (apiResponse) {         
            let apiRes=apiResponse
          let accountinformation: AccountInformations = {
              ...apiRes,
          };
          
          return accountinformation;
          } else {
          throw new Error(apiResponse);
          }
      });  
  
      return response;
  } catch (error) {
      throw error;
  }
  }

  export const DownloadSelfStatement = async (statementRequestId: number, fileFormat: string) => {
    
    const downloadUrl = `${DOWNLOAD_SELF_STATEMENT}/${statementRequestId}?fileFormat=${fileFormat}`;
  
    try {
      const response = await axios.post(downloadUrl, null, {
        headers: {
          'X-RequestId': '2345678',
        },
        responseType: 'blob',
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
  

export const DownloadBranchStatement = async (statementRequestId : number, fileFormat:string) => {
  const downloadUrl = `${DOWNLOAD_BRANCH_STATEMENT}/${statementRequestId }`;

  try {
    const response = await axios.get(downloadUrl, {
        headers: {
            'X-RequestId': '2345678',
        },
        responseType: 'blob',
        params:{fileFormat},
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

export const fetchAccountStatus  = async (accountNumber:number):Promise<AccountStatus>=>{
  const apiUrl = `${GET_ACCOUNT_STATUS}/${accountNumber}`
  try {
      
    const response = await axios
    .get(apiUrl, {
        headers: {
        "X-RequestId": "4354657678",
        },
    })
    
    .then((res) => {
        let apiResponse = res.data;
        if (apiResponse) {         
          let apiRes=apiResponse
        let accountinformation: AccountStatus = {
            ...apiRes,
        };
        
        return accountinformation;
        } else {
        throw new Error(apiResponse);
        }
    });      
    return response;
} catch (error) {
    throw error;
}
}

export const fetchAccountShedule  = async (accountNumber:number):Promise<SingleAccountSchedule[]>=>{
  const apiUrl = `${GET_ACCOUNT_SCHEDULE}/${accountNumber}`
  try {
      
    const response = await axios
    .get(apiUrl, {
        headers: {
        "X-RequestId": "4354657678",
        },
    })
    
    .then((res) => {
        let apiResponse = res.data;
        if (apiResponse) {         
          let apiRes=apiResponse
        let accountinformation: SingleAccountSchedule[] = [
            ...apiRes,
        ];
        
        return accountinformation;
        } else {
        throw new Error(apiResponse);
        }
    });  
        
    return response;
} catch (error) {
    throw error;
}
}

export const deleteAccountSchedule = async (id:number) => {
  const deleteUrl = `${DELETE_ACCOUNT_SCHEDULE}/${id}`;

  try {
    const response = await axios.delete(deleteUrl, {
      headers: {
        "X-RequestId": "4354657678",
      }
    });

    notification.success({
      message: 'Schedule Deleted Successfully'
    });

    return response;
  } catch (error) {
    notification.error({
      message: 'Failed to Delete Schedule',
      
    });

    throw error;
  }
};











