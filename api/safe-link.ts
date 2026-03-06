import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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

    // Generate safe redirect URL
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:5173';

    // Create safe link with the original URL as parameter
    const safeLink = `${baseUrl}?s=${encodeURIComponent(url)}`;

    // Response
    res.status(200).json({
      success: true,
      safe_link: safeLink,
      original_url: url,
      movie: movie || 'Unknown Movie',
      message: 'Safe link generated successfully',
      features: {
        timer: true,
        robot_verification: true,
        multi_page: true,
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