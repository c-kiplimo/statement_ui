"use client";

import { CloseOutlined } from "@ant-design/icons";
import { useTokens } from "@/src/app/(context)/ColorContext";

const Modal = ({ isOpen, title = "My Modal", onDismiss, children }: any) => {
  const token = useTokens();
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed w-screen h-screen bg-black bg-opacity-40 top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center"
      onClick={onDismiss}
    >
      <div
        style={{ bottom: "10%" }}
        className="min-w-[400px] max-w-full overflow-x-hidden min-h-[250px] bg-white items-center justify-center rounded-md p-7 flex flex-col relative bottom-60  left-40 "
        onClick={(event) => event.stopPropagation()}
      >
        <CloseOutlined
          className="absolute right-4 top-8 text-md text-red-600 cursor-pointer"
          onClick={onDismiss}
        />
        <div className="w-fulltext-center h-10 flex items-center mb-1">
          <h1
            style={{ color: token.text.secondary }}
            className="text-md font-medium"
          >
            {title}
          </h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
