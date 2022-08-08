import { CommentOutlined } from '@ant-design/icons';
import { Button, Card, Image, Rate, Skeleton, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IDevice } from '../models/IDevice';
import { DEVICE_ROUTE } from '../utils/consts';
import './deviceItem.scss';

interface deviceItemProps {
	device: IDevice;
	loading: boolean;
}

const DeviceItem: FC<deviceItemProps> = ({ device, loading }) => {
	const navigate = useNavigate();

	if (loading) {
		return <Skeleton.Input active style={{ width: '100%' }} size="large" />;
	}

	return (
		<div className="device">
			<Card bordered={true}>
				<div className="device__info">
					<Image width={150} src={'http://localhost:5000/' + device.img} />
					<div className="device__description">
						<Title
							className="device__title"
							level={2}
							onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}
						>
							{device.name}
						</Title>
						<div>
							<Space>
								<Rate className="device__rate" allowHalf value={device.rating} />
								<div className="device__comment">
									<CommentOutlined style={{ fontSize: '1.25rem' }} />
								</div>
							</Space>
						</div>
					</div>
				</div>
				<div className="device__price">
					<Title level={2}>{device.price}₽</Title>
					<Button type="primary">Add to cart</Button>
				</div>
			</Card>
		</div>
	);
};

export default DeviceItem;
