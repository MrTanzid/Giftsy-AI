import React from 'react';
import { Clock, ChevronRight, Bookmark } from 'lucide-react';
import type { GiftIdea } from '../types';

interface GiftCardProps {
  gift: GiftIdea;
}

export default function GiftCard({ gift }: GiftCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={gift.imageUrl}
        alt={gift.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{gift.title}</h3>
          <button className="text-gray-400 hover:text-purple-500">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mt-2">{gift.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{gift.timeRequired}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            gift.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
            gift.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {gift.difficulty}
          </span>
        </div>
        
        <button className="mt-4 w-full flex items-center justify-center gap-2 bg-purple-50 text-purple-600 py-2 rounded-lg hover:bg-purple-100 transition-colors">
          View Details
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}