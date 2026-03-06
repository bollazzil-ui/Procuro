// pages/Notifications.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Bell, Check, Trash2, Loader2, AlertCircle, Handshake, MessageSquare, Info, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  type: 'match_request' | 'match_update' | 'system_alert' | 'message';
  title: string;
  message: string;
  is_read: boolean;
  action_link?: string;
  created_at: string;
}

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('profile_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (err: any) {
      console.error('Error fetching notifications:', err);
      setError('Could not load notifications.');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('profile_id', user?.id)
        .eq('is_read', false);

      if (error) throw error;
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'match_request': return <Handshake className="text-blue-500" size={20} />;
      case 'match_update': return <Check className="text-green-500" size={20} />;
      case 'message': return <MessageSquare className="text-purple-500" size={20} />;
      case 'system_alert': return <AlertCircle className="text-amber-500" size={20} />;
      default: return <Info className="text-slate-500" size={20} />;
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="pt-36 pb-20 px-4 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Bell size={24} />
            </div>
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Inbox</span>
              <h1 className="text-3xl font-black text-blue-950 mt-1">Notifications</h1>
              <p className="text-slate-500 mt-1">
                You have {unreadCount} unread message{unreadCount !== 1 && 's'}.
              </p>
            </div>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {/* Notifications List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : notifications.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell size={32} />
            </div>
            <h3 className="text-xl font-bold text-blue-950">You're all caught up!</h3>
            <p className="text-slate-500 mt-2">No new notifications right now.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex gap-4 p-5 rounded-2xl border transition-all ${
                  notif.is_read ? 'bg-white border-slate-100' : 'bg-blue-50/30 border-blue-200 shadow-sm'
                }`}
              >
                <div className="mt-1 shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notif.is_read ? 'bg-slate-50' : 'bg-white shadow-sm'}`}>
                    {getIcon(notif.type)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 mb-1">
                    <h4 className={`text-base ${notif.is_read ? 'font-semibold text-slate-700' : 'font-bold text-blue-950'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                      {new Date(notif.created_at).toLocaleString('de-CH', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <p className={`text-sm mb-3 ${notif.is_read ? 'text-slate-500' : 'text-slate-700'}`}>
                    {notif.message}
                  </p>

                  <div className="flex items-center gap-3">
                    {notif.action_link && (
                      <Link
                        to={notif.action_link}
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                      >
                        View Details <ExternalLink size={14} />
                      </Link>
                    )}

                    {!notif.is_read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                   <button
                     onClick={() => deleteNotification(notif.id)}
                     className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                     title="Delete"
                   >
                     <Trash2 size={18} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}