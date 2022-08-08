import { Button, Input, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { FC, useState } from 'react';
import { createBrand } from '../../http/deviceAPI';
import './CreateBrand.scss';

type brandProps = {
	isModalVisible: boolean;
	onCancel: Function;
};

const CreateBrand: FC<brandProps> = ({ isModalVisible, onCancel }) => {
	const [brandName, setBrandName] = useState('');
	const addBrand = () => {
		createBrand({ name: brandName }).then((data) => setBrandName(''));
		onCancel();
	};

	return (
		<>
			<Modal
				title="Create Brand"
				visible={isModalVisible}
				onCancel={() => onCancel()}
				style={{ padding: '1rem' }}
				footer={[
					<>
						<Button danger onClick={() => onCancel()}>
							Close
						</Button>
						<Button type="primary" onClick={() => addBrand()}>
							Add
						</Button>
					</>,
				]}
			>
				<Title level={4}>Enter brand name</Title>
				<Input
					placeholder="brand name"
					value={brandName}
					onChange={(e) => setBrandName(e.target.value)}
				/>
			</Modal>
		</>
	);
};

export default CreateBrand;
