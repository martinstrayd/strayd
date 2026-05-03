import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/albums/4ZfgXJa22P6r6toOQURyvs",
      {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
        }
      }
    );

    const data = await response.json();

    // 👇 This is the guard + safe access block
    if (data.error) {
      return res.status(data.error.status).json({ error: data.error.message });
    }

    const total = data?.tracks?.items?.length || 0;
    res.status(200).json({ total, tracks: data?.tracks?.items });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
