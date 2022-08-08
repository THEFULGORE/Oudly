import React, { FC, useEffect, useState } from 'react';
import Title from 'antd/lib/typography/Title';
import { Button, Col, Dropdown, Input, Menu, MenuProps, Modal, Row, Select, Space } from 'antd';
import LoadImg from '../LoadImg';
import { DownOutlined } from '@ant-design/icons';
import { createDevice, getBrands } from '../../http/deviceAPI';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setBrands } from '../../store/reducers/deviceSlice';
import TextArea from 'antd/lib/input/TextArea';
import { IBrand } from '../../models/IBrands';

const { Option } = Select;

type deviceProps = {
	isModalVisible: boolean;
	onCancel: Function;
};

const infoInitialState = [
	{ title: 'Bluetooth', description: '', number: Math.floor(Math.random() * 1000) },
	{ title: 'Sensitivity', description: '', number: Math.floor(Math.random() * 1000) },
	{ title: 'Frequency', description: '', number: Math.floor(Math.random() * 1000) },
	{ title: 'Runtime', description: '', number: Math.floor(Math.random() * 1000) },
	{ title: 'Charging interface', description: '', number: Math.floor(Math.random() * 1000) },
];

const CreateDevice: FC<deviceProps> = ({ isModalVisible, onCancel }) => {
	const { brands } = useAppSelector((state) => state.device);
	const dispatch = useAppDispatch();
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [file, setFile] = useState<File>();
	const [brand, setBrand] = useState<IBrand>();
	const [title, setTitle] = useState('');
	const [descr, setDescr] = useState('');
	const [info, setInfo] = useState(infoInitialState);

	useEffect(() => {
		getBrands().then((data) => dispatch(setBrands(data)));
	}, []);

	const LoadImage = (image: any) => {
		setFile(image.originFileObj);
		console.log(file);
	};

	const handleSelect = (value: string) => {
		const foundBrand = brands.find((el) => el.name === value);
		setBrand(foundBrand);
	};

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }]);
	};

	const removeInfo = (number: number) => {
		setInfo(info.filter((el) => el.number !== number));
	};

	const changeInfo = (key: string, value: string, number: number) => {
		setInfo(info.map((el) => (el.number === number ? { ...el, [key]: value } : el)));
	};

	const addDevice = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('price', `${price}`);
		if (file) {
			formData.append('img', file);
		}
		formData.append('brandId', `${brand?.id}`);
		formData.append('info', JSON.stringify(info));
		createDevice(formData).then(() => onCancel());
	};

	return (
		<>
			<Modal
				title="Create Device"
				visible={isModalVisible}
				onCancel={() => onCancel()}
				style={{ padding: '1rem' }}
				footer={[
					<>
						<Button type="primary" danger onClick={() => onCancel()}>
							Close
						</Button>
						<Button type="primary" onClick={addDevice}>
							Add
						</Button>
					</>,
				]}
			>
				<Title level={4}>Select brand</Title>
				<Select placeholder="select brand" style={{ width: 120 }} onChange={handleSelect}>
					{brands.map((el) => (
						<Option value={el.name}>{el.name}</Option>
					))}
				</Select>
				<Title level={4}>Name</Title>
				<Input placeholder="device name" value={name} onChange={(e) => setName(e.target.value)} />
				<Title level={4}>Price</Title>
				<Input placeholder="price" value={price} onChange={(e) => setPrice(+e.target.value)} />
				<Title level={4}>Load image</Title>
				<LoadImg LoadImage={LoadImage} />
				<Button onClick={addInfo} style={{ margin: '.5rem 0 ' }}>
					Add new parameter
				</Button>
				{info.map((el) => (
					<Space style={{ marginBottom: '.5rem' }} key={el.number}>
						<Row>
							<Space>
								<Col>
									<Input
										placeholder="title"
										value={el.title}
										onChange={(e) => changeInfo('title', e.target.value, el.number)}
									/>
								</Col>
								<Col>
									<Input
										placeholder="description"
										value={el.description}
										onChange={(e) => changeInfo('description', e.target.value, el.number)}
									/>
								</Col>
								<Col>
									<Button type="primary" danger onClick={() => removeInfo(el.number)}>
										Delete
									</Button>
								</Col>
							</Space>
						</Row>
					</Space>
				))}
			</Modal>
		</>
	);
};

export default CreateDevice;
