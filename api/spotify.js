import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/albums/4ZfgXJa22P6r6toOQURyvs", // Devils Goin Public
      {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Spotify API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();

    // Instead of assuming "total" exists, just return the raw JSON
    res.status(200).json(data);

    // If you want to safely access totals later:
    // const total = data?.tracks?.total || 0;
    // res.status(200).json({ total, data });
  } catch (error) {
    res.status(500).json({
      error: "Spotify API call failed",
      details: error.message
    });
  }
}
