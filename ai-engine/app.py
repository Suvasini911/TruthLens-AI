from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

classifier = pipeline(
    "sentiment-analysis"
)

class TextInput(BaseModel):
    text: str

@app.post("/analyze")
def analyze(data: TextInput):

    text = data.text.lower()

    # Suspicious keywords
    suspicious_words = [
        "breaking news",
        "shocking",
        "viral",
        "secret",
        "unbelievable",
        "click here",
        "urgent",
        "miracle"
    ]

    score = 95

    for word in suspicious_words:
        if word in text:
            score -= 20

    if score >= 80:
        risk = "Low"
        prediction = "Likely Authentic Content"

    elif score >= 60:
        risk = "Medium"
        prediction = "Needs Verification"

    else:
        risk = "High"
        prediction = "Potentially Misleading Content"

    return {
        "trustScore": score,
        "riskLevel": risk,
        "prediction": prediction
    }