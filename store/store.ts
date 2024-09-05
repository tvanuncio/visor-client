import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tabBarSlice from './tabBarSlice';
import deviceSlice from './deviceSlice';
import createUserSlice from './createUserSlice';
import lockAppSlice from './lockAppSlice';
import bannerSlice from './bannerSlice';
import directorySlice from './directorySlice';
import createDirectorySlice from './createDirectorySlice';
import deleteDirectorySlice from './deleteDirectorySlice';
import renameDirectorySlice from './renameDirectorySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tabBar : tabBarSlice,
    device : deviceSlice,
    account : createUserSlice,
    app : lockAppSlice,
    banners : bannerSlice,
    directory : directorySlice,
    createDirectory : createDirectorySlice,
    deleteDirectory : deleteDirectorySlice,
    renameDirectory : renameDirectorySlice,
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
