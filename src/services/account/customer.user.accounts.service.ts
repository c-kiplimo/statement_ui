import { GET_CUSTOMER_USER_ACCOUNT_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

interface UserAccount {
    accountId: number;
    dateCreated: string;
    accountTitle: string;
    status: string;
}

const UserAccountHandler = () => {
    const getAccountByUserId = async (userId: number): Promise<UserAccount[]> => {
        const customerAccountUrl = `${GET_CUSTOMER_USER_ACCOUNT_URL}/${userId}`;

        try {
            const response: AxiosResponse<UserAccount[]> = await axios.get(customerAccountUrl, {
                headers: {
                    'X-RequestId': '3456778909',
                },
            });

            if (response.data) {
                return response.data;
            } else {
                throw new Error("No data received from API");
            }
        } catch (error) {
            console.error("Error fetching account by user ID:", error);
            throw error;
        }
    };

    return {
        getAccountByUserId,
    };
};

export { UserAccountHandler };
