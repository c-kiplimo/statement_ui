import { CustomerUserHandler } from "@/src/services/customer/customer.users.service";

export const RegisteredUserAction = async (
  value: number
): Promise<RegisteredUser[]> => {
  const handler = CustomerUserHandler();
  const data = await handler.fetchCustomerUsers(value);

  if (data == undefined) {
    return [];
  }

  let users: RegisteredUser[] = data.map(
    (users: {
      userId:number
      username: string;      
      mobileNumber: string;
      email: string;
      createdAt: string;
    }) => ({
        userId:users.userId,
        userName:users.username,
        phone:users.mobileNumber,
        email:users.email,
        joinedOn:users.createdAt,
      })
    );
  return users;
};

