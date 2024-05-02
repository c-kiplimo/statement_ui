import { log } from "console";
import Cards from "../components/atoms/cards";
import getCardByCardNumber from "../services/account/account";
import { CardDetailsData } from "../app/statement/(protected)/dashboard/accounts/singleCard/[id]/page";

export const customerCardDetailsAction =  async (cardnumber: string):Promise<CardDetailsData> => {
     const cardData = await getCardByCardNumber(cardnumber);  

    let cardDetails:CardDetailsData ={
        cardName: cardData.cardDTO.cardType,
        cardType: cardData.cardDTO.cardType,
        cardNumber: cardData.cardDTO.cardNumber,
        cardLimit: parseInt(cardData.cardDTO.cardLimit),
        issueDate: cardData.cardDTO.cardIssueDate,
        expiryDate: cardData.cardDTO.cardExpiryDate,
        custName: cardData.cardDTO.cardHolderName
    }   
    return cardDetails
}
export const CardTransactions = async (cardnumber: string): Promise<cardTransactions[]>=>{
    const cardData = await getCardByCardNumber(cardnumber);  
    let cardTransactions:cardTransactions[] = cardData.fundsTransferDTOS.map(data=>({
        id: data.transactionId,
        amount: data.lcyAmount,
        title: data.creditAccount,
        date: data.processingDate,
        description: data.paymentDetails,
    }))
  
    return cardTransactions;
    
}