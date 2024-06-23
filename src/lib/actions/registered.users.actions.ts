import { CustomerUserHandler } from "@/src/services/customer/customer.users.service";
import { UserDetails } from "@/src/types/user.type";

export const RegisteredUsersAction = async (
  value: number
): Promise<UserDetails[]> => {
  const handler = CustomerUserHandler();
  const data = await handler.fetchCustomerUsers(value);

  if (data == undefined) {
    return [];
  }

  let users: UserDetails[] = data.map(
    (user: {
      userId:number
      username: string;
      usersName: string | null;
      email: string;
      mobileNumber: string;
      role: string;
      staffNumber?: string;
    }) => {
      let firstName = "";
      let lastName = "";

      if (user.username) {
        const [first, ...rest] = user.username.split(" ");
        firstName = first || "";
        lastName = rest.join(" ") || "";
      }
      return {
        id:user.userId,
        firstName,
        lastName,
        usersName: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role,
      };
    }
  );

  console.log("Registered Users>>", users);

  return users;
};
