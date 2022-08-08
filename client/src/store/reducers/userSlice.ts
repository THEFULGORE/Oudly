import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';

export interface userState {
	isAuth: boolean;
	user: IUser | null;
}

const initialState: userState = {
	isAuth: false,
	user: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setIsAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload;
		},
		setUser: (state, action: PayloadAction<IUser | null>) => {
			state.user = action.payload;
		},
	},
});

export const { setIsAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
