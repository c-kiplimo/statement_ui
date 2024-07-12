import { USER_PERMISSION_URL } from "@/src/constants/environment"
import axios from "axios";


const PermissionsHandler = () => {
    const fetchPermissions = async (userId: string): Promise<UserPermission[]> => {
        const apiUrl = `${USER_PERMISSION_URL}/${userId}`;
        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'X-RequestId': '23456789',
                },
            });
            const apiResponse: UserPermission[] = response.data;            
            if (apiResponse) {
                return apiResponse;
            } else {
                throw new Error("No data received from the API");
            }
        } catch (error) {
            throw new Error(`Failed to fetch account overview: ${error}`);
        }
    };

    return {
        fetchPermissions
    };
};

export default PermissionsHandler;



