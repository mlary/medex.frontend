import React from 'react';
import { Snackbar, makeStyles, createStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import NotificationTypes from '../../../constants/notificationTypes';
import { useTranslation } from 'react-i18next';
import { $internalNotification, removeInternalNotification } from './InternalNotification.effects';
import { INotification } from '../models/INotification';
import { useStore } from 'effector-react';

const useStyles = makeStyles(() =>
  createStyles({
    NotificationContainer: {
      display: 'flex',
      position: 'fixed',
      justifyContent: 'center',
      top: 20,
      margin: 'auto',
      zIndex: 1000000,
      width: '100%',
    },
  })
);
type Severty = 'success' | 'info' | 'warning' | 'error' | undefined;
const Notifications = () => {
  useTranslation();
  const notifications = useStore($internalNotification);
  const handleClose = (notification: INotification) => {
    removeInternalNotification(notification.id);
  };
  const classes = useStyles();
  const getAutoHideDururationByType = (type: NotificationTypes): number => {
    switch (type) {
      case NotificationTypes.error:
        return 10000;
      default:
        return 7000;
    }
  };
  const getNotificationServerty = (type: NotificationTypes): Severty => {
    switch (type) {
      case NotificationTypes.error:
        return 'error';
      case NotificationTypes.success:
        return 'success';
      case NotificationTypes.warning:
        return 'warning';
      default:
        return 'info';
    }
  };
  return notifications && notifications.length > 0 ? (
    <div className={classes.NotificationContainer}>
      {notifications.map((x) => (
        <Snackbar
          open
          autoHideDuration={getAutoHideDururationByType(x.type)}
          key={`message-${x.id}`}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          onClose={() => {
            handleClose(x);
          }}
        >
          <MuiAlert
            elevation={6}
            severity={getNotificationServerty(x.type)}
            onClose={() => {
              handleClose(x);
            }}
          >
            {x.message}
          </MuiAlert>
        </Snackbar>
      ))}
    </div>
  ) : null;
};
export default Notifications;
