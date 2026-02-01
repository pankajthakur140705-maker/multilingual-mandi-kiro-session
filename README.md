# 🌾 Multilingual Mandi  
### AI-Powered Voice-First Market Price & Negotiation Assistant for Farmers

> **Empowering farmers with fair prices, local languages, and AI-driven negotiation — one voice at a time.**

---

## 🚀 Overview

**Multilingual Mandi** is a voice-enabled, AI-powered web platform designed to help farmers and traders discover **fair mandi prices** and **negotiate confidently** in their **own regional language**.

The system removes language, literacy, and information barriers by combining **React**, **FastAPI**, and **speech technologies** into a simple, inclusive digital mandi experience.

---
## 🎥 Project Demo (Loom)
[![Project Demo](https://cdn.loom.com/sessions/thumbnails/b7e4a421bdd04cf39725939d64fc26a0.png)](https://www.loom.com/share/b7e4a421bdd04cf39725939d64fc26a0)

## 🎯 Problem Statement

Farmers frequently face:
- Language barriers on digital platforms  
- Lack of transparent, real-time mandi pricing  
- Weak negotiation power against middlemen  
- Text-heavy apps unsuitable for low-literacy users  

These challenges often result in **unfair pricing and reduced income**.

---

## 💡 Our Solution

**Multilingual Mandi** provides:
- 🎤 **Voice-based input** for product, quantity, and location  
- 🤖 **AI-generated price ranges** based on context  
- 🌐 **Regional language support** (English, Hindi, Punjabi, Tamil, Bengali)  
- 💬 **Voice-driven, multi-turn negotiation assistance**  

All built with a **farmer-first, accessibility-first mindset**.

---

## 🧠 Key Features

- 🌐 Multilingual UI & voice responses  
- 🎙 Speech-to-Text for easy input  
- 🔊 Text-to-Speech for AI replies  
- 🤝 AI-assisted price negotiation  
- 📱 Simple, mobile-friendly interface  

---

## 🏗️ Tech Stack

### Frontend
- React.js  
- Web Speech API (Speech Recognition)  
- Speech Synthesis API  

### Backend
- FastAPI (Python)  
- RESTful APIs  
- Context-aware pricing logic  

---

## 📁 Project Structure

    multilingual-mandi/
    ├── backend/
    │   ├── main.py
    │   └── requirements.txt
    │
    ├── frontend/
    │   ├── public/
    │   │   └── index.html
    │   ├── src/
    │   │   ├── App.js
    │   │   └── index.js
    │   ├── package.json
    │   └── package-lock.json
    │
    ├── .kiro/
    │   └── specs/
    │       └── multilingual-mandi/
    │           ├── design.md
    │           ├── requirements.md
    │           └── tasks.md
    │
    ├── screenshots/
    │   └── ui.png
    │
    ├── .gitignore
    ├── .env.example
    └── README.md

---
## ⚙️ How to Run Locally

### 🔹 Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Open in browser:
👉http://127.0.0.1:8000/docs

### 🔹 Frontend (React)
 
 ```bash
cd frontend
npm install
npm start
```

Open in browser:
👉http://localhost:3000

---

### 🧪 Sample API Response


{
  "price_range": "₹20–₹24 प्रति किलो",
  
  "negotiation_tip": "₹22 से बातचीत शुरू करें"
}

### 🌍 Real-World Impact

- 📈 Improves farmer bargaining power  
- 🗣 Enables regional-language participation  
- 📱 Encourages digital adoption in rural India  
- 🤝 Reduces dependency on middlemen  

---

### 🔮 Future Enhancements

- Live government mandi price API integration  
- LLM-based predictive pricing models  
- GPS-based automatic location detection  
- WhatsApp / IVR-based access  
- Android mobile application  

---

### ⭐ Why This Project Stands Out

- Voice-first design for inclusivity  
- Multilingual AI interaction  
- Negotiation assistance (not just price display)  
- Strong alignment with **AI for Bharat** goals  
- Clean architecture & professional documentation  

This is **not just a demo**, but a **deployable social-impact solution**.

---

### 📜 License

This project is licensed under the **MIT License** — free to use, modify, and build upon.

⭐ If this project resonates with you, please consider starring the repository.  
**Empowering farmers. One voice at a time.**

---





