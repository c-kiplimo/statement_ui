"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import SelectionCard from "@/src/components/widgets/card-info/card-info-radio";
import RadioButton from "@/src/components/atoms/radio/radioButton";

const Dev = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const handleOptionChange = (e: any) => {
    const newValue = e.target.value;
    setSelectedOption((prevValue) => (prevValue === newValue ? "" : newValue));
  };

  const cardIcon = (
    <svg
      width="41"
      height="26"
      viewBox="0 0 41 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="0.75"
        width="39.5"
        height="24.5"
        rx="3.75"
        stroke="#E6E6E6"
        strokeWidth="0.5"
      />
      <path
        d="M27.1043 8.86865C26.4536 8.61996 25.7658 8.49516 25.0733 8.50014C22.8336 8.50014 21.2518 9.68348 21.2406 11.3822C21.2266 12.6301 22.3647 13.3333 23.2255 13.7503C24.1088 14.179 24.4042 14.4492 24.4014 14.8323C24.3958 15.4152 23.6959 15.6795 23.045 15.6795C22.1505 15.6795 21.662 15.5488 20.9103 15.2214L20.6317 15.0849L20.314 17.0405C20.8585 17.2783 21.8397 17.4824 22.8532 17.5C25.2342 17.5 26.7908 16.324 26.809 14.5167C26.8286 13.5198 26.2127 12.7666 24.9165 12.1441C24.1284 11.7404 23.6399 11.4702 23.6399 11.0606C23.6399 10.698 24.0584 10.3104 24.9333 10.3104C25.5155 10.2956 26.0942 10.4102 26.6312 10.6466L26.8412 10.745L27.1589 8.85544L27.1043 8.86865ZM32.9163 8.6587H31.1665C30.622 8.6587 30.2119 8.8158 29.9739 9.38251L26.6088 17.3781H28.9899L29.4658 16.0671L32.3718 16.07C32.4403 16.3769 32.6503 17.3781 32.6503 17.3781H34.75L32.9163 8.6587ZM18.0197 8.5853H20.2888L18.8694 17.3091H16.6031L18.0197 8.58236V8.5853ZM12.2596 13.3935L12.4947 14.6048L14.712 8.6587H17.1154L13.5446 17.3664H11.1467L9.18703 9.99327C9.15529 9.87169 9.08075 9.76728 8.97847 9.7011C8.27213 9.31841 7.52373 9.02799 6.75 8.83635L6.7808 8.65283H10.4328C10.9284 8.67339 11.3273 8.83635 11.4603 9.39132L12.2582 13.3979L12.2596 13.3935ZM30.1167 14.2832L31.021 11.8432C31.0098 11.8696 31.2071 11.3396 31.3219 11.0122L31.4773 11.7653L32.0022 14.2818H30.1153L30.1167 14.2832Z"
        fill="#4272DD"
      />
    </svg>
  );

  return (
    <Fragment>
      <div style={{ marginTop: "10px" }}>
        <SelectionCard
          icon={cardIcon}
          label="Master Card ****4322"
          description="Expires 09/2023"
          name="card-info"
          value={selectedOption}
          onSelection={(event) => {
            console.log(event);
          }}
        />
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);
