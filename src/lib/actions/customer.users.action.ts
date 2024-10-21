import { CustomerUserHandler } from "@/src/services/customer/customer.users.service";

export const CustomersUsersAction = async (value: number): Promise<DataFetcher[]> => {
  const handler = CustomerUserHandler();
  const data = await handler.fetchCustomerUsers(value);

  if (data == undefined) {
    return [];
  }

  let users: DataFetcher[] = data.map(
    (users: {
      userId: number;
      createdAt: string;
      username: string;
      status: string;
      role: string;
    }) => ({
      id: users.userId,
      createdOn: users.createdAt,
      userName: users.username,
      status: users.status,
      role: users.role,
    })
  );
  return users;
};
