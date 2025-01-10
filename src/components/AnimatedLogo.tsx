import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

export default function AnimatedLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative group">
        <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg group-hover:bg-white/30 transition-all duration-300"></div>
        <div className="relative bg-white/10 p-2.5 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-white animate-pulse" />
          <Bot className="h-5 w-5 text-white/90" />
        </div>
      </div>
      <span className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: 'Orbitron, sans-serif' }}>
        GiftsyAI
      </span>
    </div>
  );
}