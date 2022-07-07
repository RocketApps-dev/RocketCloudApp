import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface DownloadState {
  fileId: string;
  progress: number;
}

const initialState: DownloadState = {
  fileId: '',
  progress: 0,
};

export const downloadServicesSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    setProgressDownload: (
      state: {progress: number; fileId: string},
      action: PayloadAction<{fileId: string; progress: number}>,
    ) => {
      state.fileId = action.payload.fileId;
      state.progress = action.payload.progress;
    },
  },
});

export const {setProgressDownload} = downloadServicesSlice.actions;

export default downloadServicesSlice.reducer;
