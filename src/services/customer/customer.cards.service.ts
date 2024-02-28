import { CARDS_URL } from "@/src/constants/environment";
import axios from "axios";

const CardsHandler = () => {
  const fetchCards = async (
    customerId: number
  ): Promise<Card[]> => {
    const customerCardsUrl = `${CARDS_URL}/${customerId}`;

    try {
      const response = await axios
        .get<Card[]>(customerCardsUrl, {
          headers: {
            "X-RequestId": "3456778909",
          },
        })
        .then((res) => {
          let apiResponse = res.data;

          if (apiResponse) {
            let apiRes = apiResponse;
            let customerCards: Card[] = [...apiRes];
            return customerCards;
          } else {
            throw new Error(apiResponse);
          }
        });

      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    fetchCards,
  };
};
export { CardsHandler };