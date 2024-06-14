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

            if (response.data) {
                return response.data;
            } else {
                throw new Error("No data received from API");
            }
        } catch (error) {
            console.error("Error fetching groups by user ID:", error);
            throw error;
        }
    };

    const getUserGroupsByPlatformId = async (platformId: number): Promise<allUserGroupsTypes[]> => {
        const customerAccountUrl = `${GET_CUSTOMER_USER_GROUPS_URL}`;

        try {
            const response: AxiosResponse<allUserGroupsTypes[]> = await axios.get(customerAccountUrl, {
                headers: {
                    'X-RequestId': '34567',
                },
                params: {
                    platformId,
                },
            });

            if (response.data) {
                return response.data;
            } else {
                throw new Error("No data received from API");
            }
        } catch (error) {
            console.error("Error fetching groups by platform ID:", error);
            throw error;
        }
    };

    return {
        getUserGroupsByUserId,
        getUserGroupsByPlatformId,
    };
};

export { UserGroupsHandler };
