# Add this import at the top of your utils.py file
import aiohttp
import json
from typing import Optional

# Your Safe Redirect API endpoint
SAFE_REDIRECT_API = "https://safeblog-.vercel.app/api/safe-link"

# Replace your existing get_shortlink function with this:
async def get_shortlink(link: str, grp_id: int) -> str:
    """
    Generate safe redirect link using custom API instead of external shorteners

    Features:
    - 10-second timer countdown
    - Robot verification
    - Multi-page redirect (configurable)
    - Ad integration ready
    """
    try:
        # Extract movie name from your bot's context (you can modify this)
        movie_name = "Movie"  # Replace with actual movie name from your bot

        async with aiohttp.ClientSession() as session:
            payload = {
                "url": link,
                "movie": movie_name
            }

            async with session.post(SAFE_REDIRECT_API, json=payload) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success"):
                        safe_link = data["safe_link"]
                        print(f"✅ Safe link generated: {safe_link}")
                        return safe_link
                    else:
                        error_msg = data.get('error', 'Unknown error')
                        print(f"❌ Safe link API error: {error_msg}")
                else:
                    print(f"❌ Safe link API HTTP error: {response.status}")

    except Exception as e:
        print(f"❌ Safe link generation failed: {e}")

    # Fallback: Return original link if API fails
    print("⚠️ Using fallback: Original link")
    return link

# Optional: Enhanced version with movie name extraction
async def get_shortlink_with_movie_name(link: str, grp_id: int, movie_name: str = None) -> str:
    """
    Enhanced version that accepts movie name parameter
    """
    try:
        async with aiohttp.ClientSession() as session:
            payload = {
                "url": link,
                "movie": movie_name or "Movie"
            }

            async with session.post(SAFE_REDIRECT_API, json=payload) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success"):
                        return data["safe_link"]

    except Exception as e:
        pass

    return link

# Test function (you can remove this after testing)
async def test_safe_link():
    """Test the safe link generation"""
    test_url = "https://example.com/movie.mp4"
    safe_link = await get_shortlink(test_url, 0)
    print(f"Test Result: {safe_link}")
    return safe_link

# Uncomment to test:
# asyncio.run(test_safe_link())