import React from "react";
import ContactsDetailsCard from "../../widgets/use-contact-details/user.contactdetails";

const ContactsDetails = () => {
  return (
    <div>
      <ContactsDetailsCard
        name={"Daniel Njoroge"}
        idNumber={"67898989"}
        dateOfBirth={"09-09-2029"}
        country={"Kenya"}
        street={"Kimathi Street"}
        cityName={"Nairobi City"}
        postalCode={"00100"}
        emailaddress={"dan@gmail.com"}
      />
    </div>
  );
};

export default ContactsDetails;
