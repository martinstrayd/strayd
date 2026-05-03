import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query } = req;

  if (query.code) {
    // Exchange code for access token
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: query.code,
        redirect_uri: 'https://www.strayd.com/api/auth'
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  }

  // Redirect user to GitHub OAuth
  const redirect = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=https://www.strayd.com/api/auth`;
  res.redirect(redirect);
}
