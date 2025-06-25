import { configureStore } from '@reduxjs/toolkit';
import networkReducer from './slices/networkSlice';

const store = configureStore({
  reducer: {
    network: networkReducer,
  },
  devTools: true, // Optional for debugging
});

export default store;
