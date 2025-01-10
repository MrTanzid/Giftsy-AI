import React, { useState } from 'react';
import { Gift, Target, Calendar, Users, Clock, Wallet, Sparkles } from 'lucide-react';
import type { Occasion } from '../types';

interface GiftSuggestionFormProps {
  onSubmit: (data: any) => void;
}

export default function GiftSuggestionForm({ onSubmit }: GiftSuggestionFormProps) {
  const [occasion, setOccasion] = useState<Occasion>('Birthday');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState('18-24');
  const [budget, setBudget] = useState('50-100');
  const [relationship, setRelationship] = useState('Friend');
  const [isLoading, setIsLoading] = useState(false);

  const occasions: Occasion[] = ['Birthday', 'Anniversary', 'Holiday', 'Wedding', 'Graduation', 'Other'];
  const relationships = ['Friend', 'Family', 'Partner', 'Colleague', 'Acquaintance'];
  const interests = ['Art', 'Technology', 'Sports', 'Reading', 'Gaming', 'Music', 'Cooking', 'Fashion', 'Travel', 'Fitness', 'Photography', 'DIY'];
  const ageRanges = ['0-12', '13-17', '18-24', '25-34', '35-44', '45-54', '55+'];
  const budgetRanges = ['0-50', '50-100', '100-250', '250-500', '500+'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await onSubmit({
      occasion,
      relationship,
      ageRange,
      budget,
      interests: selectedInterests
    });
    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
        <Gift className="h-6 w-6 text-purple-500" />
        Find the Perfect Gift
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              Occasion
            </label>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value as Occasion)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              {occasions.map((occ) => (
                <option key={occ} value={occ}>{occ}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-purple-500" />
              Relationship
            </label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              {relationships.map((rel) => (
                <option key={rel} value={rel}>{rel}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-500" />
              Age Range
            </label>
            <select
              value={ageRange}
              onChange={(e) => setAgeRange(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              {ageRanges.map((range) => (
                <option key={range} value={range}>{range} years</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-purple-500" />
              Budget Range ($)
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2.5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 transition-colors"
            >
              {budgetRanges.map((range) => (
                <option key={range} value={range}>${range}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Interests & Hobbies
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => {
                  setSelectedInterests(prev =>
                    prev.includes(interest)
                      ? prev.filter(i => i !== interest)
                      : [...prev, interest]
                  );
                }}
                className={`
                  relative overflow-hidden rounded-xl p-3 text-center transition-all duration-300
                  ${selectedInterests.includes(interest)
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span className={`text-sm font-medium ${
                  selectedInterests.includes(interest)
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {interest}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`
            w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg
            font-semibold transition-all duration-300 flex items-center justify-center gap-2
            ${isLoading
              ? 'opacity-75 cursor-not-allowed'
              : 'hover:from-purple-600 hover:to-pink-600 hover:scale-[1.02] shadow-lg shadow-purple-500/20'
            }
          `}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Finding Perfect Gifts...</span>
            </div>
          ) : (
            <>
              <Target className="h-5 w-5" />
              Find Perfect Gifts
            </>
          )}
        </button>
      </form>
    </div>
  );
}