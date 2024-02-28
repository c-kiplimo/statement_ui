import { CardsHandler } from "@/src/services/customer/customer.cards.service";

const cardsHandler = CardsHandler();

describe.skip("test fetch cards ", () => {
    describe("given customerId ", () => {
        it("it should fetch customer cards", async () => {
            
            const mockCustomerId = 1;

            const cards = await cardsHandler.fetchCards(mockCustomerId);

            expect(cards.some((card) => card.customerId === mockCustomerId));
        });
    });
});
