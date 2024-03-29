import { Notification } from '../type/Notification';
import { axiosClient } from './axiosClient';

export const fetchNotifications = async () => {
  const FETCH_NOTIFICATIONS_URL = '/notifications';
  const { data } = await axiosClient.get<Notification[]>(FETCH_NOTIFICATIONS_URL);
  return data;
};

export const readNotifications = async () => {
  const READ_NOTIFICATIONS = '/notifications/seen';
  return await axiosClient.put<Notification>(READ_NOTIFICATIONS);
};

export type NotificationType = 'COMMENT' | 'FOLLOW' | 'LIKE';

export type NotificationParam = {
  notificationType: NotificationType;
  notificationTypeId: string;
  userId: string;
  postId: string | null;
};

export const createNotification = async ({
  notificationTypeId,
  notificationType,
  userId,
  postId,
}: NotificationParam) => {
  const CREATE_NOTIFICATION = '/notifications/create';
  const { data } = await axiosClient.post<Notification>(CREATE_NOTIFICATION, {
    notificationType,
    notificationTypeId,
    userId,
    postId,
  });
  return data;
};
