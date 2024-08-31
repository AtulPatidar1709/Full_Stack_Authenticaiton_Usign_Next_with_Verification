import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-[50vh] justify-center items-center">
      <Link className="bg-green-300 px-4 py-2" href={"/profile"}>
        Interests
      </Link>
    </div>
  );
}
