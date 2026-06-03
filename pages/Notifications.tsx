
import React, { useState, useEffect } from 'react';
import { UserProfile, Notification } from '../types';
import { storageService } from '../services/storageService';

interface NotificationsProps {
  user: UserProfile;
}

const Notifications: React.FC<NotificationsProps> = ({ user }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await storageService.getNotifications();
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    await storageService.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'scheme': return '🎁';
      case 'policy': return '📄';
      default: return '📢';
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated with latest government announcements.</p>
        </div>
        <button className="text-sm text-indigo-600 font-bold hover:underline">Mark all as read</button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {notifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-6 flex items-start space-x-4 transition-colors cursor-pointer hover:bg-gray-50 ${!n.isRead ? 'bg-indigo-50/30' : ''}`}
                onClick={() => markAsRead(n.id)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${n.type === 'scheme' ? 'bg-green-100 text-green-600' :
                  n.type === 'policy' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'
                  }`}>
                  {getIcon(n.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-bold ${!n.isRead ? 'text-gray-900' : 'text-gray-700'}`}>{n.title}</h3>
                    <span className="text-xs text-gray-400">
                      {new Date(n.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{n.message}</p>
                  <div className="mt-3 flex items-center space-x-4">
                    {!n.isRead && <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>}
                    <button className="text-xs text-indigo-600 font-bold hover:underline">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-bold text-gray-800">All caught up!</h3>
            <p className="text-gray-500">You don't have any new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
