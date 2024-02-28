import { PERMISSION_URL } from "@/src/constants/environment";
import { USER_PERMISSION_URL } from "@/src/constants/environment";

import axios from "axios";

const PermissionHandler = () => {
    const fetchAllUserPermissions = async(

    ) : Promise<UserPermissions[]> =>{
        const userPermissionUrl = `${USER_PERMISSION_URL}`;
        try {
            const response = await axios.get<UserPermissions[]>(userPermissionUrl, {
                headers: {
                    'X-RequestId': '3456778909',
                },
            }).then((res) => {
            let apiResponse = res.data

            if (apiResponse) {
                let apiRes = apiResponse;
                let userPermission: UserPermissions[] = [
                    ...apiRes,
                ];
                return userPermission;
            } else {
                throw new Error(apiResponse);
            }
            });
            return response;
        } catch (error) {
           throw error;
        }       
    };
const addUserPermission = async (
    userPermission: UserPermissions
): Promise<UserPermissions> => {
    const userPermissionUrl = `${USER_PERMISSION_URL}`;
    try {
        const response = await axios
        .post(userPermissionUrl, userPermission, {
            headers: {
            "X-RequestId": "3456778909",
            },
        })
        .then((res) => {
            let apiResponse = res.data;

            if (apiResponse) {
            let apiRes = apiResponse;
            let userPermission: UserPermissions = {
                ...apiRes,
            };
            return userPermission;
            } else {
            throw new Error(apiResponse);
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
}
const fetchAllPermissions = async(
) : Promise<Permission[]> =>{
    const permissionUrl = `${PERMISSION_URL}`;
    try {
        console.log("permissionUrl", permissionUrl)
        const response = await axios.get<Permission[]>(permissionUrl, {
            headers: {
                'X-RequestId': '3456778909',
            },
        }).then((res) => {
        let apiResponse = res.data
       

        if (apiResponse) {
            let apiRes = apiResponse;
            let permission: Permission[] = [
                ...apiRes,
            ];
            return permission;
        } else {
            throw new Error(apiResponse);
        }
        });
        return response;
    } catch (error) {
       throw error;
    }       
};
const addPermission = async (
    permission: Permissions
): Promise<Permission> => {
    const permissionUrl = `${PERMISSION_URL}`;
    try {
        const response = await axios
        .post(permissionUrl, permission, {
            headers: {
            "X-RequestId": "3456778909",
            },
        })
        .then((res) => {
            let apiResponse = res.data;

            if (apiResponse) {
            let apiRes = apiResponse;
            let permission: Permission = {
                ...apiRes,
            };
            return permission;
            } else {
            throw new Error(apiResponse);
            }
        });

        return response;
    } catch (error) {
        throw error;
    }
}
const fetchPermissionByName = async (
    name: string
    ): Promise<Permission> => {
    const permissionUrl = `${PERMISSION_URL}/${name}`;
    try {
        const response = await axios
        .get(permissionUrl, {
            headers: {
            "X-RequestId": "3456778909",
            },
        })
        .then((res) => {
            let apiResponse = res.data;
            if (apiResponse) {
            let apiRes = apiResponse;
            let permission: Permission = {
                ...apiRes,
            };
            return permission;
            } else {
            throw new Error(apiResponse);
            }
        });
        return response;
    } catch (error) {
        throw error;
    }
    }


    return {
        fetchAllUserPermissions,
        addUserPermission,
        fetchAllPermissions,
        addPermission,
        fetchPermissionByName
    };
}
export { PermissionHandler};