import { CustomerUserHandler } from "@/src/services/customer/customer.users.service";

export const RegisteredUserAction = async (
  customerId: number,platformId: string,page: number,size: number
): Promise<RegisteredUser[]> => {
  const handler = CustomerUserHandler();
  const data = await handler.fetchRegisteredUsers(customerId, platformId, page, size);

  if (data == undefined) {
    return [];
  }

  const users:RegisteredUser[] = data.map((user: {
    firstName: string;
    lastName: string;   
    mobileNumber: string;
    userId: string;
    username: string;
    email: string;
    userType: string;
    status: string;
    createdAt: string;
  }) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.mobileNumber,
    userId: user.username,
    userName: `${user.firstName} ${user.lastName}`,  // Combining firstName and lastName
    email: user.email,
    userType: user.userType,
    status: user.status,
    joinedOn: user.createdAt,
  }));

  console.log("Registered user>>",users)
  return users;
};

