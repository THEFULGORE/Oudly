import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Row, Space } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login, registration } from '../http/userAPI';
import { setIsAuth, setUser } from '../store/reducers/userSlice';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import './Auth.scss';

const validateMessages = {
	required: '${label} is required!',
	types: {
		email: '${label} is not a valid email!',
	},
};

const Auth = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const isLogin = location.pathname === LOGIN_ROUTE;
	const [visible, setVisible] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmLoading, setConfirmLoading] = useState(false);
	const dispatch = useDispatch();

	const handleClick = async () => {
		setConfirmLoading(false);
		try {
			let data: any;
			setConfirmLoading(true);
			if (isLogin) {
				data = await login(email, password);
			} else {
				data = await registration(email, password);
			}
			dispatch(setUser(data));
			dispatch(setIsAuth(true));
			navigate(SHOP_ROUTE);
		} catch (e: any) {
			message.error(e.response.data.message);
		} finally {
			setConfirmLoading(false);
		}
	};

	const handleCancel = () => {
		setVisible(false);
		navigate(SHOP_ROUTE);
	};

	return (
		<>
			<Modal
				title={isLogin ? 'Login' : 'Registration'}
				visible={visible}
				onCancel={handleCancel}
				footer={null}
			>
				<Space style={{ display: 'flex', flexDirection: 'column' }}>
					<Form validateMessages={validateMessages} onFinish={handleClick} autoComplete="off">
						<Title level={4}>Email</Title>
						<Form.Item name="Email" rules={[{ required: true, type: 'email' }]}>
							<Input
								prefix={
									<MailOutlined
										className="site-form-item-icon"
										style={{ color: 'grey', opacity: 0.5 }}
									/>
								}
								placeholder="enter email"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							></Input>
						</Form.Item>
						<Title level={4}>Password</Title>
						<Form.Item
							name="password"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password
								prefix={
									<LockOutlined
										className="site-form-item-icon"
										style={{ color: 'grey', opacity: 0.5 }}
									/>
								}
								placeholder="enter password"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							></Input.Password>
						</Form.Item>
						<Row>
							{isLogin ? (
								<Title level={5}>
									Don't have account? <Link to={REGISTRATION_ROUTE}>Register!</Link>{' '}
								</Title>
							) : (
								<Title level={5}>
									Already have account? <Link to={LOGIN_ROUTE}>Login!</Link>{' '}
								</Title>
							)}
						</Row>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								loading={confirmLoading}
								style={{ width: '100%' }}
							>
								{isLogin ? 'Login' : 'Register'}
							</Button>
						</Form.Item>
					</Form>
				</Space>
			</Modal>
		</>
	);
};

export default Auth;
