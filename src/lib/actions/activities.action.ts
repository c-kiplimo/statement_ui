import { CustomerActivitiesHandler } from "@/src/services/customer/customer.activity.service";
export const ActivitiesAction =  async ( value:number ): Promise<DataFetcher[]> => {
const handler = CustomerActivitiesHandler() 
const data = await handler.fetchCustomerActivities( value)    

    if(data == undefined){
        return []
    }

    
    let activities:DataFetcher[] = data.map(activities=>({
        id:activities.activityId,
        createdOn:activities.createdAt,
        userName:activities.name,
        status:activities.status,
        role:activities.description,
    }))
    return activities
}