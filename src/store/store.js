import { configureStore } from '@reduxjs/toolkit';
import chaptersReducer from './chaptersSlice';
import filtersReducer from './filtersSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    chapters: chaptersReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
});

export default store;

