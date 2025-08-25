// App.tsx
import { useState } from "react";
import Library from "./ui/Library";
import Book from "./ui/Book";
import type { BookState } from "./types/book";

const App = () => {
  const [selectedBook, setSelectedBook] = useState<BookState | null>(null);

  return (
    <div className="app">
      {selectedBook ? (
        <Book initialBook={selectedBook} onBack={() => setSelectedBook(null)} />
      ) : (
        <Library onSelectBook={(book) => setSelectedBook(book)}/>
      )}
    </div>
  );
};

export default App;