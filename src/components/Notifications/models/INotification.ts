import NotificationTypes from "../../../constants/notificationTypes";

export interface INotification {
  code: number;
  message: string;
  id: string;
  type: NotificationTypes;
}