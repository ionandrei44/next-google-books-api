"use client";

import { useBooks } from "../contexts/BooksContexts";
import BookCard from "../components/BookCard";

export default function Home() {
  const { readingList, removeFromReadingList } = useBooks();

  return (
    <div className="p-5 flex flex-col items-center">
      <h1 className="mb-4 text-lg">Reading List</h1>

      <div className="flex flex-col gap-3">
        {readingList.length === 0 && (
          <h1 className="mb-4 text-lg">
            You do not have any books added to your list!
          </h1>
        )}

        {readingList.map((book) => (
          <BookCard
            type="remove"
            key={book.id}
            id={book.id}
            title={book.title || ""}
            authors={book.authors || []}
            publisher={book.publisher || ""}
            btnText="Remove Book"
            onClick={() => {
              removeFromReadingList(book.id);
              alert("The book has been removed from your reading list!");
            }}
          />
        ))}
      </div>
    </div>
  );
}
