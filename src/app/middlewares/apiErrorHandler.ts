import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { notify } from '../../components/notification/notificationSlice';
import { revokeToken } from '../../components/user/userSlice';
import { store } from '../store';

/**
 * Log a warning and show a toast!
 */
export const apiErrorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
  if (isRejectedWithValue(action)) {
    // console.warn('We got a rejected action!');
    const { status } = action.payload;

    if (status === 401) {
      store.dispatch(
        notify({
          type: 'INFO',
          message: 'Your login expired, please signin again.'
        })
      );
      store.dispatch(revokeToken());
      return next(action);
    }

    store.dispatch(
      notify({
        type: 'ERROR',
        message: action.payload.data
      })
    );
  }

  return next(action);
};
