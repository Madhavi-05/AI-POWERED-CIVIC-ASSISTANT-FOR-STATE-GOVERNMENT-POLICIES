
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ChatMessage, Language } from '../types';
import { geminiService } from '../services/geminiService';
import { ragService } from '../services/ragService';
import { storageService } from '../services/storageService';
import { UI_STRINGS } from '../constants';
import ReactMarkdown from 'react-markdown';

interface AskAssistantProps {
  user: UserProfile;
}

const AskAssistant: React.FC<AskAssistantProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: user.preferredLanguage === Language.TELUGU
        ? `నమస్తే ${user.name}! నేను మీకు ఎలా సహాయం చేయగలను? మీరు తెలంగాణ ప్రభుత్వ పథకాలు, అర్హతలు లేదా దరఖాస్తు విధానాల గురించి అడగవచ్చు.`
        : `Hello ${user.name}! I am your Telangana Civic Assistant. How can I help you today? You can ask about government schemes, eligibility, or application processes.`,
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRagReady, setIsRagReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = UI_STRINGS[user.preferredLanguage];

  useEffect(() => {
    const initRag = async () => {
      try {
        await ragService.initialize();
        setIsRagReady(true);
      } catch (error) {
        console.error("Failed to initialize RAG:", error);
        // Fallback or retry logic could go here
        setIsRagReady(true); // Proceed anyway, geminiService handles errors
      }
    };
    initRag();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Save search to history
    await storageService.addHistory({
      query: input,
      category: 'Policy Inquiry'
    });

    try {
      const response = await geminiService.askQuestion(input, user, messages);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-600 p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
          <div>
            <h2 className="font-bold">{t.askAi}</h2>
            <p className="text-xs text-indigo-100">Telangana Government Portal • AI Assistance</p>
          </div>
        </div>
        <button
          onClick={() => setMessages([messages[0]])}
          className="text-xs bg-white/10 px-3 py-1 rounded-full hover:bg-white/20"
        >
          Clear Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === 'user'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-800'
              }`}>
              <div className="prose prose-sm max-w-none prose-headings:text-indigo-600 prose-headings:font-bold prose-headings:mt-2">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>

              {msg.references && (
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs font-bold text-gray-500 mb-2">{t.references}:</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.references.map((ref, idx) => (
                      <div key={idx} className="bg-white px-3 py-1 rounded-md text-xs border border-gray-200 shadow-sm">
                        <span className="font-bold text-indigo-600">{ref.title}</span>
                        {ref.goNumber && <span className="text-gray-400 ml-1">({ref.goNumber})</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl p-4 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Analyzing Telangana Policy Records...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* RAG Status */}
      {!isRagReady && (
        <div className="px-4 py-2 bg-indigo-50 border-t border-indigo-100 flex items-center space-x-2">
          <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-[10px] text-indigo-600 font-medium">Indexing Policy Knowledge Base...</span>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="mb-2 flex gap-2 flex-wrap">
          {[
            'How to apply for Post Matric Scholarship in TS ePass?',
            'Rythu Bandhu eligibility for farmers',
            'Aasara Pensions requirements',
            'Dalit Bandhu benefit details'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="text-[10px] bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-full text-indigo-700 transition-colors border border-indigo-100"
            >
              {suggestion}
            </button>
          ))}
        </div>
        <form onSubmit={handleSend} className="flex space-x-2">
          <input
            type="text"
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            placeholder={t.searchPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-indigo-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AskAssistant;
