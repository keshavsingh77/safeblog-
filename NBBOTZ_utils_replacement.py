# EXACT CODE REPLACEMENT FOR: utils.py (Lines 306-335)
# This file contains the updated get_shortlink function for SafeLink API integration

import aiohttp
import asyncio
import json
from typing import Optional
from logging_helper import LOGGER

# Your SafeLink API endpoint
SAFE_REDIRECT_API = "https://safeblog-mu.vercel.app/api/safe-link"

async def get_shortlink(link: str, grp_id: int, movie_name: str = None) -> str:
    """
    Generate safe redirect link using SafeLink API instead of external shorteners
    
    Args:
        link: The Telegram bot deep link to shorten
        grp_id: Group ID for logging/tracking
        movie_name: Optional movie name for the link
    
    Returns:
        Safe redirect URL or original link as fallback
    
    Features:
    - 10-second timer countdown
    - Robot verification
    - Multi-page redirect (configurable)
    - Ad integration ready
    """
    try:
        # Extract movie name or use parameter
        if not movie_name:
            movie_name = "Movie"
        
        # Create payload for SafeLink API
        payload = {
            "url": link,
            "movie": movie_name
        }
        
        # Call SafeLink API
        async with aiohttp.ClientSession() as session:
            async with session.post(
                SAFE_REDIRECT_API, 
                json=payload, 
                timeout=aiohttp.ClientTimeout(total=10)
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    if data.get("success"):
                        safe_link = data["safe_link"]
                        LOGGER.info(f"✅ SafeLink generated: {safe_link}")
                        return safe_link
                    else:
                        error_msg = data.get('error', 'Unknown error')
                        LOGGER.error(f"❌ SafeLink API error: {error_msg}")
                else:
                    LOGGER.error(f"❌ SafeLink API HTTP error: {response.status}")
    
    except asyncio.TimeoutError:
        LOGGER.error("❌ SafeLink API timeout - using fallback")
    except Exception as e:
        LOGGER.error(f"❌ SafeLink generation failed: {e}")
    
    # Fallback: Return original link if API fails
    LOGGER.warning(f"⚠️ Fallback to original link: {link}")
    return link


# OPTIONAL: Enhanced version if you need to pass movie name
async def get_shortlink_with_context(
    link: str, 
    grp_id: int, 
    file_name: str = None
) -> str:
    """
    Enhanced shortlink function that extracts movie name from file_name
    
    Args:
        link: The Telegram bot deep link
        grp_id: Group ID
        file_name: File name to extract movie name from
    
    Returns:
        Safe redirect URL
    """
    movie_name = "Movie"
    
    # Try to extract movie name from file_name
    if file_name:
        # Remove extensions and clean up
        movie_name = file_name
        movie_name = movie_name.replace(".mkv", "")
        movie_name = movie_name.replace(".mp4", "")
        movie_name = movie_name.replace(".avi", "")
        movie_name = movie_name.replace("[", "")
        movie_name = movie_name.replace("]", "")
        movie_name = movie_name.replace("(", "")
        movie_name = movie_name.replace(")", "")
        movie_name = movie_name.strip()
    
    return await get_shortlink(link, grp_id, movie_name)
