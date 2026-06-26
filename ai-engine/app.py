from fastapi import FastAPI
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str
    sourceUrl: str = ""

@app.post("/analyze")
def analyze(data: TextInput):

    text = data.text.lower()
    source = data.sourceUrl.lower()

    score = 95

    reasons = []

    if "breaking news" in text:
        score -= 25
        reasons.append("Breaking News Phrase Detected")

    if "shocking" in text:
        score -= 25
        reasons.append("Sensational Language Detected")

    if "viral" in text:
        score -= 20
        reasons.append("Viral Propagation Pattern Detected")

    if "secret" in text:
        score -= 20
        reasons.append("Unverified Secret Claim Detected")

    if score >= 80:
        risk = "Low"
        prediction = "Likely Authentic Content"
        confidence = 95

    elif score >= 60:
        risk = "Medium"
        prediction = "Needs Verification"
        confidence = 80

    else:
        risk = "High"
        prediction = "Potentially Misleading Content"
        confidence = 87

    if "bbc" in source or "reuters" in source or "thehindu" in source:
        sourceCredibility = "High"

    elif "fake" in source or "xyz" in source:
        sourceCredibility = "Low"
        score -= 20

    else:
        sourceCredibility = "Medium"

        # Recalculate risk after source analysis

    if score >= 80:
        risk = "Low"
        prediction = "Likely Authentic Content"
        confidence = 95

    elif score >= 60:
        risk = "Medium"
        prediction = "Needs Verification"
        confidence = 80

    else:
        risk = "High"
        prediction = "Potentially Misleading Content"
        confidence = 87

    return {
        "trustScore": score,
        "riskLevel": risk,
        "prediction": prediction,
        "confidence": confidence,
        "reasons": reasons,
        "sourceCredibility": sourceCredibility,
    }