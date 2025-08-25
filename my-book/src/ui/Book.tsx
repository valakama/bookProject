import type { BookState } from "../types/book";
import { useBook } from "../hooks/useBooks";
import PopupAddPage from "./PopupAddPage";
import ActionButton from "./ActionButton";
import PopUpInput from "./PopUpInput";
import { useState } from "react";
import Page from "./Page";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

const Book = ({ initialBook, onBack }: { initialBook: BookState; onBack: () => void }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const {
    book,
    page,
    canPrev,
    canNext,
    prev,
    next,
    addPage,
    updateCurrentPageContent,
  } = useBook(initialBook, { persistKey: `book:${initialBook.id}` });

  const handleNext = () => canNext && next();
  const handlePrevious = () => canPrev && prev();

  const HandleAddPage = (content: string, contentType: "text" | "image") => {
    addPage(content, contentType);
    setIsPopupOpen(false);
    setIsUpdatePopupOpen(true);
  }

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col">
      {isPopupOpen && (
        <PopupAddPage
          onAddImagePage={() => HandleAddPage("", "image")}
          onAddTextPage={() => HandleAddPage("", "text")}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
      {
        isUpdatePopupOpen && (
          <PopUpInput
            title="Update Page Content"
            defaultValue={page.content}
            placeholder="Enter new content"
            onValidate={(content) => {
              updateCurrentPageContent(content);
              setIsUpdatePopupOpen(false);
            }}
            onClose={() => setIsUpdatePopupOpen(false)}
          />
        )
      }

      <TopBar
        title={book.title}
        onBack={onBack}
      >
          <ActionButton
            label="Add Page"
            onClick={() => setIsPopupOpen(true)}
            className="bg-blue-500 text-white hover:bg-blue-600"
          />
          <ActionButton
            label="Update Page"
            onClick={() => setIsUpdatePopupOpen(true)}
            disabled={!page}
            className="bg-green-500 text-white hover:bg-green-600"
          />
        </TopBar>

          {book.pages.length > 0 ? (
            <Page page={page} />
          ) : (
            <p className="text-center text-gray-400 italic p-48">
              No pages available.
            </p>
          )}
      <BottomBar
        currentPage={book.currentPage}
        pageLength={book.pages.length}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        canPrev={canPrev}
        canNext={canNext}
      />
    </div>
  );
};

export default Book;
