export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
      }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Spotify API call failed", details: error.message });
  }
}
