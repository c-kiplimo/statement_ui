import { EntriesProps } from "@/src/components/widgets/account-restrictions/restrictions";
import { FetchAllAccountRestrictions } from "@/src/services/account/all.account.restrictions.service";

export const AllAccountRestrictionsAction = async (): Promise<EntriesProps[]> => {
  try {
    const data = await FetchAllAccountRestrictions();

    console.log(data);
    
    if (!data) {
      return [];
    }

    let restrictions: EntriesProps[] = data.content.map(restriction => ({
      id: restriction.restrictionId,
      restrictionName: restriction.name,
      description:restriction.description,
      createdAt:restriction.createdAt,
      status:restriction.status,

    }));
    console.log(restrictions);
    
    return restrictions;
  } catch (error) {
    console.error('Error in AllAccountRestrictionsAction:', error);
    return [];
  }
};
