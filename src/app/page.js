import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <h1>Jai Shree Ram</h1>
      <Link className="bg-green-300 px-4 py-2" href={"/profile"}>
        Interests
      </Link>
    </div>
  );
}
