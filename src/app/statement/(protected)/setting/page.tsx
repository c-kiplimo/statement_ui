import { Card } from "antd";
import React from "react";

const Setting = () => {
  return (
    <div className="flex flex-col m-5 h-96 p-5 bg-white space-y-4">
    <Card title="Card 1" content="This is the content for Card 1" />

    <Card title="Card 2" content="This is the content for Card 2" />
  </div>
  );
};

export default Setting;
