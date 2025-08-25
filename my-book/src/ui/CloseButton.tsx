import { X } from 'lucide-react';

const CloseButton: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
      aria-label="Close"
    >
      <X />
    </button>
  );
}

export default CloseButton;