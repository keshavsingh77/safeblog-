import aiohttp
import json
from typing import Optional

# Your Safe Redirect API endpoint
SAFE_REDIRECT_API = "https://safeblog-.vercel.app/api/safe-link"

async def get_safe_link(original_url: str, movie_name: Optional[str] = None, grp_id: Optional[int] = None) -> str:
    """
    Generate safe redirect link using your custom API instead of external shorteners

    Args:
        original_url: The original movie/file URL
        movie_name: Name of the movie (optional)
        grp_id: Group ID (optional, for future use)

    Returns:
        Safe redirect URL
    """
    try:
        async with aiohttp.ClientSession() as session:
            payload = {
                "url": original_url,
                "movie": movie_name or "Movie"
            }

            async with session.post(SAFE_REDIRECT_API, json=payload) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success"):
                        return data["safe_link"]
                    else:
                        print(f"Safe link API error: {data.get('error', 'Unknown error')}")
                else:
                    print(f"Safe link API HTTP error: {response.status}")

    except Exception as e:
        print(f"Safe link generation failed: {e}")

    # Fallback to original URL if API fails
    return original_url

# Replace the existing get_shortlink function
async def get_shortlink(link: str, grp_id: int) -> str:
    """
    Modified get_shortlink function that uses safe redirect instead of external shorteners
    """
    # Extract movie name from link or use default
    movie_name = "Movie"  # You can extract this from your bot's context

    # Generate safe link using your API
    safe_link = await get_safe_link(link, movie_name, grp_id)

    return safe_link

# Keep the old Shortzy import for fallback if needed
# from shortzy import Shortzy

# Old function (commented out, replace with new one)
# async def get_shortlink(link, grp_id):
#     settings = await get_settings(grp_id)
#     site = settings['shortner']
#     api = settings['api']
#     shortzy = Shortzy(api, site)
#     link = await shortzy.convert(link)
#     return link