import { GET_CUSTOMER_USER_GROUPS_URL } from "@/src/constants/environment";
import axios, { AxiosResponse } from "axios";

const UserGroupsHandler = () => {
    const getUserGroupsByUserId = async (userId: number): Promise<UserGroupType[]> => {
        const customerAccountUrl = `${GET_CUSTOMER_USER_GROUPS_URL}/${userId}`;

        try {
            const response: AxiosResponse<UserGroupType[]> = await axios.get(customerAccountUrl, {
                headers: {
                    'X-RequestId': '34567',
                },
            });

            console.log(response);
            

            if (response.data) {
                console.log("Response data:", response.data);
                return response.data;
            } else {
                throw new Error("No data received from API");
            }
        } catch (error) {
            console.error("Error fetching groups by user ID:", error);
            throw error;
        }
    };

    return {
        getUserGroupsByUserId,
    };
};

export { UserGroupsHandler };
