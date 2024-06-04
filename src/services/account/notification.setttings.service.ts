import { CREATE_USER_NOTIFICATION_STATUS, FETCH_USER_NOTIFICATION_STATUS } from "@/src/constants/environment";
import axios from "axios";

export const createUserNotifications = async (notificationData:NotificationSettingTypes):Promise<NotificationSettingTypes>=>{
    const createNottificationUrl = CREATE_USER_NOTIFICATION_STATUS;
    try {
        const response = await axios
            .post(createNottificationUrl, notificationData, {
            headers: {
                "X-RequestId": "23456786543",
            },
            })
            
        return response.data;
        
        } catch (error) {
        throw error;
        }
    
}
export const fetchAccountNotificationsByUserId  = async (userId:number):Promise<NotificationSettingTypes>=>{
    const apiUrl = `${FETCH_USER_NOTIFICATION_STATUS}/${userId}`
    try {
        
      const response = await axios
      .get(apiUrl, {
          headers: {
          "X-RequestId": "4354657678",
          },
      })
      
      .then((res) => {
          let apiResponse = res.data;
          if (apiResponse) {         
            let apiRes=apiResponse
          let accountinformation: NotificationSettingTypes ={ 
              ...apiRes,
          };
          
          return accountinformation;
          } else {
          throw new Error(apiResponse);
          }
      });  
                
      return response;
  } catch (error) {
      throw error;
  }
  }
