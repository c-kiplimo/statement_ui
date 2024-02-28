
import CardHeaderM1 from "./card.header.m1";
import CardContent from "../../molecules/dashboard/cards/card-content";
import CardHeaderM2 from "./card.header.m2";

export type { CardProps } from './card.header.m1';

export type { CardHeaderM2Props } from './card.header.m2';
export interface CardInterface  {
    CardHeaderM1: typeof CardHeaderM1;
    CardHeaderM2: typeof CardHeaderM2
    CardContent: typeof CardContent;
}

const Cards: CardInterface={
    CardHeaderM1:CardHeaderM1,
    CardHeaderM2:CardHeaderM2,
    CardContent:CardContent
}

export default Cards;