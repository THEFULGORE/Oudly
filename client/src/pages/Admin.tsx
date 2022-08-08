import { Button } from 'antd';
import React, { useState } from 'react';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';

const Admin = () => {
	const [isBrandModalVisible, setIsBrandModalVisible] = useState(false);
	const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);

	return (
		<div>
			<Button onClick={() => setIsBrandModalVisible(true)}>Create Brand</Button>
			<Button onClick={() => setIsDeviceModalVisible(true)}>Create Device</Button>
			<CreateBrand
				isModalVisible={isBrandModalVisible}
				onCancel={() => setIsBrandModalVisible(false)}
			/>
			<CreateDevice
				isModalVisible={isDeviceModalVisible}
				onCancel={() => setIsDeviceModalVisible(false)}
			/>
		</div>
	);
};

export default Admin;
