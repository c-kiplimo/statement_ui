import { PermissionHandler } from "@/src/services/usermanagement/user.permissions.service";
import axios from "axios";

const permissionHandler = PermissionHandler();
describe.skip("test  permissions ", () => {
    describe.skip("fetch all permissions ", () => {
        it("it should fetch all permissions", async () => {
          
            const permissions = await permissionHandler.fetchAllPermissions();
            console.log(permissions);
            expect(permissions.some((permission) => permission.name === "CREATE ACCOUNT"));
           
        });
    });
    describe.skip("fetch permission by name ", () => {
        it("it should fetch permission by name", async () => {
            const permission_name = "CREATE ACCOUNT";
            const permission = await permissionHandler.fetchPermissionByName(permission_name);
            console.log(permission);
            expect(permission).toHaveProperty('name');
            expect(permission.name).toBe(permission_name);
        });
    })
    describe.skip("fetch all user permissions ", () => {
        it("it should fetch all user permissions", async () => {
            
            const user_permissions = await permissionHandler.fetchAllUserPermissions();
            console.log(user_permissions);
           expect(user_permissions.some((user_permission) => user_permission.permission[0] == "ACCOUNT CREATE"));
        });
    });

    describe.skip("add user permission ", () => {
        it("it should add user permission", async () => {
          const mockUserPermission = {
            userId: 1,
            permission: ["CREATE ACCOUNT"],
          };

            const result = await permissionHandler.addUserPermission(mockUserPermission);
            console.log(result);
            expect(result).toHaveProperty('userId');
        });
    });

});

