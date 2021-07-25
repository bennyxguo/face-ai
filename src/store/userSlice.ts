import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const storageKey = process.env.REACT_APP_STORAGE_KEY || 'fai_storage';

export interface UserState {
  id: number;
  name: string;
  email: string;
  avatar: string;
  entries: number;
  createdAt: string;
}

const defaultState = {
  id: 0,
  name: '',
  email: '',
  avatar: '',
  entries: 0,
  createdAt: ''
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
    loadUser: (state, action: PayloadAction<UserState>) => {
      const { id, name, email, avatar, entries, createdAt } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.avatar = avatar;
      state.entries = entries;
      state.createdAt = createdAt;
      localStorage.setItem(storageKey, JSON.stringify(state));
    },
    unloadUser: (state) => {
      Object.assign(state, defaultState);
      localStorage.removeItem(storageKey);
    },
    setEntries: (state, action: PayloadAction<number>) => {
      state.entries = action.payload;
      localStorage.setItem(storageKey, JSON.stringify(state));
    }
  }
});

export const { loadUser, unloadUser, setEntries } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
