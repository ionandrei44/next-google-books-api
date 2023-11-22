import Link from "next/link";

const Navigation = () => {
  return (
    <div className="max-w-5xl mx-auto p-3 flex justify-center gap-3">
      <Link href="/">Book List</Link>
      <Link href="/reading-list">Reading List</Link>
    </div>
  );
};

export default Navigation;
