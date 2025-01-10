import React, { useState } from 'react';
import { Clock, X, CalendarDays, History } from 'lucide-react';
import Header from './components/Header';
import GiftSuggestionForm from './components/GiftSuggestionForm';
import Footer from './components/Footer';
import AISuggestionCard from './components/AISuggestionCard';
import { generateGiftSuggestions } from './utils/ai';
import { useDarkMode } from './hooks/useDarkMode';

interface HistoryItem {
  date: string;
  suggestion: string;
}

function App() {
  const [isDark, toggleDarkMode] = useDarkMode();
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleGetSuggestions = async (formData: any) => {
    if (!import.meta.env.VITE_GOOGLE_API_KEY) {
      setAiSuggestion('Error: Google API key is not configured. Please check your environment variables.');
      return;
    }

    setLoading(true);
    const prompt = `Suggest a creative DIY gift idea for a ${formData.occasion} with ${formData.timeRequired} available time. The recipient is interested in ${formData.interests.join(', ')}. The crafter's skill level is ${formData.skillLevel}.`;
    
    try {
      const suggestion = await generateGiftSuggestions(prompt);
      if (suggestion) {
        setAiSuggestion(suggestion);
      } else {
        setAiSuggestion('Unable to generate suggestions at the moment. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setAiSuggestion('An error occurred while generating suggestions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSuggestion = (suggestion: string) => {
    const newHistoryItem = {
      date: new Date().toLocaleDateString(),
      suggestion
    };
    setHistory(prev => [newHistoryItem, ...prev]);
    // Show a toast or notification
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn';
    toast.textContent = 'Suggestion saved to history!';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors">
      <Header isDark={isDark} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-['Orbitron']">
            AI-Powered Gift Discovery
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Let AI help you find the perfect gift
          </p>
        </div>

        <GiftSuggestionForm onSubmit={handleGetSuggestions} />

        {(aiSuggestion || loading) && (
          <div className="mt-8">
            <AISuggestionCard
              suggestion={aiSuggestion}
              loading={loading}
              onSave={handleSaveSuggestion}
            />
          </div>
        )}

        <button
          onClick={() => setShowHistory(true)}
          className="fixed bottom-20 right-6 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <History className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {showHistory && (
          <div className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-200 ease-in-out overflow-hidden">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    History
                  </h3>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {history.length > 0 ? (
                  history.map((item, index) => (
                    <div
                      key={index}
                      className="mb-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CalendarDays className="h-4 w-4 text-gray-400" />
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {item.suggestion}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <History className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">No suggestions saved yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;