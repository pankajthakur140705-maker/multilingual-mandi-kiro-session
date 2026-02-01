import React, { useState } from "react";

/* ---------------- LANGUAGE CONFIG ---------------- */
const BACKEND_LANG = {
  English: "en",
  Hindi: "hi",
  Punjabi: "pa",
  Tamil: "ta",
  Bengali: "bn",
};

const LANG = {
  English: {
    code: "en-IN",
    ui: {
      title: "Multilingual Mandi",
      start: "Start",
      product: "Product",
      quantity: "Quantity (kg)",
      location: "Location",
      getPrice: "Get AI Price",
      error: "Please fill all fields correctly",
    },
  },
  Hindi: {
    code: "hi-IN",
    ui: {
      title: "बहुभाषी मंडी",
      start: "शुरू करें",
      product: "उत्पाद",
      quantity: "मात्रा (किलो)",
      location: "स्थान",
      getPrice: "AI मूल्य प्राप्त करें",
      error: "कृपया सही जानकारी भरें",
    },
  },
  Punjabi: {
    code: "pa-IN",
    ui: {
      title: "ਬਹੁਭਾਸ਼ੀ ਮੰਡੀ",
      start: "ਸ਼ੁਰੂ ਕਰੋ",
      product: "ਉਤਪਾਦ",
      quantity: "ਮਾਤਰਾ (ਕਿਲੋ)",
      location: "ਸਥਾਨ",
      getPrice: "AI ਕੀਮਤ ਲਵੋ",
      error: "ਸਹੀ ਜਾਣਕਾਰੀ ਭਰੋ",
    },
  },
  Tamil: {
    code: "ta-IN",
    ui: {
      title: "பல்மொழி சந்தை",
      start: "தொடங்கு",
      product: "பொருள்",
      quantity: "அளவு (கிலோ)",
      location: "இடம்",
      getPrice: "AI விலை",
      error: "சரியான தகவலை உள்ளிடவும்",
    },
  },
  Bengali: {
    code: "bn-IN",
    ui: {
      title: "বহুভাষিক মান্ডি",
      start: "শুরু করুন",
      product: "পণ্য",
      quantity: "পরিমাণ (কেজি)",
      location: "অবস্থান",
      getPrice: "AI মূল্য",
      error: "সঠিক তথ্য দিন",
    },
  },
};

/* ---------------- STYLES ---------------- */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg,#ff9933,#fff,#138808)",
  },
  card: {
    background: "#fff",
    padding: 30,
    width: 360,
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 8,
  },
  btn: {
    width: "100%",
    padding: 12,
    marginTop: 10,
    background: "#138808",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

/* ---------------- MAIN APP ---------------- */
export default function App() {
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState("English");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState(null);
  const [listening, setListening] = useState(false);
  const [negotiationHistory, setNegotiationHistory] = useState([]);
  const [error, setError] = useState("");

  /* ---------- SPEAK ---------- */
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = LANG[language].code;
    utter.rate = 0.95;
    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
  };

  /* ---------- LISTEN ---------- */
  const listen = (callback) => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = LANG[language].code;
    rec.continuous = false;
    rec.interimResults = false;
    setListening(true);

    rec.onresult = (e) => {
      callback(e.results[0][0].transcript);
      setListening(false);
    };
    rec.onerror = rec.onend = () => setListening(false);

    rec.start();
  };

  /* ---------- VALIDATION ---------- */
  const validate = () => {
    if (!product || !location || Number(quantity) <= 0) {
      setError(LANG[language].ui.error);
      speak(LANG[language].ui.error);
      return false;
    }
    return true;
  };

  /* ---------- GET AI PRICE ---------- */
  const getAIPrice = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("http://127.0.0.1:8000/get-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          quantity,
          location,
          language: BACKEND_LANG[language],
        }),
      });

      const data = await res.json();
      setResult(data);
      speak(`${data.price_range}. ${data.negotiation_tip}`);
      setPage(3);
    } catch {
      setError("❌ Backend connection failed");
    }
  };

  /* ---------- AUTO NEGOTIATE ---------- */
  const autoNegotiate = (speech) => {
    if (!result?.price_range) return;

    const nums = result.price_range.match(/\d+/g) || [];
    if (nums.length < 2) return;

    const min = parseInt(nums[0]);
    const max = parseInt(nums[1]);
    const userPrice = speech.match(/\d+/)?.[0];

    let reply = !userPrice
      ? `Market price is ${result.price_range}. Please say a number.`
      : userPrice < min
      ? `₹${userPrice} is too low. Minimum is ₹${min + 1}.`
      : userPrice <= max
      ? `₹${userPrice} is acceptable. Deal finalized.`
      : `₹${userPrice} is above market price.`;

    setNegotiationHistory((p) => [
      ...p,
      { from: "user", text: speech },
      { from: "ai", text: reply },
    ]);

    speak(reply);
  };

  /* ---------- UI ---------- */
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>{LANG[language].ui.title}</h2>

        {page === 1 && (
          <>
            <select
              style={styles.input}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {Object.keys(LANG).map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
            <button style={styles.btn} onClick={() => setPage(2)}>
              {LANG[language].ui.start}
            </button>
          </>
        )}

        {page === 2 && (
          <>
            <input
              style={styles.input}
              placeholder={LANG[language].ui.product}
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
            <button onClick={() => listen(setProduct)}>🎤</button>

            <input
              style={styles.input}
              placeholder={LANG[language].ui.quantity}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={() => listen(setQuantity)}>🎤</button>

            <input
              style={styles.input}
              placeholder={LANG[language].ui.location}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={() => listen(setLocation)}>🎤</button>

            <button style={styles.btn} onClick={getAIPrice}>
              {LANG[language].ui.getPrice}
            </button>
          </>
        )}

        {page === 3 && result && (
          <>
            <p>💰 {result.price_range}</p>
            <p>🤖 {result.negotiation_tip}</p>
            <button style={styles.btn} onClick={() => listen(autoNegotiate)}>
              🎤 Voice Negotiate
            </button>

            {negotiationHistory.map((m, i) => (
              <p key={i}>
                <b>{m.from === "ai" ? "🤖 AI:" : "🧑 You:"}</b> {m.text}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
