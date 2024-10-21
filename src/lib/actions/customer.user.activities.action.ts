import { CustomerUserActivitiesHandler } from "@/src/services/customer/customer.user.activities.service";
export const UserActivitiesAction =  async ( value:number ): Promise<DataFetcher[]> => {
const handler = CustomerUserActivitiesHandler() 
const data = await handler.fetchCustomerUserActivities( value)    

    if(data == undefined){
        return []
    }

    
    let activities:DataFetcher[] = data.map(activities=>({
        id:activities.userId!,
        createdOn:activities.createdAt,
        userName:activities.activityName,
        status:activities.status,
        role:activities.description,
    }))
    return activities
}