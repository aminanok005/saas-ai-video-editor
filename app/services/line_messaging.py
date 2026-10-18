import os
import logging
import httpx

logger = logging.getLogger("VibeCutAI.LINE")

LINE_CHANNEL_ACCESS_TOKEN = os.getenv(
    "LINE_CHANNEL_ACCESS_TOKEN", ""
)
LINE_USER_ID = os.getenv("LINE_USER_ID", "")

LINE_API_URL = "https://api.line.me/v2/bot/message/push"


async def send_line_message(message: str) -> bool:
    if not LINE_CHANNEL_ACCESS_TOKEN or not LINE_USER_ID:
        logger.warning("LINE Messaging API is not configured.")
        return False

    headers = {
        "Authorization": f"Bearer {LINE_CHANNEL_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }

    payload = {
        "to": LINE_USER_ID,
        "messages": [
            {
                "type": "text",
                "text": message[:5000],
            }
        ],
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            response = await client.post(
                LINE_API_URL,
                headers=headers,
                json=payload,
            )

        if response.status_code == 200:
            logger.info("LINE notification sent successfully.")
            return True

        logger.error(
            "LINE API returned HTTP %s: %s",
            response.status_code,
            response.text[:1000],
        )
        return False

    except httpx.HTTPError:
        logger.exception("LINE Messaging API request failed.")
        return False