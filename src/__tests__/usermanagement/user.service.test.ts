import { UserHandler } from "@/src/services/usermanagement/user.service";

import axios from "axios";

const userHandler = UserHandler();

describe.skip("test fetch all users ", () => {
    describe("given search ", () => {
        it("it should fetch all users", async () => {
            const mockSearch = "owen";

            const users = await userHandler.fetchAllUsers(mockSearch);
            console.log(users);

            expect(users.some((user) => user.firstName === mockSearch));
        });
    });
    //delete user by email
    describe("given email ", () => {
        it("it should delete user", async () => {
            const mockEmail = "kiplimocollins855@gmail.com";
            const user = await userHandler.deleteUser(mockEmail);
            console.log(user);
        });
    });
});