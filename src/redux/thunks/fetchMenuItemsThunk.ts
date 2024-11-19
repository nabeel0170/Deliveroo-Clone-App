import {createAsyncThunk} from '@reduxjs/toolkit';
import {FoodItems} from '../../types/types';
import axios from 'axios';
import {API_KEY, BASE_URL} from '@env';
import {ApiEndpoints} from '../../constants/apiEndpoints';

export const fetchMenuItems = createAsyncThunk(
  ApiEndpoints.FETCH_MENU_ITEMS,
  async (_, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BASE_URL + ApiEndpoints.FETCH_MENU_ITEMS} `,
        {
          count: '10',
        },
        {
          headers: {
            'api-key': API_KEY,
          },
        },
      );
      return response.data as FoodItems;
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Cannot fetch data right now';
      return rejectWithValue(errorMessage);
    }
  },
);
