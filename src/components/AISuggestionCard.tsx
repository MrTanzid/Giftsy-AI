import React from 'react';
import { Gift, Tag, MapPin, Bookmark } from 'lucide-react';

interface AISuggestionCardProps {
  suggestion: string;
  loading?: boolean;
  onSave?: (suggestion: string) => void;
}

function formatSuggestions(text: string) {
  const suggestions = text.split(/\d+\./).filter(Boolean);
  return suggestions.map(suggestion => {
    const lines = suggestion.split('\n').filter(Boolean);
    return {
      name: lines[0]?.replace(/^[-*]\s*/, '').trim(),
      details: lines.slice(1).map(line => line.replace(/^[-*]\s*/, '').trim())
    };
  });
}

export default function AISuggestionCard({ suggestion, loading, onSave }: AISuggestionCardProps) {
  const suggestions = formatSuggestions(suggestion);

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
        <Gift className="h-5 w-5 text-purple-500" />
        Curated Suggestions
      </h2>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 flex-1">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => onSave?.(item.name + '\n' + item.details.join('\n'))}
                    className="ml-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Bookmark className="h-5 w-5 text-purple-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  {item.details.map((detail, idx) => {
                    const Icon = idx === 0 ? Tag : MapPin;
                    return (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">{detail}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}