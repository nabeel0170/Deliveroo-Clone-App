import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_KEY, BASE_URL} from '@env';
import {ApiEndpoints} from '../../constants/apiEndpoints';
import {categories} from '../../types/types';

export const fetchCategories = createAsyncThunk<categories, void>(
  ApiEndpoints.FETCH_CATEGORIES,
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${ApiEndpoints.FETCH_CATEGORIES}`,
        {
          headers: {
            'api-key': API_KEY,
          },
        },
      );
      return response.data as categories;
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Cannot fetch data right now';
      return rejectWithValue(errorMessage);
    }
  },
);
