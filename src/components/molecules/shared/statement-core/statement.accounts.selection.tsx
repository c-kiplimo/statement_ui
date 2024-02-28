import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import { useState, useEffect, useRef, ReactNode } from "react";

export const StatementSelectionContainer = ({children}:{children:ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useTokens();
  const font = useFont();

  const containerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative provider-account-select-input"
      style={{
        display: "flex",
        height: "40px",
        paddingTop: "40px",
        paddingBottom: "40px",
        alignItems: "center",
        gap: "32px",
      }}
    >
      
      <div
        className="provider-account-details"
        style={{
          ...font.typography.body?.bold,
        }}
      >
        Provide Account Details
      </div>
          {children}
    </div>
  );
};





export default StatementSelectionContainer;
