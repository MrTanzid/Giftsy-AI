import React from 'react';
import { Heart, Sparkles, Bot } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-violet-600 to-purple-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/80 text-sm flex items-center gap-2">
            © {new Date().getFullYear()} GiftsyAI <Bot className="h-4 w-4" /> <Sparkles className="h-4 w-4" />
          </p>
          <p className="text-white/80 text-sm flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-pink-400 animate-pulse" /> by{' '}
            <a 
              href="https://t.me/sp_mrt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-300 hover:text-pink-200 transition-colors font-medium"
            >
              MrTanzid
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}