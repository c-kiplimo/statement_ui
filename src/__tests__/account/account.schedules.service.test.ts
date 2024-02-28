import { AccountSchedulesHandler } from "@/src/services/account/account.schedules.service";

const accountSchedulesHandler = AccountSchedulesHandler();


describe.skip("test fetch account schedules ", () => {
   
    describe.skip("given accountId ", () => {
        it("it should fetch acccount schedules", async () => {


            const mockAccountId = "1026272611";


            const schedules = await accountSchedulesHandler.fetchAccountSchedules(mockAccountId);
            
            
            expect(schedules).toHaveProperty('accountId');
            expect(schedules.accountId).toBe(mockAccountId);
            console.log(schedules);
        });
    });
    //create account schedule
    describe("given account schedule details ", () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        it("it should create acccount schedules", async () => {
           
           const mockAccountId = "10245ree75567";
            const mockFrequency = "WEEKLY";
            const mockTemplate = "SWIFT";
            const mockStartTime = "2021-12-28T12:00:00"
           
            const mockAccountScedules={
                accountId: mockAccountId,
                frequency: mockFrequency,
                template: mockTemplate,
                startTime: new Date(mockStartTime), 
            }
            
            const schedule = await accountSchedulesHandler.createAccountSchedules(mockAccountScedules);
            
            expect(schedule).toHaveProperty('accountId');
            expect(schedule.accountId).toBe(mockAccountScedules.accountId);
            console.log(schedule);
        });
    });
    

        describe.skip("given account schedule details ", () => {
             it("it should delete acccount schedules", async () => {
                    const mockAccountId = "10262726124";
                const schedule = await accountSchedulesHandler.deleteAccountSchedule(mockAccountId);
           console.log(schedule);
            
            });
            });

//update account schedule
describe.skip("given account schedule details", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it("it should update account schedules", async () => {
        try {
            const mockAccountId = "102627225";
            const mockFrequency = "DAILY";

            const mockAccountSchedules = {
                frequency: mockFrequency
            }

            console.log("Making update request...");
            const updatedSchedule = await accountSchedulesHandler.updateAccountSchedule(mockAccountId, mockAccountSchedules);

            console.log("Update request successful.");
            expect(updatedSchedule).toHaveProperty('frequency', mockFrequency);

            console.log(updatedSchedule);
        } catch (error) {
            console.error("Update request failed:", error);
            throw error;
        }
    });
});


});





