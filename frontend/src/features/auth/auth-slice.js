import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from './auth-service';

// Get user from local Storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

// Register
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: {
    [registerUser.pending]: state => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
      state.user = null;
    },
    [loginUser.pending]: state => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
      state.user = null;
    },
    [logoutUser.fulfilled]: state => {
      state.user = null;
    },
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
