"use client";

import { useEffect } from "react";
import { useBooks } from "./contexts/BooksContexts";
import BookCard from "./components/BookCard";

export default function Home() {
  const { bookList, fetchBooks, addToReadingList, isLoading } = useBooks();

  useEffect(() => {
    fetchBooks();
  }, []);

  if (isLoading)
    return (
      <div className="p-5 flex justify-center">
        <h1 className="text-lg">Loading...</h1>
      </div>
    );

  return (
    <div className="p-5 flex flex-col items-center">
      <h1 className="mb-4 text-lg">Book List</h1>

      <div className="flex flex-col gap-3">
        {bookList.map((book) => (
          <BookCard
            type="add"
            key={book.id}
            id={book.id}
            title={book.title || ""}
            authors={book.authors || []}
            publisher={book.publisher || ""}
            btnText="Add Book"
            onClick={() => {
              addToReadingList(book);
              alert("The book has been added to your reading list!");
            }}
          />
        ))}
      </div>
    </div>
  );
}
