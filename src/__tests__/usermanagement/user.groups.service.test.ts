import { GroupHandler } from "@/src/services/usermanagement/user.goups.service";

const groupHandler = GroupHandler();

describe("test  groups ", () => {
    describe.skip("given Id fetch group ", () => {
        it("it should fetch group", async () => {
            const mockName = "group 3";

            const group = await groupHandler.fetchGroupByName(mockName);
            console.log(group);

            expect(group).toHaveProperty("name");
            expect(group.name).toBe(mockName);
        });
    });
    //fetch all groups
    describe.skip("fetch all groups", () => {
        it("it should fetch all groups", async () => {
            const groups = await groupHandler.fetchAllGroups();
            console.log(groups);

            expect(groups.some((group) => group.name === "group 1"));

        });
    });
    //fetch all user groups
    describe.skip("fetch all user groups", () => {
        it("it should fetch all user groups", async () => {
            const userGroups = await groupHandler.fetchAllUserGroups();
            console.log(userGroups);

            expect(userGroups.some((userGroup) => userGroup.groupId === 1));

        });
    });

    //add user group
    describe.skip("add user group", () => {
        it("it should add user group", async () => {
            const mockUserGroup = {
                permission: ["CREATE ACCOUNT"],
                description: "test",
                joinedOn: new Date(),
            };
            const userGroup = await groupHandler.addUserGroup(mockUserGroup);
            console.log(userGroup);

            expect(userGroup).toHaveProperty("groupId");
            expect(userGroup.description).toBe(mockUserGroup.description);
        });
    });
    //add group
    describe.skip("add group", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("should add group", async () => {
            try {
                // Generate a unique group name using a timestamp
                //const uniqueGroupName = `group_${Date.now()}`;
    
                const mockGroup = {
                    name: "group 50",
                    description: "test",
                    groupStatus: "ACTIVE",
                    permission: ["CREATE ACCOUNT"],
                };
    
                // Add a log statement to help debug the test
                //console.log(`Test is using group name: ${uniqueGroupName}`);
    
                const group = await groupHandler.addGroup(mockGroup);
    
                expect(group).toHaveProperty("name", mockGroup.name);
            } catch (error) {
                console.error("Error:", error);
                throw error;
            }
        });
    });
    
    //fetch group by name
    describe.skip("fetch group by name", () => {
        it("it should fetch group by name", async () => {
            const mockName = "group 31";

            const group = await groupHandler.fetchGroupByName(mockName);
            console.log(group);

            expect(group).toHaveProperty("name");
            expect(group.name).toBe(mockName);
        });
    });
    //delete group by name
    describe.skip("delete group by name", () => {
        it("it should delete group by name", async () => {
            const mockName = "group 34";

            const group = await groupHandler.deleteGroup(mockName);
            console.log(group);
          


        });
    });
    //delete user group by group id
    describe.skip("delete user group by group id", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("it should delete user group by group id", async () => {
            const mockGroupId = 9;

            const userGroup = await groupHandler.deleteUserGroup(mockGroupId);
            console.log(userGroup);
            

          
        });
    });
    //update  group by name
    describe.skip("update group by name", () => {
        it("it should update group by name", async () => {
            const mockName = "group 21";
            const mockGroupStatus = "INACTIVE";
            const mockGroup = {
                groupStatus:mockGroupStatus
            };

            const group = await groupHandler.updateGroup(mockName, mockGroup);
            console.log(group);
            expect(group).toHaveProperty("name");
            expect(group.name).toBe(mockName);
        });
    });

});