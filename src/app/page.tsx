import Image from "next/image";

export default function Home() {
  return (
    <main className="p-4">
      <a
        href="/api/auth/spotify"
        className="bg-green-600 text-white px-4 py-2 rounded">
          Login com Spotify
        </a>
    </main>
  );
}
