import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {MenuState} from '../../types/types';
import {fetchMenuItems} from '../thunks/fetchMenuItemsThunk';
import {fetchCategories} from '../thunks/fetchCategoriesThunk';

const initialState: MenuState = {
  items: [],
  categories: [],
  loading: false,
  error: null,
};

export const menuSlice = createSlice({
  name: 'Menu',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMenuItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.items = action.payload;
        console.log('new items', state.items);
        state.loading = false;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategories.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectMenuItems = (state: RootState) => state.menu.items;
export const selectMenuLoading = (state: RootState) => state.menu.loading;
export const selectMenuError = (state: RootState) => state.menu.error;
export const selectCategories = (state: RootState) => state.menu.categories;

export default menuSlice.reducer;
