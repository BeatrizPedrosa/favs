"use client";

import { useEffect, useState } from "react";

export default function SpotifyPlaylistPage() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      localStorage.setItem("spotify_token", token);
      const cleanUrl = url.origin + url.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }
  }, []);

  const criarPlaylist = async () => {
    setStatus("Criando playlist...");

    const token = localStorage.getItem("spotify_token");

    if (!token) {
      setStatus("Token não encontrado.");
      return;
    }

    const res = await fetch("/api/spotify/playlist-curtidas", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus(`Erro: ${data.error}`);
    } else {
      setStatus(`Playlist criada com sucesso! ID: ${data.playlistId}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        Criar Playlist com Músicas Curtidas
      </h1>
      <button
        onClick={criarPlaylist}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Criar Playlist
      </button>
      <p className="mt-4">{status}</p>
    </div>
  );
}
