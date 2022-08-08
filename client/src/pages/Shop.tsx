import React, { useEffect, useState } from 'react';
import DeviceItem from '../components/DeviceItem';
import Pages from '../components/Pages';
import Sidebar from '../components/Sidebar';
import SortByMenu from '../components/SortByMenu';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getDevices } from '../http/deviceAPI';
import { setDevices, setTotalCount } from '../store/reducers/deviceSlice';
import Title from 'antd/lib/typography/Title';
import './Shop.scss';

const Shop = () => {
	const { device } = useAppSelector((state) => state);
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		getDevices(
			null,
			1,
			device.pageLimit,
			device.orderColName,
			device.orderMethod,
			device.lowestPrice,
			device.highestPrice,
			device.searchName
		)
			.then((data) => {
				dispatch(setDevices(data));
				dispatch(setTotalCount(data.count));
			})
			.then(() => setLoading(false));
	}, []);

	useEffect(() => {
		getDevices(
			device.selectedBrandsId,
			device.page,
			device.pageLimit,
			device.orderColName,
			device.orderMethod,
			device.lowestPrice,
			device.highestPrice,
			device.searchName
		).then((data) => {
			dispatch(setDevices(data));
			dispatch(setTotalCount(data.count));
		});
	}, [
		device.page,
		device.selectedBrandsId,
		device.orderColName,
		device.orderMethod,
		device.lowestPrice,
		device.highestPrice,
		device.searchName,
	]);

	return (
		<>
			<Sidebar />
			<div className="shop__container">
				<SortByMenu />
				{device.devices.count !== 0 ? (
					device.devices.rows.map((device) => <DeviceItem device={device} loading={loading} />)
				) : !loading ? (
					<Title>There are no products matching the search criteria</Title>
				) : (
					<></>
				)}
				<Pages />
			</div>
		</>
	);
};

export default Shop;
