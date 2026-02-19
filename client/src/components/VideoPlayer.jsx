import React from 'react';
import { X } from 'lucide-react';

const VideoPlayer = ({ videoId, onClose }) => {
    if (!videoId) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border-2 border-accent shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-accent hover:text-black rounded-full z-10 transition-colors group"
                >
                    <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>

                <div className="w-full h-full">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
