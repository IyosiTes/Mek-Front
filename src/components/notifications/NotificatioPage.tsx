import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NotificationCard from "./NotificationCard";

import type { Notification } from "../../types/communities";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../community/communityapi";

import BottomNav from "../../community/components/BottomNav";

export default function NotificationPage() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);
  const isLoggedIn = !!localStorage.getItem("access");
  useEffect(() => {
  if (!isLoggedIn) {
    navigate("/login");
    return;
  }

  loadNotifications();
}, [isLoggedIn, navigate]);
  async function loadNotifications() {
    try {
      setLoading(true);

      const data = await getNotifications();

      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleNotificationClick(
    notification: Notification
  ) {
    try {
      if (!notification.is_read) {
        await markNotificationRead(notification.id);

        setNotifications((prev) =>
          prev.map((item) =>
            item.id === notification.id
              ? {
                  ...item,
                  is_read: true,
                }
              : item
          )
        );
      }

      if (notification.post_id) {
        navigate(`/community/post/${notification.post_id}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleMarkAll() {
    try {
      setMarkingAll(true);

      await markAllNotificationsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          is_read: true,
        }))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setMarkingAll(false);
    }
  }

  const unreadCount = notifications.filter(
    (n) => !n.is_read
  ).length;

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="sticky top-0 z-20 bg-black border-b border-zinc-800 px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">
            Alerts
          </h1>

          <button
            disabled={markingAll || unreadCount === 0}
            onClick={handleMarkAll}
            className="
              text-sm
              text-red-500
              disabled:text-zinc-600
              disabled:cursor-not-allowed
            "
          >
            Mark all read
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-3 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="
                  h-24
                  rounded-xl
                  bg-zinc-900
                  animate-pulse
                "
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-5xl">
              🔔
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              You're all caught up
            </h2>

            <p className="text-zinc-500 mt-2">
              New notifications will appear here.
            </p>
          </div>
        )}

        {/* Notifications */}
        {!loading && notifications.length > 0 && (
          <div className="p-4 space-y-3">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}