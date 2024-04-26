import { log } from "console";
import Cards from "../components/atoms/cards";
import getCardByCardNumber from "../services/account/account";

export const customerCardDetailsAction =  async (cardnumber: string): Promise<Card[]> => {
     const cardData = await getCardByCardNumber(cardnumber);    

    let cardDetails:Card[] =  cardData.map((data)=>({
        cardHolderName: data.cardHolderName,
        cardType: data.cardType,
        cardLimit:data.cardLimit,
        cardNumber: data.cardNumber,
        customerId : data.customerId,
        cardIssueDate :data.cardIssueDate,
        cardExpiryDate : data.cardExpiryDate,
        cardBalance:data.cardBalance,
        cardStatus:data.cardStatus
      }
      ));      
      return cardDetails
}


export const CardTransactions = async (cardnumber: string): Promise<cardTransactions[]>=>{
    let cardTransactions:cardTransactions={
        id: 123,
        amount: '23,000',
        title: 'Spotify',
        date:' 21, Jan, 2021',
        description: 'Bank Deposit . Fill Account',
    }


    return [cardTransactions];
}