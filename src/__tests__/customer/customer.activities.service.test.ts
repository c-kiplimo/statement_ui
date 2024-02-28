import { CustomerActivitiesHandler } from "@/src/services/customer/customer.activity.service";

const customerActivitiesHandler = CustomerActivitiesHandler();



describe.skip("test fetch customer activities ", () => {
    describe("given customerId ", () => {
        it("it should fetch customer activities", async () => {
            
            const mockCustomerId = 1;
            const activities = await customerActivitiesHandler.fetchCustomerActivities(mockCustomerId);


            expect(activities.forEach(entry => entry.customerId === mockCustomerId));

        });
    });
});
