import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import deviceSlice from './reducers/deviceSlice';
import userSlice from './reducers/userSlice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		device: deviceSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
