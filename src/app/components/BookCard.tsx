import { FC } from "react";
import { useBooks } from "../contexts/BooksContexts";

interface BookCardProps {
  type: "add" | "remove";
  id: string;
  title: string;
  authors: string[];
  publisher: string;
  btnText: string;
  onClick: () => void;
}

const buttonStyles = `mt-4 flex-1 rounded-lg block mx-auto py-2 px-4`;
const disabledStyles = `bg-gray-400 text-gray-600 cursor-not-allowed`;

const BookCard: FC<BookCardProps> = ({
  type,
  id,
  title,
  authors,
  publisher,
  btnText,
  onClick,
}) => {
  const { readingList } = useBooks();

  const isBookAdded = readingList.find((book) => book.id === id);

  const disableAddBtn = type === "add" && !!isBookAdded;

  return (
    <div className="p-3 border rounded-lg cursor-pointer w-[450px] max-w-full">
      <p>
        <strong>Title:</strong> {title}
      </p>
      <p>
        <strong>{(authors?.length || 0) > 1 ? "Authors:" : "Author:"} </strong>
        {authors?.map((author, i) =>
          i === (authors?.length || 0) - 1 ? author : `${author}, `
        )}
      </p>
      <p>
        <strong>Publisher: </strong>
        {publisher || ""}
      </p>
      <button
        disabled={disableAddBtn}
        className={`${
          disableAddBtn
            ? `${buttonStyles} ${disabledStyles}`
            : `${buttonStyles} bg-blue-500 hover:bg-blue-700 text-white font-bold`
        }`}
        onClick={onClick}
      >
        {btnText}
      </button>
    </div>
  );
};

export default BookCard;
