import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false,
  showFilters: {
    class: false,
    units: false,
    status: false
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    toggleFilterDropdown: (state, action) => {
      const filterType = action.payload;
      state.showFilters[filterType] = !state.showFilters[filterType];
    },
    closeAllFilterDropdowns: (state) => {
      state.showFilters = {
        class: false,
        units: false,
        status: false
      };
    }
  }
});

export const { 
  toggleDarkMode, 
  setDarkMode, 
  toggleFilterDropdown, 
  closeAllFilterDropdowns 
} = uiSlice.actions;
export default uiSlice.reducer;
