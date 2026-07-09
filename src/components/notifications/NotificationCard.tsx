import type{ Notification } from "../../types/communities";
import { timeAgo } from "../../utils/timeAgo";
import { FiBell, FiMessageCircle } from "react-icons/fi";
import { MdCampaign } from "react-icons/md";

type Props = {
  notification: Notification;
  onClick: (notification: Notification) => void;
};

export default function NotificationCard({
  notification,
  onClick,
}: Props) {
  const icon = () => {
    switch (notification.notification_type) {
      case "comment_on_post":
        return (
          <FiMessageCircle
            size={20}
            className="text-red-500 shrink-0"
          />
        );

      case "reply_on_comment":
        return (
          <FiMessageCircle
            size={20}
            className="text-orange-400 shrink-0"
          />
        );

      case "admin_announcement":
        return (
          <MdCampaign
            size={22}
            className="text-yellow-400 shrink-0"
          />
        );

      default:
        return (
          <FiBell
            size={20}
            className="text-red-500 shrink-0"
          />
        );
    }
  };

  return (
    <button
      onClick={() => onClick(notification)}
      className={`
        w-full
        text-left

        rounded-xl

        border

        transition

        p-4

        ${
          notification.is_read
            ? "bg-zinc-900 border-zinc-800"
            : "bg-zinc-900/80 border-red-500/40"
        }

        hover:border-red-500
      `}
    >
      <div className="flex gap-4 items-start">
        <div className="relative">
          {icon()}

          {!notification.is_read && (
            <span
              className="
              absolute
              -top-1
              -right-1

              h-2.5
              w-2.5

              rounded-full

              bg-red-500
            "
            />
          )}
        </div>

        <div className="flex-1">
          <p className="text-white text-sm leading-6">
            {notification.message}
          </p>

          <p className="mt-2 text-xs text-zinc-500">
            {timeAgo(
              (notification.created_at),
           
            )}
          </p>
        </div>
      </div>
    </button>
  );
}