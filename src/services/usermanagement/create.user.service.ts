import { GET_PLATFORM_GROUPS } from '@/src/constants/environment';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const createUserHandler = () => {
    type ResponseData = PlatformGroup[];

    type CreateUserProps = {
        register: {
            password: string;
            firstName: string;
            lastName: string;
            mobileNumber: string;
            email: string;
            groupId: string;
        };
    };

    const fetchPlatformGroupService = async (platformId: number): Promise<ResponseData> => {
        const url = `${GET_PLATFORM_GROUPS}?platformId=${platformId}`;

        try{
            const response = await axios.get(url,{
                headers: { 
                    'X-RequestId': '23456789', 
                }  
            });
            console.log("Fetched platform groups:",response.data);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch platform group data", error);
            throw error;
        }
    };

    const createUserService = async (URL: string, PAYLOAD: CreateUserProps) => {
        const { password, firstName, lastName, mobileNumber, email, groupId } = PAYLOAD.register;

        const payload = {
            password,
            firstName,
            lastName,
            mobileNumber,
            email,
            groupId
        };

        try {
            const response = await axios.post(URL, payload, {
                headers: {
                    "X-RequestId": "35342323",
                },
            });
            console.log("Created user::",response.data)
            return response;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    return {
        fetchPlatformGroupService,
        createUserService
    };
};

export { createUserHandler };
