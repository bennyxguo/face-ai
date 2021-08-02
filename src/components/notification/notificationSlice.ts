import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

enum MessageType {
  SUCCESS,
  INFO,
  ERROR
}

export type NotificationType = keyof typeof MessageType;

export interface NotificationState {
  display: boolean;
  message: string;
  type: NotificationType;
}

const initialState: NotificationState = {
  display: false,
  message: '',
  type: 'SUCCESS'
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notify: (state, action: PayloadAction<{ message: string; type: NotificationType }>) => {
      const { message, type } = action.payload;
      state.display = true;
      state.message = message;
      state.type = type;
    },
    hideNotification: (state) => {
      state.display = false;
    }
  }
});

export const { notify, hideNotification } = notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;
