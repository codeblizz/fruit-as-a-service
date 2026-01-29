"use client";

import { Button } from "../../atoms/button";
import { cn } from "@/packages/helpers/src/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import {
  BellIcon,
  CheckIcon,
  SparklesIcon,
  X, 
  Info, 
  AlertCircle, 
  AlertTriangle
,
  BellIcon as BellSolidIcon,
} from "lucide-react";

export interface NotificationData {
  id: string;
  type:
    | "info"
    | "success"
    | "warning"
    | "error"
    | "promotion"
    | "order"
    | "delivery";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: Record<string, any>;
  action?: {
    label: string;
    onClick: () => void;
  };
  image?: string;
  priority?: "low" | "medium" | "high";
}

interface NotificationSystemProps {
  notifications: NotificationData[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  maxVisible?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
}

export function NotificationSystem({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
  maxVisible = 5,
  position = "top-right",
  className,
}: NotificationSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications = notifications.filter((notification) => {
    switch (filter) {
      case "unread":
        return !notification.read;
      case "read":
        return notification.read;
      default:
        return true;
    }
  });

  const visibleNotifications = filteredNotifications.slice(0, maxVisible);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationIcon = (type: NotificationData["type"]) => {
    const iconProps = { className: "w-5 h-5" };

    switch (type) {
      case "success":
        return <CheckIcon {...iconProps} className="w-5 h-5 text-green-500" />;
      case "error":
        return (
          <AlertCircle
            {...iconProps}
            className="w-5 h-5 text-red-500"
          />
        );
      case "warning":
        return (
          <  AlertTriangle

            {...iconProps}
            className="w-5 h-5 text-yellow-500"
          />
        );
      case "promotion":
        return (
          <SparklesIcon {...iconProps} className="w-5 h-5 text-purple-500" />
        );
      case "order":
        return <span className="text-lg">🛒</span>;
      case "delivery":
        return <span className="text-lg">🚚</span>;
      default:
        return (
          <Info
            {...iconProps}
            className="w-5 h-5 text-blue-500"
          />
        );
    }
  };

  const getNotificationColor = (type: NotificationData["type"]) => {
    switch (type) {
      case "success":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      case "warning":
        return "border-yellow-200 bg-yellow-50";
      case "promotion":
        return "border-purple-200 bg-purple-50";
      case "order":
        return "border-blue-200 bg-blue-50";
      case "delivery":
        return "border-orange-200 bg-orange-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Notification Button */}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-muted"
      >
        {unreadCount > 0 ? (
          <BellSolidIcon className="w-6 h-6 text-primary" />
        ) : (
          <BellIcon className="w-6 h-6" />
        )}

        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
      </Button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute z-50 w-96 bg-ghost-apple border rounded-lg shadow-lg",
              position === "top-right" && "top-full right-0 mt-2",
              position === "top-left" && "top-full left-0 mt-2",
              position === "bottom-right" && "bottom-full right-0 mb-2",
              position === "bottom-left" && "bottom-full left-0 mb-2"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={onMarkAllAsRead}
                    >
                      Mark all read
                    </Button>
                  )}
                  {notifications.length > 0 && (
                    <Button size="sm" variant="outline" onClick={onClearAll}>
                      Clear all
                    </Button>
                  )}
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2">
                {(["all", "unread", "read"] as const).map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={cn(
                      "px-3 py-1 text-sm rounded-full capitalize transition-colors",
                      filter === filterType
                        ? "bg-primary text-primary/50"
                        : "bg-muted hover:bg-muted/50"
                    )}
                  >
                    {filterType}
                    {filterType === "unread" && unreadCount > 0 && (
                      <span className="ml-1 bg-primary/50 text-primary rounded-full px-1.5 py-0.5 text-xs">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {visibleNotifications.length === 0 ? (
                <div className="p-8 text-center text-muted/50">
                  <BellIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No notifications</p>
                  <p className="text-sm mt-1">You're all caught up!</p>
                </div>
              ) : (
                <div className="p-2">
                  <AnimatePresence>
                    {visibleNotifications.map((notification, index) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={onMarkAsRead}
                        onDelete={onDelete}
                        index={index}
                        formatTimestamp={formatTimestamp}
                        getNotificationIcon={getNotificationIcon}
                        getNotificationColor={getNotificationColor}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {filteredNotifications.length > maxVisible && (
              <div className="p-4 border-t text-center">
                <p className="text-sm text-muted/50">
                  Showing {maxVisible} of {filteredNotifications.length}{" "}
                  notifications
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Individual Notification Item Component
interface NotificationItemProps {
  notification: NotificationData;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  index: number;
  formatTimestamp: (timestamp: Date) => string;
  getNotificationIcon: (type: NotificationData["type"]) => React.ReactNode;
  getNotificationColor: (type: NotificationData["type"]) => string;
}

function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  index,
  formatTimestamp,
  getNotificationIcon,
  getNotificationColor,
}: NotificationItemProps) {
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className={cn(
        "mb-2 p-3 rounded-lg border transition-all duration-200 cursor-pointer group hover:shadow-md",
        notification.read
          ? "bg-ghost-apple"
          : getNotificationColor(notification.type),
        !notification.read && "border-l-4 border-l-primary"
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="mt-0.5 flex-shrink-0">
          {getNotificationIcon(notification.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h4
                className={cn(
                  "font-medium text-sm",
                  !notification.read && "text-primary"
                )}
              >
                {notification.title}
              </h4>
              <p className="text-sm text-muted/50 mt-1 line-clamp-2">
                {notification.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {!notification.read && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsRead(notification.id);
                  }}
                  className="h-6 w-6 hover:bg-ghost-apple"
                >
                  <CheckIcon className="w-3 h-3" />
                </Button>
              )}
              <Button
                size="icon"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notification.id);
                }}
                className="h-6 w-6 hover:bg-ghost-apple"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Image */}
          {notification.image && (
            <div className="mt-2">
              <img
                src={notification.image}
                alt=""
                className="w-full h-20 object-cover rounded"
              />
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted/50">
              {formatTimestamp(notification.timestamp)}
            </span>

            {/* Action Button */}
            {notification.action && (
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  notification.action?.onClick();
                }}
                className="h-6 px-2 text-xs"
              >
                {notification.action.label}
              </Button>
            )}

            {/* Priority Indicator */}
            {notification.priority === "high" && (
              <span className="w-2 h-2 bg-red-500 rounded-full" />
            )}
          </div>
        </div>

        {/* Unread Indicator */}
        {!notification.read && (
          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
        )}
      </div>
    </motion.div>
  );
}

// Toast Notification Component (for real-time notifications)
export interface ToastNotificationProps
  extends Omit<NotificationData, "timestamp"> {
  duration?: number;
  onClose: () => void;
}

export function ToastNotification({
  type,
  title,
  message,
  action,
  image,
  duration = 5000,
  onClose,
}: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastColor = () => {
    switch (type) {
      case "success":
        return "border-green-500 bg-green-50";
      case "error":
        return "border-red-500 bg-red-50";
      case "warning":
        return "border-yellow-500 bg-yellow-50";
      case "promotion":
        return "border-purple-500 bg-purple-50";
      default:
        return "border-blue-500 bg-blue-50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.3 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed top-4 right-4 z-50 w-96 p-4 rounded-lg border-l-4 shadow-lg",
        getToastColor()
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">
          {type === "success" && (
            <CheckIcon className="w-5 h-5 text-green-500" />
          )}
          {type === "error" && (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          {type === "warning" && (
            <  AlertTriangle
 className="w-5 h-5 text-yellow-500" />
          )}
          {type === "info" && (
            <Info className="w-5 h-5 text-blue-500" />
          )}
          {type === "promotion" && (
            <SparklesIcon className="w-5 h-5 text-purple-500" />
          )}
          {type === "order" && <span className="text-lg">🛒</span>}
          {type === "delivery" && <span className="text-lg">🚚</span>}
        </div>

        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-sm text-muted/50 mt-1">{message}</p>

          {image && (
            <img
              src={image}
              alt=""
              className="w-full h-16 object-cover rounded mt-2"
            />
          )}

          {action && (
            <Button
              size="sm"
              variant="outline"
              onClick={action.onClick}
              className="mt-2"
            >
              {action.label}
            </Button>
          )}
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={onClose}
          className="h-6 w-6"
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  );
}

export default NotificationSystem;
