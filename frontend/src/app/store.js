import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth-slice';
import goalsReducer from '../features/goal/goals-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
  },
});
