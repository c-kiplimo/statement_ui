import { ActivitiesTypes } from "@/src/app/statement/(protected)/account-setup-self/activity/(activity-table)/activity.table";
import { CustomerStatus } from "@/src/app/statement/(protected)/account-setup-self/activity/activity";
import ActivitiesHandler from "@/src/services/accountsetup/account.activities";

export const getCustomerActivities = async (
  customerId: number
): Promise<ActivitiesTypes[]> => {
  const handler = ActivitiesHandler();
  const response: CustomerActivities[] = await handler.fetchCustomerActivities(customerId);

  const activities: ActivitiesTypes[] = response.map((data) => ({
    key: data.activityId,
    date: data.createdAt,
    activityName: data.name,
    activityDescription: data.description,
    status: data.status,
  }));
  return activities;
};


export const getCustomerStatus =async (customerId:number):Promise<CustomerStatus[]>=>{
  const handler = ActivitiesHandler();
  const response: CustomerActivities[] = await handler.fetchCustomerActivities(customerId);
  const status:CustomerStatus[]= response.map(data=>({
    label:data.status,
    value:data.status
  }))

  return status
}
