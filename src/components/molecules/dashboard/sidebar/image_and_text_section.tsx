import React from "react";
import Image from "next/image";

const ImageAndTextSection = ({ expanded }: { expanded: boolean }) => {
  return (
    <>
      {expanded && (
        <div className={`p-6 text-white pt-5 pb-16 flex items-center gap-1`}>
          <div className={`w-20 transition-all opacity-transition`}>
            <Image width={80} height={114} src="/simba.png" alt="img" />
          </div>
          <h1
            style={{
              fontSize: "12px",
              color: "white",
              lineHeight: 1.7,
              marginLeft: "20px",
            }}
            className={`overflow-hidden transition-all opacity-transition ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            <span className="text-grey">simba</span>
            <span>PORTAL</span>
          </h1>
        </div>
      )}
    </>
  );
};

export default ImageAndTextSection;
