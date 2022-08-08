import {
	FallOutlined,
	RiseOutlined,
	SortAscendingOutlined,
	SortDescendingOutlined,
} from '@ant-design/icons';
import { Select } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setDevices, setOrderColName, setOrderMethod } from '../store/reducers/deviceSlice';

const { Option } = Select;

const SortByMenu = () => {
	const { orderColName, orderMethod } = useAppSelector((state) => state.device);
	const dispatch = useAppDispatch();

	const handleChange = (value: string) => {
		switch (value) {
			case 'sortAlphabAsc':
				dispatch(setOrderColName('name'));
				dispatch(setOrderMethod('ASC'));
				break;
			case 'sortAlphabDesc':
				dispatch(setOrderColName('name'));
				dispatch(setOrderMethod('DESC'));
				break;
			case 'cheap':
				dispatch(setOrderColName('price'));
				dispatch(setOrderMethod('ASC'));
				break;
			case 'expensive':
				dispatch(setOrderColName('price'));
				dispatch(setOrderMethod('DESC'));
				break;
		}
	};

	return (
		<div style={{ display: 'flex', gap: '.5rem' }}>
			<Title level={4}>Sort by:</Title>
			<Select defaultValue="sortAlphabAsc" style={{ width: 160 }} onChange={handleChange}>
				<Option value="sortAlphabAsc">
					<SortAscendingOutlined /> Sort by name
				</Option>
				<Option value="sortAlphabDesc">
					<SortDescendingOutlined /> Sort by name
				</Option>
				<Option value="cheap">
					<RiseOutlined /> Cheap first
				</Option>
				<Option value="expensive">
					<FallOutlined /> Expensive first
				</Option>
			</Select>
		</div>
	);
};

export default SortByMenu;
