import React from "react";
import ActionButton from "./ActionButton";

type BottomBarProps = {
  currentPage: number;
  pageLength: number;
  handlePrevious: () => void;
  handleNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  className?: string;
};

const BottomBar: React.FC<BottomBarProps> = ({
  currentPage,
  pageLength,
  handlePrevious,
  handleNext,
  canPrev,
  canNext,
  className,
}) => {
  return (
    <div
      className={`
        flex items-center justify-center gap-3 md:gap-6 py-4 bg-white shadow-inner
        fixed bottom-0 left-0 right-0 z-30
        ${className ?? ""}
      `}
    >
      <ActionButton
        label="Previous"
        onClick={handlePrevious}
        disabled={!canPrev}
        className="m-0 md:mr-4"
      />
      <span className="text-gray-600 text-xs md:text-lg font-medium">
        Page {currentPage + 1} of {pageLength || 1}
      </span>
      <ActionButton
        label="Next"
        onClick={handleNext}
        disabled={!canNext}
        className="m-0 md:ml-4"
      />
    </div>
  );
};

export default BottomBar;
