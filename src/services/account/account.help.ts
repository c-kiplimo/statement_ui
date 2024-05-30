import { RAISE_QUESTION } from "@/src/constants/environment";
import axios from "axios";

export const raiseQuerries = async (submittedQuestionData:customerHelp):Promise<customerHelp>=>{
    const createScheduleUrl = RAISE_QUESTION;

    try {
        const response = await axios
            .post(createScheduleUrl, submittedQuestionData, {
            headers: {
                "X-RequestId": "23456786543",
            },
            })
            
        return response.data;
        
        } catch (error) {
        throw error;
        }
    
}
