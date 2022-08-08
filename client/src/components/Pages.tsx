import { Pagination, PaginationProps } from 'antd';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setPage } from '../store/reducers/deviceSlice';

const Pages = () => {
	const { device } = useAppSelector((state) => state);
	const dispatch = useAppDispatch();

	const onChange: PaginationProps['onChange'] = (page) => {
		dispatch(setPage(page));
	};

	return (
		<Pagination
			current={device.page}
			pageSize={device.pageLimit}
			onChange={onChange}
			total={device.totalCount}
		/>
	);
};

export default Pages;
