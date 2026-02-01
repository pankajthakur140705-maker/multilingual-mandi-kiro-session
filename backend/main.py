from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import re

# --------------------
# APP SETUP
# --------------------
app = FastAPI(title="Multilingual Mandi AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # OK for development
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------
# REQUEST MODEL
# --------------------
class PriceRequest(BaseModel):
    product: str
    quantity: str
    location: str
    language: str

# --------------------
# HEALTH CHECK
# --------------------
@app.get("/")
@app.get("/health")
def health():
    return {"status": "✅ Backend running successfully"}

# --------------------
# HELPER FUNCTIONS
# --------------------
def extract_quantity(qty_str: str) -> float:
    """
    Extracts numeric value from '1 kg', '2 किलो', '1.5', etc.
    """
    match = re.search(r"\d+(\.\d+)?", qty_str)
    return float(match.group()) if match else 10.0


def normalize_product(product: str) -> str:
    product = product.lower()

    aliases = {
        "potato": ["potato", "potatoes", "आलू"],
        "tomato": ["tomato", "टमाटर"],
        "onion": ["onion", "प्याज"],
        "apple": ["apple", "सेब"],
    }

    for key, names in aliases.items():
        if any(n in product for n in names):
            return key

    return "default"


# --------------------
# AI PRICE API
# --------------------
@app.post("/get-price")
def get_price(req: PriceRequest):

    # Base prices (₹ per kg)
    base_prices = {
        "tomato": 22,
        "potato": 18,
        "onion": 25,
        "apple": 95,
        "default": 20
    }

    product_key = normalize_product(req.product)
    base_price = base_prices[product_key]

    # Quantity adjustment
    qty = extract_quantity(req.quantity)

    if qty > 50:
        base_price -= 2
    elif qty < 5:
        base_price += 2

    # Location adjustment
    metro_cities = ["delhi", "mumbai", "bangalore", "chennai", "kolkata"]
    if any(city in req.location.lower() for city in metro_cities):
        base_price += 1

    # AI-like randomness
    low = max(base_price + random.randint(-1, 0), 1)
    high = low + random.randint(2, 4)

    # Multilingual responses
    responses = {
        "en": {
            "price_range": f"₹{low}–₹{high} per kg",
            "negotiation_tip": f"Start negotiation near ₹{low + 1} for a fair deal."
        },
        "hi": {
            "price_range": f"₹{low}–₹{high} प्रति किलो",
            "negotiation_tip": f"₹{low + 1} से बातचीत शुरू करें।"
        },
        "pa": {
            "price_range": f"₹{low}–₹{high} ਪ੍ਰਤੀ ਕਿੱਲੋ",
            "negotiation_tip": f"₹{low + 1} ਤੋਂ ਗੱਲਬਾਤ ਸ਼ੁਰੂ ਕਰੋ।"
        },
        "ta": {
            "price_range": f"₹{low}–₹{high} ஒரு கிலோ",
            "negotiation_tip": f"₹{low + 1} முதல் பேச தொடங்குங்கள்."
        },
        "bn": {
            "price_range": f"₹{low}–₹{high} প্রতি কেজি",
            "negotiation_tip": f"₹{low + 1} থেকে দর কষাকষি শুরু করুন।"
        }
    }

    lang = req.language if req.language in responses else "en"

    return {
        "product": product_key,
        "quantity_kg": qty,
        "location": req.location,
        "price_range": responses[lang]["price_range"],
        "negotiation_tip": responses[lang]["negotiation_tip"]
    }
