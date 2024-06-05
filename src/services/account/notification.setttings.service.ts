import { CREATE_USER_NOTIFICATION_STATUS, FETCH_USER_NOTIFICATION_STATUS } from "@/src/constants/environment";
import { notification } from "antd";
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
export const fetchAccountNotificationsByUserId  = async (userId:string):Promise<NotificationSettingTypes>=>{
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

  export const editAccountNotification = async (userId: string, notificationData: NotificationSettingTypes): Promise<NotificationSettingTypes> => {
    const createScheduleUrl = `${FETCH_USER_NOTIFICATION_STATUS}/${userId}`;
  console.log(notificationData);
  
    try {
      const response = await axios.put(createScheduleUrl, notificationData, {
        headers: {
          "X-RequestId": "23456786543",
        },
      });
  
      notification.success({
        message: 'Updated Notification Successfully',
      });
      return response.data;
    } catch (error) {
      notification.error({
        message: 'Failed to Update Notifications. Try again later',
      });
      throw error;
    }
  };
