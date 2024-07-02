import { DataFetcher } from '@/src/app/statement/(protected)/accountsetup/widgets/table/table';
import { CustomersUsersAction } from '@/src/lib/actions/customer.users.action';
import React, { useEffect, useState } from 'react'

type userProps={
    userId?:number;
}

const UsersBranch = ({userId}:userProps) => {
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [incomingData, setIncomingData] = useState<DataFetcher[]>([]);
    const [loading, setLoading] = useState(true);

    

    const fetchData = async () => {
        if (userId !== undefined) {
          setLoading(true);
          try {
            const incomingAccountId = await CustomersUsersAction(userId);    
            setIncomingData(incomingAccountId);
          } catch (error) {
            console.error("Error fetching data:", error);
          } finally {
            setLoading(false);
          }
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [userId]);
  return (
    <div>UsersBranch</div>
  )
}

export default UsersBranch