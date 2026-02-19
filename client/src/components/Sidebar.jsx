import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, ChevronRight, History, PlayCircle } from 'lucide-react';

const NavItem = ({ icon: Icon, label, active = false, onClick }) => (
    <div
        onClick={() => onClick(label)}
        className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-xl transition-all ${active ? 'bg-accent/20 text-accent font-medium' : 'hover:bg-white/5 text-secondary hover:text-primary'
            }`}
    >
        <Icon className="w-5 h-5" />
        <span className="text-sm">{label}</span>
    </div>
);

const Sidebar = ({ onSelect }) => {
    const [activeItem, setActiveItem] = React.useState('Home');

    const handleSelect = (label) => {
        setActiveItem(label);
        onSelect(label);
    };

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-sidebar glass border-r-0 pt-4 px-2 hidden lg:block overflow-y-auto">
            <div className="space-y-1">
                <NavItem icon={Home} label="Home" active={activeItem === 'Home'} onClick={handleSelect} />
                <NavItem icon={Compass} label="Trending" active={activeItem === 'Trending'} onClick={handleSelect} />
                <NavItem icon={PlayCircle} label="Subscriptions" active={activeItem === 'Subscriptions'} onClick={handleSelect} />
            </div>

            <div className="my-4 border-t border-white/5 mx-4"></div>

            <div className="space-y-1">
                <div className="px-4 py-2 flex items-center justify-between text-xs font-semibold text-secondary uppercase tracking-wider">
                    Library
                    <ChevronRight className="w-4 h-4" />
                </div>
                <NavItem icon={History} label="History" active={activeItem === 'History'} onClick={handleSelect} />
                <NavItem icon={PlaySquare} label="Your Videos" active={activeItem === 'Your Videos'} onClick={handleSelect} />
                <NavItem icon={Clock} label="Watch Later" active={activeItem === 'Watch Later'} onClick={handleSelect} />
                <NavItem icon={ThumbsUp} label="Liked Videos" active={activeItem === 'Liked Videos'} onClick={handleSelect} />
            </div>
        </aside>
    );
};

export default Sidebar;
