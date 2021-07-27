import { configureStore } from '@reduxjs/toolkit';

import userReducer from '../components/user/userSlice';
import profileReducer from '../components/profile/profileSlice';
import notificationReducer from '../components/notification/notificationSlice';

// Using RTK Query
// @see https://redux-toolkit.js.org/tutorials/rtk-query
import { faceaiApi } from './services/faceaiApi';

import { apiErrorHandler } from './middlewares/apiErrorHandler';

export const store = configureStore({
  reducer: {
    [faceaiApi.reducerPath]: faceaiApi.reducer,
    user: userReducer,
    profile: profileReducer,
    notification: notificationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiErrorHandler, faceaiApi.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
