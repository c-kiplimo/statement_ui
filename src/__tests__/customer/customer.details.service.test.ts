import { CustomerDetailsHandler } from "@/src/services/customer/customer.details.service";

const customerDetailsHandler = CustomerDetailsHandler();

describe.skip("test fetch customer details ", () => {
  describe.skip("given onboardingType , value and country ", () => {
    it("it should fetch customer details", async () => {
      const mockOnboardingType = "ACCOUNT_NUMBER";
      const mockValue = "1026272611";
      const mockCountry = "Kenya";

        const customerDetails =
          await customerDetailsHandler.fetchCustomerDetails(
            mockOnboardingType,
            mockValue,
            mockCountry
          );
        expect(customerDetails).toHaveProperty("customerId");
        expect(customerDetails.customerId).toBe(1);
        console.log(customerDetails);
    
      
    });
    describe.skip("given customerId ", () => {
      it("it should fetch customer restrictions", async () => {
        const mockCustomerId = 1;

        const customerRestrictions =
          await customerDetailsHandler.fetchCustomerRestrictions(
            mockCustomerId
          );
        expect(
          customerRestrictions.some(
            (customer) => customer.customerId === mockCustomerId
          )
        ).toBe(true);
        console.log(customerRestrictions);
      });
    });
  });
});
