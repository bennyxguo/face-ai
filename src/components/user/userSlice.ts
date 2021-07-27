import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const storageKey = process.env.REACT_APP_STORAGE_KEY || 'fai_storage';

export interface UserState {
  id: number;
  isLogin: boolean;
}

const defaultState: UserState = {
  id: 0,
  isLogin: false
};

const getStoredState = (): UserState => {
  const storedStateString = localStorage.getItem(storageKey);
  let state = defaultState;
  if (storedStateString) {
    const storedStateObj = JSON.parse(storedStateString);
    if (storedStateObj) {
      Object.assign(state, storedStateObj);
    }
  }
  return state;
};

const initialState: UserState = getStoredState();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<number>) => {
      state.isLogin = true;
      state.id = action.payload;
      localStorage.setItem(storageKey, JSON.stringify(state));
    },
    setLogout: (state) => {
      Object.assign(state, defaultState);
      localStorage.removeItem(storageKey);
    }
  }
});

export const { setLogin, setLogout } = userSlice.actions;

export const selectUserId = (state: RootState) => state.user.id;
export const selectLogin = (state: RootState) => state.user.isLogin;

export default userSlice.reducer;
