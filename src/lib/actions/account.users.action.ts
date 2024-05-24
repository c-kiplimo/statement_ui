import { DataFetcher } from "@/src/app/statement/(protected)/accountsetup/widgets/table/table";
import { AccountUserHandler } from "@/src/services/account/account.user.acc.ById.service";

export const UsersAction = async (value: number): Promise<DataFetcher[]> => {
  const handler = AccountUserHandler();
  const data = await handler.fetchAccountUsers(value);

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
