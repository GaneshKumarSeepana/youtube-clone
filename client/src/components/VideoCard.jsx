import React from 'react';
import { MoreVertical, CheckCircle } from 'lucide-react';

const VideoCard = ({ video, onClick }) => {
    return (
        <div className="flex flex-col gap-3 group cursor-pointer" onClick={() => onClick(video.videoId)}>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-white/5">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-medium backdrop-blur-md border border-white/10">
                    {video.duration}
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden border border-white/10">
                    <img src={video.channelAvatar} alt={video.channelName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                    <div className="flex justify-between gap-2">
                        <h3 className="text-[15px] font-semibold leading-tight line-clamp-2 group-hover:text-accent transition-colors" title={video.title}>
                            {video.title}
                        </h3>
                        <button className="flex-shrink-0 p-1 hover:bg-white/10 rounded-full h-fit">
                            <MoreVertical className="w-4 h-4 text-secondary" />
                        </button>
                    </div>
                    <div className="flex flex-col mt-1">
                        <div className="flex items-center gap-1 text-secondary hover:text-primary transition-colors">
                            <span className="text-sm truncate">{video.channelName}</span>
                            <CheckCircle className="w-3 h-3 text-accent" fill="currentColor" />
                        </div>
                        <div className="text-xs text-secondary/70 mt-0.5">
                            {video.views} • {video.timestamp}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
