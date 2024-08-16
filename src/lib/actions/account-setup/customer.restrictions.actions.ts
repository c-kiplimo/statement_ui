import { SingleRestrictionTypes } from "@/src/app/statement/(protected)/account-setup-self/restrictons/(delete-restriction)/delete.restriction";
import { RestrictionTypes } from "@/src/app/statement/(protected)/account-setup-self/restrictons/(restrictions-table)/restrictions.table";
import { RestrictionType } from "@/src/app/statement/(protected)/account-setup-self/restrictons/(select-restriction-modal)/select.restriction";
import RestrictionHandler from "@/src/services/accountsetup/customer.restrictions";

const handler = RestrictionHandler();

export const getCustomerRestrictions =async (customerId:number):Promise<RestrictionTypes[]>=>{
    const response:CustomerRestrictions[] = await handler.fetchCustomerRestrictions(customerId);
    const restrictions:RestrictionTypes[] = response.map(data=>({
        key:data.id,
         date:data.restrictions.createdAt, 
         restrictionName:data.restrictions.name, 
         restrictionDescription:data.restrictions.description, 
         status:data.restrictions.status
    }))
    
    return restrictions;
}


export const getAllRestrictions =async ( page: number,size:number,sort:string):Promise<RestrictionType[]>=>{
    const response:AllRestrictions = await handler.fetchAllRestrictions(page,size,sort);

    const allRestrictions:RestrictionType[] = response.content.map(data=>({
        id:data.restrictionId, 
        restrictionname:data.name, 
        restrictionDescription:data.description
    }))
    return allRestrictions
}

export const getSingleRestriction = async (restrictionId:number):Promise<SingleRestrictionTypes>=>{
    const response:SingleRestriction = await handler.fetchSingleRestrictions(restrictionId);

    const restriction:SingleRestrictionTypes ={
        id: response.restrictionId,
        name: response.name,
        description: response.description
    }   

    return restriction;
}
