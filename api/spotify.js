import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    // Call Spotify API for your album
    const response = await fetch(
      "https://api.spotify.com/v1/albums/4ZfgXJa22P6r6toOQURyvs",
      {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
        }
      }
    );

    // Parse JSON
    const data = await response.json();

    // If Spotify returned an error, return it cleanly
    if (data.error) {
      return res.status(data.error.status).json({ error: data.error.message });
    }

    // Safely count tracks
    const total = data?.tracks?.items?.length || 0;

    // Return track count + track list
    res.status(200).json({ total, tracks: data?.tracks?.items });
  } catch (error) {
    // Catch any runtime errors
    res.status(500).json({ error: error.message });
  }
}
