const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const dns = require("dns");
require("dotenv").config();

// 🌐 Force Node to use Google DNS to bypass ISP blocks on MongoDB SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

// 📺 Video Model
const videoSchema = new mongoose.Schema({
  title: String,
  channelName: String,
  channelAvatar: String,
  thumbnail: String,
  views: String,
  timestamp: String,
  duration: String,
  tags: [String]
});

const Video = mongoose.model("Video", videoSchema);

// 📜 History Model
const historySchema = new mongoose.Schema({
  videoId: { type: String, unique: true },
  title: String,
  channelName: String,
  channelAvatar: String,
  thumbnail: String,
  views: String,
  timestamp: String,
  duration: String,
  watchedAt: { type: Date, default: Date.now }
});

const History = mongoose.model("History", historySchema);

// Middleware
app.use(cors());
app.use(express.json());


// 📜 History API
app.post("/api/history", async (req, res) => {
  try {
    const videoData = req.body;
    // Update if exists (to bump timestamp) or insert new
    const historyItem = await History.findOneAndUpdate(
      { videoId: videoData.videoId },
      { ...videoData, watchedAt: Date.now() },
      { upsert: true, new: true }
    );
    res.json(historyItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/history", async (req, res) => {
  try {
    const history = await History.find().sort({ watchedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔥 MongoDB Connection with Options
const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB (using Google DNS)...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.error("MongoDB Connection Error ❌");
    console.error("Error Message:", err.message);
    if (err.code === 'ECONNREFUSED' || err.message.includes('selection timed out')) {
      console.error("Troubleshooting:");
      console.error("- Ensure your IP is whitelisted in MongoDB Atlas.");
      console.error("- Check if your database credentials in .env are correct.");
    }
  }
};

connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("YouTube Clone Backend Running 🚀");
});

// 🔍 Search API (YouTube Data API)
app.get("/api/videos/search", async (req, res) => {
  try {
    const { q } = req.query;
    const API_KEY = process.env.YOUTUBE_API_KEY;

    console.log(`Searching YouTube for: ${q}...`);

    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: q || "trending",
        type: "video",
        key: API_KEY
      }
    });


    // Map YouTube API responsive to our frontend structure
    const videos = response.data.items.map(item => ({
      _id: item.id.videoId,
      title: item.snippet.title,
      channelName: item.snippet.channelTitle,
      channelAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.snippet.channelTitle}`,
      thumbnail: item.snippet.thumbnails.high.url,
      views: "1M+", // YouTube Search API doesn't provide views directly without extra hits per video
      timestamp: new Date(item.snippet.publishedAt).toLocaleDateString(),
      duration: "00:00", // Requires another API call
      videoId: item.id.videoId
    }));

    res.json(videos);
  } catch (err) {
    console.error("YouTube API Error:", err.response ? err.response.data : err.message);
    res.status(500).json({ error: "Failed to fetch from YouTube" });
  }
});

// 🛠 Seed Route (for testing)
app.get("/api/seed", async (req, res) => {
  try {
    const seedVideos = [
      {
        title: "React Tutorial for Beginners",
        channelName: "DesignFlow AI",
        channelAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000",
        views: "500K",
        timestamp: "1 day ago",
        duration: "10:05",
        tags: ["react", "coding"]
      },
      {
        title: "Advanced Tailwind CSS",
        channelName: "Tailwind Master",
        channelAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tailwind",
        thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000",
        views: "200K",
        timestamp: "5 hours ago",
        duration: "15:30",
        tags: ["tailwind", "css"]
      },
      {
        title: "Node.js Backend Development",
        channelName: "Node Guru",
        channelAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Node",
        thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1000",
        views: "1M",
        timestamp: "2 days ago",
        duration: "1:20:00",
        tags: ["node", "backend"]
      }
    ];

    await Video.deleteMany({});
    await Video.insertMany(seedVideos);
    res.send("Database seeded! ✅");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
