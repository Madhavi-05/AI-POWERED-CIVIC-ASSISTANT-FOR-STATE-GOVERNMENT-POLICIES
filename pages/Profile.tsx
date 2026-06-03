
import React, { useState } from 'react';
import { UserProfile, Language, Occupation, Category, Gender } from '../types';
import { DISTRICTS, UI_STRINGS } from '../constants';
import { storageService } from '../services/storageService';

interface ProfileProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState<UserProfile>({ ...user });
  const [isEditing, setIsEditing] = useState(false);
  const t = UI_STRINGS[user.preferredLanguage];

  const handleSave = async () => {
    try {
      const updatedUser = await storageService.updateProfile(formData);
      onUpdate(updatedUser);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your citizen profile for better recommendations.</p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
            }`}
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-indigo-600"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-12 flex items-end space-x-6 mb-8">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&size=128`}
              className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg"
              alt="Avatar"
            />
            <div className="pb-2">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</label>
                {isEditing ? (
                  <input
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  <p className="text-lg font-medium text-gray-800">{user.name}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">District</label>
                {isEditing ? (
                  <select
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value })}
                  >
                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                ) : (
                  <p className="text-lg font-medium text-gray-800">{user.district}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Preferred Language</label>
                {isEditing ? (
                  <select
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    value={formData.preferredLanguage}
                    onChange={e => setFormData({ ...formData, preferredLanguage: e.target.value as Language })}
                  >
                    <option value={Language.ENGLISH}>English</option>
                    <option value={Language.TELUGU}>Telugu</option>
                  </select>
                ) : (
                  <p className="text-lg font-medium text-gray-800">{user.preferredLanguage}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Occupation</label>
                {isEditing ? (
                  <select
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    value={formData.occupation}
                    onChange={e => setFormData({ ...formData, occupation: e.target.value as Occupation })}
                  >
                    {Object.values(Occupation).map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <p className="text-lg font-medium text-gray-800">{user.occupation}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Income Group</label>
                {isEditing ? (
                  <select
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    value={formData.incomeRange}
                    onChange={e => setFormData({ ...formData, incomeRange: e.target.value })}
                  >
                    <option>Below ₹2 Lakhs</option>
                    <option>₹2 Lakhs - ₹5 Lakhs</option>
                    <option>₹5 Lakhs - ₹10 Lakhs</option>
                    <option>Above ₹10 Lakhs</option>
                  </select>
                ) : (
                  <p className="text-lg font-medium text-gray-800">{user.incomeRange}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Gender</label>
                {isEditing ? (
                  <select
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value as Gender })}
                  >
                    {Object.values(Gender).map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                ) : (
                  <p className="text-lg font-medium text-gray-800">{user.gender}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Category</label>
                {isEditing ? (
                  <select
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as Category })}
                  >
                    {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                ) : (
                  <p className="text-lg font-medium text-gray-800">{user.category}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 rounded-2xl p-6 border border-orange-100 flex items-start space-x-4">
        <div className="text-2xl">💡</div>
        <div>
          <h3 className="font-bold text-orange-800">Why accurate data matters?</h3>
          <p className="text-orange-700 text-sm mt-1">Our AI Assistant uses these details to automatically check your eligibility for Telangana schemes like Rythu Bandhu, Dalit Bandhu, and ePass Scholarships. Keeping this updated ensures you never miss a benefit you're entitled to.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
