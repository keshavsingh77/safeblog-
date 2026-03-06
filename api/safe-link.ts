export default async function handler(req: any, res: any) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url, movie, bot_token } = req.body;

    // Basic validation
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Optional bot token validation (you can add your bot token here)
    // const VALID_BOT_TOKEN = 'your-bot-token-here';
    // if (bot_token !== VALID_BOT_TOKEN) {
    //   return res.status(401).json({ error: 'Invalid bot token' });
    // }

    // Generate random 6-character short code
    const shortCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log(`🎲 Generated short code: ${shortCode}`);

    // Encode original URL to Base64 for transmission
    const encodedUrl = Buffer.from(url).toString('base64');
    console.log(`🔐 Encoded original URL: ${encodedUrl}`);

    // Create verify URL that will show verification overlay
    const verifyUrl = `/#/verify/${encodedUrl}`;
    console.log(`✅ Verify URL: ${verifyUrl}`);

    // Determine base URL
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.VITE_SITE_URL 
      ? process.env.VITE_SITE_URL
      : 'http://localhost:5173';

    // Create short link (will be handled by dynamic route)
    const safeLink = `${baseUrl}/${shortCode}`;

    // Response
    res.status(200).json({
      success: true,
      safe_link: safeLink,
      short_code: shortCode,
      verify_url: verifyUrl,
      encoded_url: encodedUrl,
      original_url: url,
      movie: movie || 'Unknown Movie',
      message: 'Safe link generated successfully',
      flow: {
        step1: 'User clicks:  ' + safeLink,
        step2: 'Website routes: /:' + shortCode,
        step3: 'Redirects to: ' + verifyUrl,
        step4: 'Shows verification overlay',
        step5: 'Redirects to original URL after verification'
      },
      features: {
        timer: true,
        robot_verification: true,
        multi_page: false,
        ad_integration: true
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to generate safe link'
    });
  }
}