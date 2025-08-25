const ActionButton = ({
  label,
  onClick,
  textColor = "text-white",
  backgroundColor = "bg-blue-500",
  hoverColor = "bg-blue-600",
  disabled = false,
  borderColor,
  className = "",
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  textColor?: string;
  backgroundColor?: string;
  hoverColor?: string;
  className?: string;
  borderColor?: string;
}) => {
  return (
    <button
      className={`${backgroundColor} ${textColor} px-4 py-2 rounded hover:${hoverColor} disabled:bg-gray-400 ${borderColor ? "border" : null } ${borderColor} ${className} transition-colors duration-200 cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
export default ActionButton;