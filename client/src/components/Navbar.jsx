import React from 'react';
import { Search, Menu, User, Video, Bell, Mic } from 'lucide-react';

const Navbar = ({ onSearch }) => {
    const [query, setQuery] = React.useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 glass bg-navbar flex items-center justify-between px-4 z-50">
            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => { setQuery(''); onSearch(''); }}>
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                        <Video className="w-5 h-5 text-black" fill="black" />
                    </div>
                    <span className="text-xl font-bold tracking-tight hidden sm:block">Hulk</span>
                </div>
            </div>

            <div className="flex-1 max-w-2xl mx-4 flex items-center gap-4">
                <form onSubmit={handleSearch} className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 focus-within:border-accent/50 transition-all">
                    <Search className="w-5 h-5 text-secondary" />
                    <input
                        type="text"
                        placeholder="Search for something smashable..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-transparent border-none outline-none flex-1 px-3 text-sm placeholder:text-secondary"
                    />
                </form>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors hidden md:block text-accent">
                    <Mic className="w-5 h-5" />
                </button>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Login and User Options Removed */}
            </div>
        </nav>
    );
};

export default Navbar;
