import os
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")


async def verify_with_google_search(title: str, author: str, claim_summary: str) -> dict:
    """
    两段式调用（严格 Schema）：
    1) 第一次调用：开启 google_search 工具做检索/核查（不强制 JSON mime type / 不传 schema）
    2) 第二次调用：关闭工具，只把第一段的“证据”喂回去，使用 JSON Schema 强制结构化输出

    返回：
      {
        "verdict": "REAL" | "FAKE" | "MISMATCH" | "UNVERIFIED",
        "confidence": float,
        "reason": str,
        "actual_paper_info": Optional[str]
      }
    """

    if not API_KEY:
        return {
            "verdict": "UNVERIFIED",
            "confidence": 0.0,
            "reason": "GEMINI_API_KEY is missing",
            "actual_paper_info": None
        }

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"
    headers = {"Content-Type": "application/json"}

    async def _post(payload: dict) -> dict:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(url, json=payload, headers=headers)
        if resp.status_code != 200:
            raise RuntimeError(f"API Error {resp.status_code}: {resp.text}")
        return resp.json()

    # ---------------------------
    # Stage 1: Tool-enabled search (NO response_mime_type / NO response_schema)
    # ---------------------------
    stage1_prompt = f"""
You are an academic auditor. Verify if this specific paper exists using Google Search.

Target Paper:
- Title: "{title}"
- Author: "{author}"

User's Claim/Summary:
"{claim_summary}"

INSTRUCTIONS:
1) Use Google Search to find this paper.
2) If you cannot find a paper with this SPECIFIC title and author, say so clearly.
3) If found, identify reliable sources (publisher page, journal site, arXiv, DOI landing page, etc.).
4) Extract the real abstract (or the best available summary) and compare it with the user's claim.
5) Output a concise "evidence report" with:
   - Whether the paper was found
   - Links / source names (if available from grounding)
   - Key facts: title, authors, venue, year, DOI/arXiv id (if found)
   - Abstract snippet or summary
"""

    stage1_payload = {
        "contents": [{"parts": [{"text": stage1_prompt}]}],
        "tools": [{"google_search": {}}],
        "safetySettings": [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
        ],
        # 这里不要传 generationConfig.response_mime_type / response_schema
        "generationConfig": {
            "temperature": 0.2,
        },
    }

    try:
        stage1_result = await _post(stage1_payload)
    except Exception as e:
        print(f"[Google Search Stage1 Error] {e}")
        return {
            "verdict": "UNVERIFIED",
            "confidence": 0.0,
            "reason": f"Stage1 failed: {str(e)}",
            "actual_paper_info": None
        }

    # Extract stage1 candidate text + grounding metadata as "evidence"
    try:
        cands = stage1_result.get("candidates") or []
        if not cands:
            return {
                "verdict": "UNVERIFIED",
                "confidence": 0.0,
                "reason": "Stage1: No response candidates from AI",
                "actual_paper_info": None
            }

        cand0 = cands[0]
        finish_reason = cand0.get("finishReason")
        if finish_reason == "SAFETY":
            return {
                "verdict": "UNVERIFIED",
                "confidence": 0.0,
                "reason": "Stage1: Content blocked by safety filters.",
                "actual_paper_info": None
            }

        parts = ((cand0.get("content") or {}).get("parts") or [])
        stage1_text = "".join([p.get("text", "") for p in parts]).strip()

        # groundingMetadata 往往包含检索线索/引用信息（结构可能会变，直接整体带回去最稳）
        grounding = cand0.get("groundingMetadata", None)

        evidence_blob = {
            "stage1_text": stage1_text,
            "groundingMetadata": grounding,
        }
        evidence_str = json.dumps(evidence_blob, ensure_ascii=False)
    except Exception as e:
        print(f"[Google Search Stage1 Parse Error] {e}")
        return {
            "verdict": "UNVERIFIED",
            "confidence": 0.0,
            "reason": f"Stage1 parse failed: {str(e)}",
            "actual_paper_info": None
        }

    # ---------------------------
    # Stage 2: Strict JSON Schema (NO tools)
    # ---------------------------
    stage2_prompt = f"""
You are an academic auditor. Using ONLY the evidence provided below (from a Google-Search-grounded model run),
produce a final decision.

Target Paper:
- Title: "{title}"
- Author: "{author}"

User's Claim/Summary:
"{claim_summary}"

EVIDENCE (JSON):
{evidence_str}

DECISION RULES:
- If evidence indicates the specific title+author paper does NOT exist -> verdict="FAKE".
- If paper exists but user's claim is about a different topic / misrepresents the abstract -> verdict="MISMATCH".
- If paper exists and claim is accurate -> verdict="REAL".
- If evidence is insufficient to decide -> verdict="UNVERIFIED".

Output MUST be valid JSON matching the provided schema. No markdown, no extra keys.
"""

    generation_config_strict = {
        "response_mime_type": "application/json",
        "response_schema": {
            "type": "OBJECT",
            "properties": {
                "verdict": {
                    "type": "STRING",
                    "enum": ["REAL", "FAKE", "MISMATCH", "UNVERIFIED"],
                },
                "confidence": {"type": "NUMBER"},
                "reason": {"type": "STRING"},
                "actual_paper_info": {
                    "type": "STRING",
                    "nullable": True,
                },
            },
            "required": ["verdict", "confidence", "reason"],
        },
        "temperature": 0.2,
    }

    stage2_payload = {
        "contents": [{"parts": [{"text": stage2_prompt}]}],
        # 关键点：第二段不要 tools
        "generationConfig": generation_config_strict,
        "safetySettings": [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE"},
            {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE"},
        ],
    }

    try:
        stage2_result = await _post(stage2_payload)
    except Exception as e:
        print(f"[Google Search Stage2 Error] {e}")
        return {
            "verdict": "UNVERIFIED",
            "confidence": 0.0,
            "reason": f"Stage2 failed: {str(e)}",
            "actual_paper_info": None
        }

    try:
        cands2 = stage2_result.get("candidates") or []
        if not cands2:
            return {
                "verdict": "UNVERIFIED",
                "confidence": 0.0,
                "reason": "Stage2: No response candidates from AI",
                "actual_paper_info": None
            }

        cand2 = cands2[0]
        finish_reason2 = cand2.get("finishReason")
        if finish_reason2 == "SAFETY":
            return {
                "verdict": "UNVERIFIED",
                "confidence": 0.0,
                "reason": "Stage2: Content blocked by safety filters.",
                "actual_paper_info": None
            }

        parts2 = ((cand2.get("content") or {}).get("parts") or [])
        raw_text2 = "".join([p.get("text", "") for p in parts2]).strip()

        # 第二段指定了 schema，理论上这里就是合法 JSON
        return json.loads(raw_text2)

    except Exception as e:
        print(f"[Google Search Stage2 Parse Error] {e} raw={raw_text2 if 'raw_text2' in locals() else ''}")
        return {
            "verdict": "UNVERIFIED",
            "confidence": 0.0,
            "reason": f"Stage2 parse failed: {str(e)}",
            "actual_paper_info": None
        }
