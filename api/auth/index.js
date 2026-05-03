// File: api/auth.js
export default async function handler(req, res) {
  const { query } = req;

  // If GitHub redirected back with a code, exchange it for a token
  if (query.code) {
    try {
      const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: query.code,
          redirect_uri: "https://www.strayd.com/api/auth"
        })
      });

      const data = await response.json();

      // Return the token JSON back to the CMS frontend
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: "Token exchange failed", details: err.message });
    }
  }

  // Otherwise, redirect user to GitHub OAuth authorize page
  const redirect = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=https://www.strayd.com/api/auth`;
  res.redirect(redirect);
}
