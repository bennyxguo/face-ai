import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { notify } from '../../components/notification/notificationSlice';
import { store } from '../store';

/**
 * Log a warning and show a toast!
 */
export const apiErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
  if (isRejectedWithValue(action)) {
    console.warn('We got a rejected action!');
    console.log(action);
    store.dispatch(
      notify({
        type: 'ERROR',
        message: action.payload.data
      })
    );
  }

  return next(action);
};
