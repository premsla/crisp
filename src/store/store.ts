import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import interviewReducer from '../features/interviewSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['interview'],
};

const rootReducer = {
  interview: interviewReducer,
};

const persistedInterview = persistReducer(persistConfig, interviewReducer);

export const store = configureStore({
  reducer: {
    interview: persistedInterview,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
