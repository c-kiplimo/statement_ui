import { fetchAccountNotificationsByUserId } from "../services/account/notification.setttings.service"

export const getAccountNotificationAction = async (userId:string): Promise<NotificationSettingTypes> =>{
    const response = await fetchAccountNotificationsByUserId(userId);

    if (response === undefined || null){
        return response
    }
    
    return response
}