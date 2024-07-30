import { CustomerUserActivitiesHandler } from "@/src/services/customer/customer.user.activities.service";

export const fetchActivityLogAction =  async ( value:number ): Promise<ActivityData[]> => {
const handler = CustomerUserActivitiesHandler() 
const data = await handler.fetchCustomerUserActivities( value)    

    if(data == undefined){
        return []
    }

    let activities:ActivityData[] = data.map(activities=>({
        createdOn:activities.createdAt,
        activityName:activities.activityName,
        status:activities.status,
        description:activities.description,
    }))
    return activities
}