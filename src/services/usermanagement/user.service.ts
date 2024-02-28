import { USER_URL } from "@/src/constants/environment";
import { UserDetails } from "@/src/types/user.type";
import axios from "axios";

const UserHandler = () => {
    const fetchAllUsers = async (
        search?: string,
    ): Promise<UserDetails[]> => {
        let userUrl = USER_URL;
        if (search) {
            userUrl += `?search=${search}`;
        }

        try {
            const response = await axios.get<UserDetails[]>(userUrl, {
                headers: {
                    'X-RequestId': '3456778909',
                },
            }).then((res) => {
                let apiResponse = res.data;

                if (apiResponse) {
                    let apiRes = apiResponse;
                    let user: UserDetails[] = [
                        ...apiRes,
                    ];
                    return user;
                } else {
                    throw new Error(apiResponse);
                }
            });

            return response;
        } catch (error) {
            throw error;
        }
    };


    // delete user by email
    const deleteUser = async (
        email: string,
    ): Promise<string> => {
        const userUrl = `${USER_URL}/${email}`;
        try {
            const response = await axios.delete(userUrl, {
                headers: {
                    'X-RequestId': '3456778909',
                },
            }).then((res) => {
                return res.data;
            });

            return response;
        } catch (error) {
            throw error;
        }
    };

    return {
        fetchAllUsers,
        deleteUser
    };
};

export { UserHandler };
