# NBBotz Bot - SafeLink API Integration Guide
# Complete Step-by-Step Instructions

## ═══════════════════════════════════════════════════════════════════════════════
## STEP 1: Update utils.py (MOST IMPORTANT)
## ═══════════════════════════════════════════════════════════════════════════════

FILE: Your NBBotz Bot → utils.py
LINES: 306-335

### FIND THIS SECTION:

```python
async def get_shortlink(link, grp_id):
    settings = await get_settings(grp_id)
    site = settings['shortner']
    api = settings['api']
    shortzy = Shortzy(api, site)
    link = await shortzy.convert(link)
    return link
    
    # Fallback to Shortzy if user changes back to valid API-based shortener
    api = settings['api']
    shortzy = Shortzy(api, site)
    try:
        link = await shortzy.convert(link)
    except Exception as e:
        link = await shortzy.get_quick_link(link)
    return link
```

### REPLACE WITH THIS:

```python
# Add these imports at the TOP of utils.py (if not already present)
import aiohttp
import json
from typing import Optional

# Your SafeLink API endpoint
SAFE_REDIRECT_API = "https://safeblog-mu.vercel.app/api/safe-link"

async def get_shortlink(link: str, grp_id: int, movie_name: str = None) -> str:
    """
    Generate safe redirect link using SafeLink API instead of external shorteners
    
    Features:
    - 10-second timer countdown
    - Robot verification
    - Multi-page redirect
    - Ad integration ready
    """
    try:
        if not movie_name:
            movie_name = "Movie"
        
        payload = {
            "url": link,
            "movie": movie_name
        }
        
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
    
    LOGGER.warning(f"⚠️ Fallback to original link: {link}")
    return link
```

## ═══════════════════════════════════════════════════════════════════════════════
## STEP 2: Update plugins/channel.py (Movie Updates)
## ═══════════════════════════════════════════════════════════════════════════════

FILE: plugins/channel.py
LINES: ~114-120

### FIND THIS:

```python
start_link = f"https://t.me/{bot.me.username}?start=file_0_{f_id}"
safe_link = await get_shortlink(start_link, 0)
link_text = f"• <a href='{safe_link}'>{p} {q} [{lang}]</a>"
```

### REPLACE WITH:

```python
start_link = f"https://t.me/{bot.me.username}?start=file_0_{f_id}"
# Extract movie name from file_name for better tracking
movie_name = file_name.replace(".mkv", "").replace(".mp4", "").replace(".avi", "").strip()
safe_link = await get_shortlink(start_link, 0, movie_name)  # Pass movie name
link_text = f"• <a href='{safe_link}'>{p} {q} [{lang}]</a>"
```

## ═══════════════════════════════════════════════════════════════════════════════
## STEP 3: Optional - Update plugins/commands.py (Verification Links)
## ═══════════════════════════════════════════════════════════════════════════════

FILE: plugins/commands.py
LINES: ~233 & ~220

### NO CHANGES NEEDED - Keep as is:

```python
verify = await get_shortlink(
    f"https://telegram.me/{temp.U_NAME}?start=notcopy_{user_id}_{verify_id}_{file_id}", 
    grp_id
)
```

These verification links work fine without movie_name parameter.

## ═══════════════════════════════════════════════════════════════════════════════
## STEP 4: Remove Shortzy Import (Optional Cleanup)
## ═══════════════════════════════════════════════════════════════════════════════

If you want to completely remove external shortener dependency, find this line in utils.py:

```python
from shortzy import Shortzy
```

Comment it out or remove it (only if you're sure it's not used elsewhere):

```python
# from shortzy import Shortzy  # No longer needed - using SafeLink API
```

## ═══════════════════════════════════════════════════════════════════════════════
## STEP 5: Test It!
## ═══════════════════════════════════════════════════════════════════════════════

1. Restart your bot on Koyeb
2. Send a movie search in bot: `/start Avengers`
3. Check logs for: `✅ SafeLink generated:`
4. Click the link bot sends
5. You should see the Verification page with:
   - 10-second countdown timer
   - "I'm not a robot" button
   - Scroll down verification

Expected flow:
User clicks link → Website shows timer → User waits 10 seconds → 
Click "Continue" → Robot verification → Final redirect to bot → File delivered

## ═══════════════════════════════════════════════════════════════════════════════
## TROUBLESHOOTING
## ═══════════════════════════════════════════════════════════════════════════════

**Problem: Links not showing verification page**
Solution: Check bot logs for `✅ SafeLink generated:` - if it's not there, utils.py not updated

**Problem: API timeout errors**
Solution: Check internet connection, endpoint might be down - fallback to original link

**Problem: Links look like: `3yGLl2 -> /#/verify/...`**
Solution: Bot using its own SafeLink system, not our API - update utils.py properly

**Problem: Website shows wrong page**
Solution: Check link format - should have `?s=` or `/verify/` in URL

## ═══════════════════════════════════════════════════════════════════════════════
## QUICK REFERENCE
## ═══════════════════════════════════════════════════════════════════════════════

API Endpoint: https://safeblog-mu.vercel.app/api/safe-link

Request format:
{
  "url": "https://t.me/bot?start=...",
  "movie": "Movie Name"
}

Response format:
{
  "success": true,
  "safe_link": "https://safeblog-mu.vercel.app?s=...",
  "movie": "Movie Name",
  "features": {
    "timer": true,
    "robot_verification": true,
    "multi_page": true,
    "ad_integration": true
  }
}

## ═══════════════════════════════════════════════════════════════════════════════
## FILES THAT NEED CHANGES
## ═══════════════════════════════════════════════════════════════════════════════

✅ utils.py (CRITICAL) - Replace get_shortlink function
✅ plugins/channel.py (OPTIONAL) - Pass movie_name parameter
✅ plugins/commands.py - No changes needed (works as-is)

That's it! Your bot will now generate SafeLink URLs with verification!
