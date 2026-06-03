
import React, { useState, useEffect } from 'react';
import { UserProfile, SearchHistoryItem } from '../types';
import { storageService } from '../services/storageService';
import { Link } from 'react-router-dom';

interface HistoryProps {
  user: UserProfile;
}

const History: React.FC<HistoryProps> = ({ user }) => {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await storageService.getHistory();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-900">Search History</h1>
        <p className="text-gray-500 mt-1">View your past queries and AI responses.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {history.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {history.map((item) => (
              <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">🔍</div>
                  <div>
                    <h3 className="font-bold text-gray-800">"{item.query}"</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-gray-400">{new Date(item.timestamp).toLocaleString()}</span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded uppercase font-bold tracking-tight">{item.category}</span>
                    </div>
                  </div>
                </div>
                <Link to="/ask" className="text-indigo-600 text-sm font-bold hover:underline">Re-ask Assistant</Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">🕰️</div>
            <h3 className="text-lg font-bold text-gray-800">No history yet</h3>
            <p className="text-gray-500">Your searches and queries will appear here.</p>
            <Link to="/ask" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-bold">Start Searching</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
