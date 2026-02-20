# 🦖 Hulk-Tube: The Ultimate Video SMASH Experience

Hulk-Tube is a high-performance, full-stack YouTube clone rebranded with a powerful "Hulk" aesthetic. Built with the MERN stack (MongoDB, Express, React, Node.js), it features real-time search, watch history, and a premium video playback experience.

🚀 **Live Demo:** [youtube-clone-sooty-iota.vercel.app](https://youtube-clone-sooty-iota.vercel.app)

![Hulk Theme](https://img.shields.io/badge/Theme-Hulk--Green-22c55e?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge)

## ✨ Key Features

- **🦖 Hulk Branding**: A complete UI overhaul with vibrant green accent colors, dark mode, and "smashable" search.
- **🕒 Watch History**: Every video you watch is automatically saved to your history via MongoDB.
- **🔍 Real-Time Search**: Integrated with the YouTube Data API v3 for live search results.
- **🎬 Premium Playback**: Uses an optimized YouTube Iframe API with a custom green-glow border effect.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Storage for Watch History)
- **API**: YouTube Data API v3
- **Deployment**: Vercel (Frontend), Render (Backend)

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/GaneshKumarSeepana/youtube-clone.git
cd youtube-clone
```

### 2. Environment Setup
Create a `.env` file in the `server` directory:
```env
MONGO_URI=your_mongodb_connection_string
YOUTUBE_API_KEY=your_google_cloud_api_key
PORT=5000
```

### 3. Install Dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Run Locally
```bash
# Start backend (from server folder)
npm run dev

# Start frontend (from client folder)
npm run dev
```

## 🛡️ Security
This project uses `.gitignore` to protect sensitive API keys and database credentials. Always ensure your `.env` files are not tracked in version control.

## 👨‍💻 Author
**Ganesh Kumar Seepana**  
GitHub: [@GaneshKumarSeepana](https://github.com/GaneshKumarSeepana)

---
*Created with 💚 and SMASHING energy.*
