import { NextRequest, NextResponse } from "next/server";
interface SpotifyTrackItem {
  track: {
    uri: string;
    id: string;
  };
}

const caminho = "https://api.spotify.com/v1";

async function getLikedSongs(token: string) {
  let uris: string[] = [];
  let url = `${caminho}/me/tracks?limit=50`;

  while (url) {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Erro ao pegar musicas curtidas.");

    const data: {
      items: SpotifyTrackItem[];
      next: string;
    } = await res.json();

    uris = uris.concat(data.items.map((item) => item.track.uri));
    url = data.next;
  }

  return uris;
}

async function createPlaylist(token: string, userId: string, name: string) {
  const res = await fetch(`${caminho}/users/${userId}/playlists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, public: false }),
  });

  if (!res.ok) throw new Error("Erro ao criar playlist");
  const data = await res.json();
  return data.id;
}

async function addTracksToPlaylist(
  token: string,
  playlistId: string,
  uris: string[],
) {
  const chunkSize = 100;
  for (let i = 0; i < uris.length; i += chunkSize) {
    const chunk = uris.slice(i, i + chunkSize);
    const res = await fetch(`${caminho}/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: chunk }),
    });
    if (!res.ok) throw new Error("Erro ao adicionar faixas");
    return {
      message: "Todas as músicas curtidas foram adicionadas a playlist.",
    };
  }
}

async function removeAllLikedTracks(token: string) {
  let url = `${caminho}/me/tracks?limit=50`;
  const trackUris: string[] = [];

  while (url) {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error("Erro ao buscas músicas curtidas");

    const data: {
      items: SpotifyTrackItem[];
      next: string;
    } = await res.json();

    const batch = data.items.map((item) => item.track.id);
    trackUris.push(...batch);

    url = data.next;
  }

  for (let i = 0; i < trackUris.length; i += 50) {
    const chunk = trackUris.slice(i, i + 50);
    const res = await fetch(`${caminho}/me/tracks`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: chunk }),
    });

    if (!res.ok) throw new Error("Erro ao remover música curtidas");
  }

  return { message: "Todas as músicas curtidas foram removidas." };
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token)
      return NextResponse.json({ error: "Token não enviado" }, { status: 401 });

    const userRes = await fetch(`${caminho}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!userRes.ok)
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    const userData = await userRes.json();

    const uris = await getLikedSongs(token);

    if (uris.length === 0) {
      return NextResponse.json(
        { error: "Nenhuma música curtida encontrada" },
        { status: 400 },
      );
    }

    const dataHoje = new Date().toISOString().split("T")[0];
    const nomePlaylist = `Curtidas ${dataHoje}`;

    const playlistId = await createPlaylist(token, userData.id, nomePlaylist);

    await addTracksToPlaylist(token, playlistId, uris);
    await removeAllLikedTracks(token);

    return NextResponse.json({
      message: "Playlist criada e músicas curtidas removidas",
      playlistId,
    });
  } catch (err) {
    if (err instanceof Error)
      return NextResponse.json({ error: err.message }, { status: 500 });
    NextResponse.json({ error: "Erro desconhcido" }, { status: 500 });
  }
}
