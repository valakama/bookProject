import React from "react";
import ActionButton from "./ActionButton";

type TopBarProps = {
  title: string;
  onBack: () => void;
  children?: React.ReactNode;
  className?: string;
};

const TopBar: React.FC<TopBarProps> = ({ title, onBack, children, className }) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center sm:justify-between
                  gap-3 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4
                  bg-white shadow-md ${className ?? ""}`}
    >
      {/* <button
        onClick={onBack}
        className="text-blue-600 hover:underline text-sm font-medium cursor-pointer self-start sm:self-auto"
      >
        Back to library
      </button> */}
    <ActionButton
      label="Back to library"
      onClick={onBack}
      textColor="text-blue-600"
      backgroundColor="bg-transparent"
      borderColor="border-blue-600"
      hoverColor="bg-blue-50"
      className="text-sm font-medium self-start sm:self-auto px-2 py-1"
    >
    </ActionButton>

      <h1 className="text-lg sm:text-xl font-semibold text-gray-800 text-center flex-1 truncate">
        {title}
      </h1>

      <div className="flex items-center gap-2 justify-center sm:justify-end flex-wrap">
        {children}
      </div>
    </div>
  );
};

export default TopBar;
