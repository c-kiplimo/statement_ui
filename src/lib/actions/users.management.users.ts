import { UserInfoType } from "@/src/app/statement/(protected)/usermanagement/branch/widgets/users-table/users.table";
import { UserHandler } from "@/src/services/usermanagement/user.service";
import { UserDetails } from "@/src/types/user.type";

export const fetchAvailableUsers =async (searchId?:string):Promise<UserInfoType[]> =>{
    const handler = UserHandler()
    const response:UserDetails[] = await handler.fetchAllUsers(searchId!)
    
    const data:UserInfoType[] = response.map(response=>({
        key: response.username!,
        firstName: response.firstName,
        lastName: response.lastName,
        phoneNumber: response.mobileNumber,
        emailAddress: response.email,
        role: '',
        staffNumber: ''
    }))
        
    return data  

}