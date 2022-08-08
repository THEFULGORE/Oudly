import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { IBrand } from '../../models/IBrands';
import { IDevice } from '../../models/IDevice';

export interface deviceState {
	brands: IBrand[];
	selectedBrandsId: CheckboxValueType[];
	devices: {
		count: number;
		rows: IDevice[];
	};
	page: number;
	totalCount: number;
	pageLimit: number;
	orderColName: string;
	orderMethod: string;
	lowestPrice: number;
	highestPrice: number;
	searchName: string;
}

const initialState: deviceState = {
	brands: [],
	selectedBrandsId: [],
	devices: {
		count: 0,
		rows: [],
	},
	page: 1,
	totalCount: 0,
	pageLimit: 4,
	orderColName: 'name',
	orderMethod: 'ASC',
	lowestPrice: 2690,
	highestPrice: 34990,
	searchName: '',
};

export const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		setBrands: (state, action: PayloadAction<IBrand[]>) => {
			state.brands = action.payload;
			state.page = 1;
		},
		setDevices: (state, action: PayloadAction<any>) => {
			state.devices = action.payload;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.page = action.payload;
		},
		setTotalCount: (state, action: PayloadAction<number>) => {
			state.totalCount = action.payload;
		},
		setPageLimit: (state, action: PayloadAction<number>) => {
			state.pageLimit = action.payload;
		},
		setSelectedBrandsId: (state, action: PayloadAction<CheckboxValueType[]>) => {
			state.selectedBrandsId = action.payload;
		},
		setOrderColName: (state, action: PayloadAction<string>) => {
			state.orderColName = action.payload;
		},
		setOrderMethod: (state, action: PayloadAction<string>) => {
			state.orderMethod = action.payload;
		},
		setLowestPrice: (state, action: PayloadAction<number>) => {
			state.lowestPrice = action.payload;
		},
		setHighestPrice: (state, action: PayloadAction<number>) => {
			state.highestPrice = action.payload;
		},
		setSearchName: (state, action: PayloadAction<string>) => {
			state.searchName = action.payload;
		},
	},
});

export const {
	setBrands,
	setDevices,
	setPage,
	setTotalCount,
	setPageLimit,
	setSelectedBrandsId,
	setOrderColName,
	setOrderMethod,
	setLowestPrice,
	setHighestPrice,
	setSearchName,
} = deviceSlice.actions;

export default deviceSlice.reducer;
