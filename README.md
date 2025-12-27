# 🎮 Trivia Battle Arena

An AI-powered multiplayer trivia game perfect for parties! Compete in teams and test your knowledge across 20+ topics.

## ✨ Features

- 🤖 **AI-Generated Questions** - Unique trivia powered by Llama 3.1 (via Groq)
- 👥 **Team Competition** - 2-6 teams, randomly distributed
- ⏱️ **30-Second Timer** - Answer quickly for the win!
- 🎯 **20+ Topics** - From Pop Culture to Science
- 🏆 **Celebration Mode** - Confetti and winner announcements
- 💾 **Auto-Save** - Resume your game anytime
- 📱 **Responsive** - Works on mobile, tablet, and desktop

## 🚀 Quick Start

### 1. Get Your FREE Groq API Key

Groq is **100% FREE** to use - no credit card required!

1. Visit [https://console.groq.com/](https://console.groq.com/)
2. Sign up with your email (takes 1 minute)
3. Go to API Keys section
4. Create a new API key
5. Copy the key

### 2. Add Your API Key

Open the `.env` file in the project root and add your key:

```bash
VITE_GROQ_API_KEY=gsk_your_actual_key_here
```

### 3. Start Playing!

The dev server is already running at:
**http://localhost:5173/**

Just open it in your browser and start playing!

## 🎯 How to Play

1. **Setup** - Add players (minimum 2)
2. **Configure** - Choose number of teams and questions per team
3. **Review Teams** - Shuffle if you want different teams
4. **Play!** - Take turns selecting topics and answering questions
5. **Celebrate** - See who wins with confetti! 🎉

## 🛠️ Development

```bash
# Install dependencies (already done)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── common/       # Reusable UI components
│   ├── game/         # Game-specific components
│   ├── screens/      # Main screen components
│   └── setup/        # Setup flow components
├── contexts/         # React Context for state
├── hooks/            # Custom React hooks
├── services/         # AI, storage, team logic
└── utils/            # Constants and helpers
```

## 🎨 Tech Stack

- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Groq** - AI API (FREE!)
- **Llama 3.1** - AI model
- **localStorage** - Game persistence

## 🎊 Perfect For

- New Year's Eve parties
- Team building events
- Family game nights
- Virtual hangouts
- Friendly competitions

## 🔧 Troubleshooting

### Questions not generating?
- Check that your Groq API key is correctly set in `.env`
- Restart the dev server after adding the API key
- Check browser console for error messages

### Game not saving?
- Make sure localStorage is enabled in your browser
- Check that you're not in private/incognito mode

## 📝 License

Built with ❤️ for fun party games!

---

**Enjoy your Trivia Battle Arena! 🎮🏆**
