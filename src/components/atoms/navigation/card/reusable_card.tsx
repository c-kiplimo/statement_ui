import React from 'react';
const Card = ({ title, children }: any) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;
