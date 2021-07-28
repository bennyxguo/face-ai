import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const storageKey = process.env.REACT_APP_STORAGE_KEY || 'fai_storage';

export interface UserState {
  token: string;
}

const defaultState: UserState = {
  token: ''
};

const getStoredState = (): UserState => {
  let state = defaultState;
  const storedState = localStorage.getItem(storageKey);
  if (storedState) Object.assign(state, { token: storedState });
  return state;
};

const initialState: UserState = getStoredState();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signToken: (state, action: PayloadAction<string>) => {
      state.token = `Bearer ${action.payload}`;
      localStorage.setItem(storageKey, state.token);
    },
    revokeToken: (state) => {
      Object.assign(state, defaultState);
      localStorage.removeItem(storageKey);
    }
  }
});

export const { signToken, revokeToken } = userSlice.actions;

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
