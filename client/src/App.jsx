import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import VideoPlayer from './components/VideoPlayer';

const CATEGORIES = ["All", "Gaming", "Music", "Live", "Coding", "Space", "Tech", "Art", "Sports", "News", "Movies"];

function App() {
  const [videos, setVideos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedVideoId, setSelectedVideoId] = React.useState(null);

  const fetchVideos = async (searchTerm = '') => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/api/videos/search?q=${searchTerm}`;

      // Special case for History
      if (searchTerm === 'History') {
        url = `http://localhost:5000/api/history`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = async (video) => {
    setSelectedVideoId(video.videoId);
    // Add to watch history
    try {
      await fetch('http://localhost:5000/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video)
      });
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };

  React.useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar onSearch={fetchVideos} />

      <div className="flex pt-16">
        <Sidebar onSelect={(category) => fetchVideos(category === "Home" ? "" : category)} />

        <main className="flex-1 px-4 sm:px-6 py-6 lg:ml-64">
          {/* Categories Chips */}
          <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => fetchVideos(cat === "All" ? "" : cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all ${(cat === "All" && videos.length > 0) ? 'bg-accent text-white' : 'bg-white/5 hover:bg-white/10 text-secondary hover:text-primary'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 animate-pulse">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="aspect-video bg-white/5 rounded-2xl"></div>
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/5 rounded w-3/4"></div>
                      <div className="h-3 bg-white/5 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {videos.length > 0 ? (
                videos.map((video) => (
                  <VideoCard
                    key={video._id || video.videoId}
                    video={video}
                    onClick={() => handleVideoClick(video)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-20 text-secondary">
                  No videos found. Try a different search!
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Video Player Overlay */}
      <VideoPlayer
        videoId={selectedVideoId}
        onClose={() => setSelectedVideoId(null)}
      />
    </div>
  );
}

export default App;
