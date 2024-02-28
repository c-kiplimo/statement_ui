import InfoCard, {
  CardData,
} from "@/src/components/atoms/cards/customerinfo/infoCard";

const UserPersonalDetails = (props: { borderColer: string }) => {
  const cardData: CardData = [
    [
      {
        title: "Customer Number",
        description: "348392",
      },
      {
        title: "Customer Name",
        description: "Motus tech",
      },
      {
        title: "Customer Name",
        description: "Motus tech",
      },
    ],

    [
      {
        title: "Segment",
        description: "Corporate",
      },
      {
        title: "Customer Name",
        description: "16226252254",
      },
      {
        title: "Id Number",
        description: "12327",
      },
    ],
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "48px",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <InfoCard
        title="Customer Details"
        borderColor={props.borderColer}
        cardData={cardData}
      />
      <InfoCard
        title="Physical Address"
        borderColor={props.borderColer}
        cardData={cardData}
      />
    </div>
  );
};

export default UserPersonalDetails;
