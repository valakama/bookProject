import { useState } from "react";
import type { BookState } from "../types/book";
import ActionButton from "./ActionButton";
import PopUpInput from "./PopUpInput";
import { useLibrary } from "../hooks/useLibrary";

const Library = ({
  onSelectBook,
}: {
  onSelectBook: (book: BookState) => void;
}) => {
  const { books, addBook } = useLibrary();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");
  const handleAddBook = () => {
    if (newBookTitle.trim() === "") return;
    addBook(newBookTitle);
    setNewBookTitle("");
    setIsPopupOpen(false);
  }
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          📚 My Book Library
        </h1>
        {
          isPopupOpen && (
            <PopUpInput
              title="Ajouter un livre"
              defaultValue={newBookTitle}
              placeholder="Titre du livre"
              onValidate={((title) => {
                setNewBookTitle(title);
                handleAddBook();
              }
              )}
              onClose={() => setIsPopupOpen(false)}
            />
          )
        }
        <ActionButton
          onClick={handleOpenPopup}
          className="mb-6"
          label="Ajouter un livre"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="cursor-pointer rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100 group"
            >
              <h2 className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h2>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Aucun livre pour le moment. Ajoutez-en un pour commencer !
          </p>
        )}
      </div>
    </div>
  );
};

export default Library;
