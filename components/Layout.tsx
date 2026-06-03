
import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserProfile, Language } from '../types';
import { UI_STRINGS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const t = user ? UI_STRINGS[user.preferredLanguage] : UI_STRINGS[Language.ENGLISH];

  const NavItem = ({ to, label, icon }: { to: string, label: string, icon: string }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 p-3 rounded-lg transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
        }`
      }
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </NavLink>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar for Desktop */}
      {user && (
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-4 hidden md:flex flex-col">
          <div className="mb-8 px-4 flex items-center space-x-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">T</div>
            <h1 className="text-xl font-bold text-gray-800">AI-POWERED CIVIC ASSISTANT</h1>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem to="/dashboard" label={t.dashboard} icon="📊" />
            <NavItem to="/ask" label={t.askAi} icon="💬" />
            <NavItem to="/notifications" label={t.notifications} icon="🔔" />
            <NavItem to="/history" label={t.history} icon="📜" />
            <NavItem to="/profile" label={t.profile} icon="👤" />
          </nav>

          <button
            onClick={onLogout}
            className="mt-auto flex items-center space-x-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Sign Out</span>
          </button>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="md:hidden flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white text-lg font-bold">T</div>
            <h1 className="text-lg font-bold text-gray-800">AI-POWERED CIVIC ASSISTANT</h1>
          </div>
          <div className="hidden md:block">
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Government of Telangana Digital Gateway</span>
          </div>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.district} Dist.</p>
              </div>
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-indigo-100 shadow-sm"
              />
            </div>
          )}
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto w-full">
            {children}
          </div>
        </div>

        {/* Mobile Nav Bar */}
        {user && (
          <nav className="md:hidden bg-white border-t border-gray-200 flex justify-around p-2 sticky bottom-0 z-10">
            <NavLink to="/dashboard" className={({ isActive }) => `p-2 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>📊</NavLink>
            <NavLink to="/ask" className={({ isActive }) => `p-2 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>💬</NavLink>
            <NavLink to="/notifications" className={({ isActive }) => `p-2 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>🔔</NavLink>
            <NavLink to="/history" className={({ isActive }) => `p-2 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`}>📜</NavLink>
          </nav>
        )}
      </main>
    </div>
  );
};

export default Layout;
