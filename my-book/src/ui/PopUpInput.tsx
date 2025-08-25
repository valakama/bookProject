import { useState } from "react";
import ActionButton from "./ActionButton";
import CloseButton from "./CloseButton";

const PopUpInput = ({
  title,
  defaultValue,
  placeholder = "",
  type = "text",
  onClose,
  onValidate,
}: {
  title: string;
  defaultValue: string;
  placeholder?: string;
  type?: "text" | "number";
  onClose?: () => void;
  onValidate?: (value: string) => void;
}) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="
          relative w-full max-w-sm mx-4
          rounded-2xl bg-white shadow-xl ring-1 ring-black/5
          p-6
          animate-[fadeIn_.2s_ease-out]
        "
      >
        <div className="absolute right-3 top-3">
          <CloseButton onClose={onClose || (() => {})} />
        </div>

        <label
          className="block text-sm font-medium text-gray-700 mb-2"
          htmlFor={title}
        >
          {title}
        </label>

        <input
          id={title}
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="
            w-full rounded-lg border border-gray-300
            px-3 py-2 text-sm
            shadow-sm
            placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition
          "
        />

        {/* Action */}
        <ActionButton
          label="Validate"
          onClick={() => {
            if (onValidate) onValidate(value);
          }}
          textColor="text-white"
          backgroundColor="bg-blue-600"
          hoverColor="bg-blue-700"
          className="mt-4 w-full py-2 rounded-lg shadow"
        />
      </div>
    </div>
  );
};

export default PopUpInput;
