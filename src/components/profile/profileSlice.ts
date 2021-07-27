import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ProfileState {
  open: boolean;
}

const initialState: ProfileState = {
  open: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    toggleDisplay: (state) => {
      state.open = !state.open;
    },
    closeProfile: (state) => {
      state.open = false;
    }
  }
});

export const { toggleDisplay, closeProfile } = profileSlice.actions;
export const selectProfileDisplay = (state: RootState) => state.profile.open;

export default profileSlice.reducer;
