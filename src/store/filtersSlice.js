import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [],
  units: [],
  status: '',
  weakChapters: false,
  sortAscending: true
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setClassFilter: (state, action) => {
      const value = action.payload;
      if (state.classes.includes(value)) {
        state.classes = state.classes.filter(item => item !== value);
      } else {
        state.classes.push(value);
      }
    },
    setUnitFilter: (state, action) => {
      const value = action.payload;
      if (state.units.includes(value)) {
        state.units = state.units.filter(item => item !== value);
      } else {
        state.units.push(value);
      }
    },
    setStatusFilter: (state, action) => {
      state.status = action.payload;
    },
    setWeakChaptersFilter: (state, action) => {
      state.weakChapters = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortAscending = action.payload;
    },
    clearAllFilters: (state) => {
      state.classes = [];
      state.units = [];
      state.status = '';
      state.weakChapters = false;
    }
  }
});

export const { 
  setClassFilter, 
  setUnitFilter, 
  setStatusFilter, 
  setWeakChaptersFilter, 
  setSortOrder, 
  clearAllFilters 
} = filtersSlice.actions;
export default filtersSlice.reducer;