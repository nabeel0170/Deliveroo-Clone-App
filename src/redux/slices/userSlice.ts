import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {FormData, LoginFormData, userStateProps} from '../../types/types';
import {ApiEndpoints} from '../../constants/apiEndpoints';
import axios from 'axios';
import {API_KEY, BASE_URL} from '@env';

export interface LoginResponse {
  success: boolean;
  token: string;
  message?: string;
}

const initialState: userStateProps = {
  isLoggedIn: false,
  name: undefined,
  token: null,
  expiry: null,
  authenticationState: '',
  isLoading: false,
  requestError: null,
  responseError: null,
};

export const verifyEmailThunk = createAsyncThunk<boolean, FormData>(
  ApiEndpoints.VERIFY_EMAIL,
  async (formData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${ApiEndpoints.VERIFY_EMAIL}`,
        formData,
        {
          headers: {
            'api-key': API_KEY,
          },
        },
      );
      return response.data.success as boolean;
    } catch (error) {
      const errorMessage =
        (error as Error).message || 'Cannot Process Request Right Now';
      return rejectWithValue(errorMessage);
    }
  },
);
export const loginThunk = createAsyncThunk<LoginResponse, LoginFormData>(
  ApiEndpoints.LOGIN,
  async (data, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${ApiEndpoints.LOGIN}`,
        data,
        {
          headers: {
            'api-key': API_KEY,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage = (error as Error).message || 'Cannot Login Right Now';
      return rejectWithValue(errorMessage);
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.token = action.payload;
      state.expiry = Date.now() + 24 * 60 * 60 * 1000;
      state.authenticationState = 'loggedIn';
    },
    setLoggedOut(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.expiry = null;
      state.authenticationState = '';
      state.isLoading = false;
    },
    setSignUp(state) {
      state.authenticationState = 'signup';
    },
    setLogin(state) {
      state.authenticationState = 'login';
    },
    setEmail(state) {
      state.authenticationState = 'email';
    },
    resetResponseError(state) {
      state.responseError = null;
    },
    resetRequestError(state) {
      state.requestError = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(verifyEmailThunk.pending || loginThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(verifyEmailThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.authenticationState = 'login';
        } else {
          state.authenticationState = 'signup';
        }
        state.isLoading = false;
        resetResponseError();
      })

      .addCase(verifyEmailThunk.rejected, (state, action) => {
        state.authenticationState = '';
        state.requestError = action.payload as string;
        state.isLoading = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        if (action.payload.success) {
          const token = action.payload.token;
          state.isLoggedIn = true;
          state.token = token;
          state.authenticationState = 'loggedIn';
          resetResponseError();
        } else {
          state.responseError =
            action.payload.message || 'Login failed! Invalid Credentials';
        }
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.requestError = action.payload as string;
        state.isLoading = false;
      });
  },
});

export const {
  setLoggedIn,
  setLoggedOut,
  setSignUp,
  setLogin,
  setEmail,
  resetResponseError,
  resetRequestError,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
