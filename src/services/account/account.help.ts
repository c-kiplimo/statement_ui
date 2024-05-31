import { CLOSE_ACCOUNT_URL, RAISE_QUESTION_URL } from "@/src/constants/environment";
import axios from "axios";
// ENDPOINT FOR RAISING QUERIES AND QUESTION
export const raiseQuerries = async (submittedQuestionData:customerHelp):Promise<customerHelp>=>{
    const apiUrl = RAISE_QUESTION_URL;

    try {
        const response = await axios
            .post(apiUrl, submittedQuestionData, {
            headers: {
                "X-RequestId": "23456786543",
            },
            })
            
        return response.data;
        
        } catch (error) {
        throw error;
        }
    
}

//ENDPOINT TO CLOSE THE ACCOUNT
export const closeAccount = async (userId: string) => {
    const apiUrl = `${CLOSE_ACCOUNT_URL}/${userId}`;

    try {
        const response = await axios.post(apiUrl, {}, {
            headers: {
                "X-RequestId": "23334",
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Status:', error.response.status);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        throw error;
    }
};
