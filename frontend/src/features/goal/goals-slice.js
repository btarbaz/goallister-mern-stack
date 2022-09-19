import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { goalsService } from '../goal/goals-service';

const initialState = {
  goals: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  isEditing: false,
  editedGoal: null,
  message: '',
};

export const createUserGoals = createAsyncThunk(
  'goals/postGoals',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.createGoal(goalData, token);
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

export const getUserGoals = createAsyncThunk(
  'goals/getGoals',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.getGoals(token);
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

export const deleteUserGoal = createAsyncThunk(
  'goals/deleteGoal',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.deleteGoal(id, token);
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

export const updateUserGoal = createAsyncThunk(
  'goals/updateGoal',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalsService.updateGoal(goalData, token);
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

export const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: state => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = '';
      state.goals = [];
      state.editedGoal = null;
      state.isEditing = false;
    },
    edit: (state, { payload }) => {
      state.isEditing = true;
      state.editedGoal = payload;
    },
  },
  extraReducers: {
    [createUserGoals.pending]: state => {
      state.isLoading = true;
    },
    [createUserGoals.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals.push(payload);
    },
    [createUserGoals.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
    [getUserGoals.pending]: state => {
      state.isLoading = true;
    },
    [getUserGoals.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = payload;
    },
    [getUserGoals.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
    [deleteUserGoal.pending]: state => {
      state.isLoading = true;
    },
    [deleteUserGoal.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.goals = state.goals.filter(goal => goal._id !== payload.id);
    },
    [deleteUserGoal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
    [updateUserGoal.pending]: state => {
      state.isLoading = true;
    },
    [updateUserGoal.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isEditing = false;
      state.editedGoal = null;
      state.goals = state.goals.map(goal =>
        goal._id === payload._id ? { ...goal, text: payload.text } : goal
      );
    },
    [updateUserGoal.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isError = true;
      state.message = payload;
    },
  },
});

export const { reset, edit } = goalsSlice.actions;
export default goalsSlice.reducer;
