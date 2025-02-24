import {
  AdminNotificationStatus,
  UserNotificationStatus,
} from '@/constants/notificationStatus';

export interface NotificationProps {
  notificationId?: number;
  message: string;
  link: string;
  isRead: boolean;
  status: AdminNotificationStatus | UserNotificationStatus;
  createdAt: string;
}

export interface NotificationCount {
  notificationCount: number;
}
