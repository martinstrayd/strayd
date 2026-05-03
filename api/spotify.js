import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/albums/4ZfgXJa22P6r6toOQURyvs", // example album
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

    // Return the raw JSON so you can see the structure
    res.status(200).json(data);

    // Once you confirm the shape, you can safely access:
    // const total = data?.tracks?.items?.length || 0;
    // res.status(200).json({ total, tracks: data?.tracks?.items });
  } catch (error) {
    res.status(500).json({
      error: "Spotify API call failed",
      details: error.message
    });
  }
}
