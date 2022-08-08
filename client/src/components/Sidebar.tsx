import Icon from '@ant-design/icons';
import {
	List,
	Checkbox,
	Typography,
	InputNumber,
	Col,
	Popover,
	Skeleton,
	Space,
	Anchor,
} from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import Search from 'antd/lib/input/Search';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { getBrands, getDevices } from '../http/deviceAPI';
import {
	setBrands,
	setDevices,
	setHighestPrice,
	setLowestPrice,
	setPage,
	setSelectedBrandsId,
	setTotalCount,
} from '../store/reducers/deviceSlice';
import './Sidebar.scss';
const { Title } = Typography;

const Sidebar = () => {
	const { brands } = useAppSelector((state) => state.device);
	const [checkedBrands, setCheckedBrands] = useState<CheckboxValueType[]>([]);
	const [lowPrice, setLowPriceState] = useState<number | undefined>(undefined);
	const [highPrice, setHighPriceState] = useState<number | undefined>(undefined);
	const [search, setSearch] = useState('');
	const [loading, setLoading] = useState(true);
	const dispatch = useAppDispatch();

	useEffect(() => {
		getBrands()
			.then((data) => dispatch(setBrands(data)))
			.then(() => setLoading(false));
	}, []);

	const onChange = (checkedValues: CheckboxValueType[]) => {
		setCheckedBrands(checkedValues);
		console.log(checkedValues);
	};

	const searchBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const filterDevices = () => {
		dispatch(setSelectedBrandsId(checkedBrands));
		dispatch(setPage(1));
		if (lowPrice) {
			dispatch(setLowestPrice(lowPrice));
		}
		if (highPrice) {
			dispatch(setHighestPrice(highPrice));
		}
	};

	return (
		<div className="sidebar">
			<Popover
				placement="right"
				content={
					<Title level={4} className="sidebar__button" onClick={filterDevices}>
						Show
					</Title>
				}
				trigger="hover"
			>
				<List>
					<List.Item>
						<Checkbox>Rating 4 and higher</Checkbox>
					</List.Item>
					<List.Item style={{ display: 'flex', flexDirection: 'column' }}>
						<Title level={4} style={{ alignSelf: 'flex-start' }}>
							Price
						</Title>
						<Space>
							<InputNumber
								placeholder="from 2690"
								controls={false}
								value={lowPrice}
								onChange={(value: number) => {
									setLowPriceState(value);
								}}
							/>
							<InputNumber
								placeholder="to 34990"
								controls={false}
								value={highPrice}
								onChange={(value: number) => {
									setHighPriceState(value);
								}}
							/>
						</Space>
					</List.Item>
					<Skeleton active loading={loading} title={false} paragraph={{ rows: 5 }}>
						<List.Item className="sidebar__brands">
							<Search
								placeholder="search brand"
								value={search}
								onChange={(e) => searchBrand(e)}
								style={{ width: 200 }}
							/>
							<Checkbox.Group
								style={{ width: '100%', display: 'flex', flexDirection: 'column' }}
								onChange={onChange}
							>
								{brands
									.filter((el) => {
										if (search) {
											return el.name.toLowerCase().includes(search);
										} else {
											return true;
										}
									})
									.map((el) => (
										<Col span={8}>
											<Checkbox value={el.id}>{el.name}</Checkbox>
										</Col>
									))}
							</Checkbox.Group>
						</List.Item>
					</Skeleton>

					<List.Item></List.Item>
				</List>
			</Popover>
		</div>
	);
};

export default Sidebar;
