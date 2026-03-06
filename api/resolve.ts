export default async function handler(req: any, res: any) {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Code parameter required', success: false });
    }

    console.log('🔍 Resolving SafeLink code:', code);

    // For demo: Generate verify URL from code
    // In production, you'd look this up in MongoDB
    
    // Decode code (if it's encoded) or use it as-is
    let verifyUrl = '';
    
    try {
      // Try base64 decode
      const decoded = Buffer.from(code, 'base64').toString('utf-8');
      if (decoded.includes('http') || decoded.includes('verify')) {
        verifyUrl = decoded;
      } else {
        verifyUrl = `/#/verify/${code}`;
      }
    } catch (e) {
      // Not base64, use as-is
      verifyUrl = `/#/verify/${code}`;
    }

    console.log('✅ SafeLink found, verify URL:', verifyUrl);

    return res.status(200).json({
      success: true,
      code,
      verify_url: verifyUrl,
      message: 'SafeLink resolved successfully'
    });

  } catch (error) {
    console.error('❌ Error in resolve API:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
}