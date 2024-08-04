import { ADD_CUSTOMER_USER_GROUP, CREATE_GROUP_MEMBER } from "@/src/constants/environment";
import axios from "axios";

interface UserPayload {
    groupId: number;
    platformId: number;
}

const CREATEGROUPMEMBER = async (userId: string, userPayload: UserPayload) => {
    try {
        const api = `${CREATE_GROUP_MEMBER}/${userId}`;
        
        const response = await axios.post(api, userPayload, {
            headers: {
                "X-RequestId": "3445",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error creating user:", error.message || error);
        throw error;
    }
};

export { CREATEGROUPMEMBER };
