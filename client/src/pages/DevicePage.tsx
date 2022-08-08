import { CommentOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Divider, Image, Rate, Row, Space, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneDevice } from '../http/deviceAPI';
import { IDevice } from '../models/IDevice';
import './DevicePage.scss';

const antIcon = <LoadingOutlined style={{ fontSize: '10rem' }} spin />;

const DevicePage = () => {
	const [device, setDevice] = useState<IDevice>();
	const { id } = useParams();

	useEffect(() => {
		getOneDevice(id!).then((data) => setDevice(data));
	}, []);

	if (!device) {
		return <Spin tip="Loading..." className="app__spin" indicator={antIcon} />;
	}

	return (
		<div className="device-page">
			<Title level={1}>{device.name}</Title>
			<div className="device-page__container">
				<div className="device-page__info">
					<Image width={350} src={'http://localhost:5000/' + device?.img} />
					<div>
						<Space style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
							<div className="device-page__details">
								<Space style={{ gap: '1.5rem' }}>
									<Title style={{ marginBottom: '0' }}>{device.price}₽</Title>
									<Button className="device-page__button" type="primary">
										Add to cart
									</Button>
								</Space>
							</div>
							<div>
								<Space
									style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
								>
									<div>
										<Space>
											<Title level={3}>Rating</Title>
											<Rate className="device__rate" allowHalf value={device.rating} />
										</Space>
									</div>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<Space>
											<Title level={3}>Comments</Title>
											<CommentOutlined
												className="device__comment"
												style={{ fontSize: '1.25rem' }}
											/>
										</Space>
									</div>
								</Space>
							</div>
						</Space>
					</div>
				</div>
				<div className="device-page__specs">
					<Title level={2} style={{ marginBottom: '2rem' }}>
						Specs
					</Title>
					<Divider />
					<Row>
						{device.info.map((el) => (
							<>
								<Row>
									<Title level={4}>
										{el.title}: {el.description}
									</Title>
								</Row>
								<Divider />
							</>
						))}
					</Row>
				</div>
			</div>
		</div>
	);
};

export default DevicePage;
