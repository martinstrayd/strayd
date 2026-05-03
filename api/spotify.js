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
      return res.status(response.status).json({
        error: "Spotify API error",
        details: errorText
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Spotify API call failed",
      details: error.message
    });
  }
}
