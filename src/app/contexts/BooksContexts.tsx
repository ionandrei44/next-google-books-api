"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { VolumeInfo } from "../utils/interfaces";
import { query } from "../utils/constants";

type ReadingListContextType = {
  bookList: VolumeInfo[];
  readingList: VolumeInfo[];
  addToReadingList: (book: VolumeInfo) => void;
  removeFromReadingList: (bookId: string) => void;
  fetchBooks: () => Promise<void>;
  isLoading: boolean;
};

const BooksContext = createContext<ReadingListContextType | null>(null);

export function useBooks() {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error("useReadingList must be used within a ReadingListProvider");
  }
  return context;
}

type BooksProviderProps = {
  children: ReactNode;
};

export function BooksProvider({ children }: BooksProviderProps) {
  const [readingList, setReadingList] = useState<VolumeInfo[]>([]);
  const [bookList, setBookLists] = useState<VolumeInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const addToReadingList = (book: VolumeInfo) => {
    setReadingList([...readingList, book]);
    localStorage.setItem("readingList", JSON.stringify([...readingList, book]));
  };

  const removeFromReadingList = (bookId: string) => {
    const updatedReadingList = readingList.filter((book) => book.id !== bookId);

    setReadingList(updatedReadingList);
    localStorage.setItem("readingList", JSON.stringify(updatedReadingList));
  };

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const booksData = await response.json();

      const volumeInfoArray: VolumeInfo[] = booksData.items
        .slice(0, 5)
        .map((item: any) => ({ ...item.volumeInfo, id: item.id }));

      setBookLists(volumeInfoArray);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const storedReadingListJSON = localStorage.getItem("readingList");

    if (storedReadingListJSON) {
      const storedReadingList: VolumeInfo[] = JSON.parse(storedReadingListJSON);
      setReadingList(storedReadingList);
    }
  }, []);

  return (
    <BooksContext.Provider
      value={{
        readingList,
        addToReadingList,
        removeFromReadingList,
        bookList,
        fetchBooks,
        isLoading,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
