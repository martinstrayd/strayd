export default async function handler(req, res) {
  const response = await fetch("https://api.spotify.com/v1/artists/6aRM8IKV2HBUZRGnnDdrM0", {
    headers: {
      Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
    }
  });
  const data = await response.json();
  res.status(200).json({ followers: data.followers.total });
}
