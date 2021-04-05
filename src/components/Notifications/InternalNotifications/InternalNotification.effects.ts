import { createEvent, createStore } from 'effector';
import { INotification } from '../models/INotification';

export const addIntenalNotification = createEvent<INotification>();
export const clearInternalNotifications = createEvent();
export const removeInternalNotification = createEvent<string>();
export const $internalNotification = createStore<Array<INotification>>([], {
  name: 'internalNotifications',
})
  .on(addIntenalNotification, (state, payload: INotification) => [payload, ...state])
  .on(removeInternalNotification, (state, payload: string) => state.filter((item) => item.id !== payload))
  .reset(clearInternalNotifications);
