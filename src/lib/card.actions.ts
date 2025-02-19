import { log } from "console";
import Cards from "../components/atoms/cards";
import getCardByCardNumber from "../services/account/account";
import { CardDetailsData } from "../app/statement/(protected)/dashboard/accounts/singleCard/[id]/page";

export const customerCardDetailsAction = async (
  cardnumber: string
): Promise<CardDetailsData> => {
  const cardData = await getCardByCardNumber(cardnumber);

  let cardDetails: CardDetailsData = {
    cardName: cardData.cardDTO.cardType,
    cardType: cardData.cardDTO.cardType,
    cardNumber: cardData.cardDTO.cardNumber,
    cardLimit: parseInt(cardData.cardDTO.cardLimit),
    issueDate: cardData.cardDTO.cardIssueDate.toString().split(" ")[0],
    expiryDate: cardData.cardDTO.cardExpiryDate,
    custName: cardData.cardDTO.cardHolderName,
  };
  return cardDetails;
};
export const CardTransactions = async (
  cardnumber: string
): Promise<cardTransactions[]> => {
  const cardData: Card = await getCardByCardNumber(cardnumber);

  if(cardData === null || undefined){
    return []
  }

  let cardTransactions: cardTransactions[] = cardData.fundsTransferDTOS.map(
    (data) => ({
      id: data.transactionId,
      amount: data.lcyAmount,
      title: data.creditAccount,
      date: data.processingDate.split("T")[0],
      description: data.paymentDetails,
    })
  );

  return cardTransactions;
};
