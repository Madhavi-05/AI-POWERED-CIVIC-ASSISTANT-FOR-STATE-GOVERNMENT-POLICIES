
import React, { useState, useEffect } from 'react';
import { UserProfile, Language, Notification } from '../types';
import { SCHEMES, UI_STRINGS } from '../constants';
import { Link } from 'react-router-dom';
import { storageService } from '../services/storageService';

interface DashboardProps {
  user: UserProfile;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const t = UI_STRINGS[user.preferredLanguage];
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await storageService.getNotifications();
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  // Filter policies and alerts
  const policyNotifications = notifications.filter(n => n.type === 'policy');
  const pendingAlerts = notifications.filter(n => !n.isRead);

  // Simple eligibility logic for "recommendations"
  const recommendedSchemes = SCHEMES.filter(scheme => {
    const isFarmer = user.occupation === 'Farmer' && scheme.categoryTags.includes('Agriculture');
    const isStudent = user.occupation === 'Student' && (scheme.categoryTags.includes('Education') || scheme.categoryTags.includes('Scholarship'));
    const isBPL = user.incomeRange === 'Below ₹2 Lakhs' || user.incomeRange === '₹2 Lakhs - ₹5 Lakhs';
    const isFemale = user.gender === 'Female';
    const isWomenScheme = scheme.categoryTags.includes('Women') && isFemale;

    return isFarmer || isStudent || (isBPL && scheme.categoryTags.includes('Welfare')) || isWomenScheme;
  });

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.welcome}, {user.name}</h1>
          <p className="text-gray-500 mt-1">Personalized government insights for {user.district} District.</p>
        </div>
        <Link to="/ask" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-100">
          <span>💬</span>
          <span>{t.askAi}</span>
        </Link>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl">📋</div>
          <div>
            <p className="text-gray-500 text-sm">Eligible Schemes</p>
            <p className="text-2xl font-bold text-gray-900">{recommendedSchemes.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center text-2xl">⚡</div>
          <div>
            <p className="text-gray-500 text-sm">New Policies</p>
            <p className="text-2xl font-bold text-gray-900">{policyNotifications.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl">🔔</div>
          <div>
            <p className="text-gray-500 text-sm">Pending Alerts</p>
            <p className="text-2xl font-bold text-gray-900">{pendingAlerts.length}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommended Schemes */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
            <span>✨</span>
            <span>{t.schemesFound}</span>
          </h2>
          <div className="space-y-4">
            {recommendedSchemes.map(scheme => (
              <div key={scheme.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {scheme.department}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">Ref: {scheme.goNumber}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{scheme.name}</h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{scheme.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {scheme.categoryTags.map(tag => (
                    <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">#{tag}</span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button className="text-indigo-600 font-bold text-sm hover:underline">{t.eligibility}</button>
                  <Link to="/ask" className="text-gray-400 hover:text-indigo-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* New Policies & Activity */}
        <section className="space-y-6">
          {policyNotifications.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                <span>📄</span>
                <span>Active Policies</span>
              </h2>
              <div className="space-y-4">
                {policyNotifications.map(policy => (
                  <div key={policy.id} className="p-4 border border-gray-50 rounded-xl bg-orange-50/20">
                    <h3 className="font-bold text-gray-900">{policy.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{policy.message}</p>
                    <span className="text-[10px] text-gray-400 mt-2 block uppercase font-bold tracking-tighter">
                      Released: {new Date(policy.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">How can I apply for Rythu Bandhu?</h3>
              <p className="text-indigo-200 mb-6 text-sm">The Assistant can guide you through the entire process including documentation needed.</p>
              <Link to="/ask" className="inline-block bg-white text-indigo-900 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition-colors">Start Chat</Link>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-800 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
