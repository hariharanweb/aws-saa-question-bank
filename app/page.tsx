'use '
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>AWS Question Bank</h1>
      <Link href="/quiz">Quiz</Link>
    </div>
  );
}
