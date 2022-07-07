import {configureStore} from '@reduxjs/toolkit';

import downloadServices from './modules/download/downloadServices';

export const store = configureStore({
  reducer: {
    download: downloadServices,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
