import ActionButton from "./ActionButton";
import CloseButton from "./CloseButton";

type Props = {
  onAddImagePage: () => void;
  onAddTextPage: () => void;
  onClose: () => void;
};

const PopupAddPage = ({ onAddImagePage, onAddTextPage, onClose }: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-page-title"
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <button
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        aria-label="Close modal"
        onClick={onClose}
      />

      <div
        className="
          relative mx-4 w-full max-w-sm
          rounded-2xl bg-white shadow-xl ring-1 ring-black/5
          p-6
          transition-all duration-200 ease-out
          animate-[fadeIn_.15s_ease-out] motion-reduce:animate-none
        "
      >
        <div className="absolute right-3 top-3">
          <CloseButton onClose={onClose} />
        </div>

        <h2
          id="add-page-title"
          className="text-lg font-semibold text-gray-800 tracking-tight"
        >
          Add a new page
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose what you want to insert into your book.
        </p>

        <div className="mt-6 grid gap-3">
          <ActionButton
            label="Add Text Page"
            onClick={onAddTextPage}
            textColor="text-white"
            backgroundColor="bg-gray-900"
            hoverColor="hover:bg-black"
            className="w-full py-2 rounded-xl shadow"
          />

          <ActionButton
            label="Add Image Page"
            onClick={onAddImagePage}
            textColor="text-gray-800"
            backgroundColor="bg-white"
            hoverColor="hover:bg-gray-50"
            className="w-full py-2 rounded-xl shadow-sm ring-1 ring-inset ring-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default PopupAddPage;
