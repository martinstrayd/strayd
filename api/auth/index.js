export default async function handler(req, res) {
  const { query } = req;

  if (query.code) {
    // Exchange code for access token
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: query.code,
        redirect_uri: 'https://www.strayd.com/api/auth'
      })
    });

    const data = await response.json();

    // Redirect back to CMS admin with token in URL fragment
    const redirectUrl = `https://www.strayd.com/cms/admin/cms.html#access_token=${data.access_token}&token_type=${data.token_type}&scope=${data.scope}`;
    return res.redirect(redirectUrl);
  }

  // Initial step: send user to GitHub OAuth
  const redirect = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=repo,user&redirect_uri=https://www.strayd.com/api/auth`;
  res.redirect(redirect);
}
 
 
