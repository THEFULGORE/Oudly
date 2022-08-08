import { Button, Space } from 'antd';
import { UserOutlined, ShoppingOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import './Navbar.scss';
import { useAppSelector } from '../hooks/hooks';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from '../store/reducers/userSlice';
import { setSearchName } from '../store/reducers/deviceSlice';

const Navbar = () => {
	const { isAuth } = useAppSelector((state) => state.user);
	const role = useAppSelector((state) => state.user.user?.role);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSearch = (value: string) => {
		dispatch(setSearchName(value));
		navigate(SHOP_ROUTE);
	};

	const onChange = (value: string) => {
		if (value === '') {
			dispatch(setSearchName(value));
		}
	};

	const logout = () => {
		dispatch(setUser(null));
		dispatch(setIsAuth(false));
	};

	return (
		<div className="navbar">
			<Link to={SHOP_ROUTE}>
				<h1 className="navbar__logo">Oudly</h1>
			</Link>
			<Search
				className="navbar__search"
				placeholder="Search"
				onChange={(e) => onChange(e.target.value)}
				onSearch={onSearch}
				enterButton
			/>
			<div className="navbar__buttons">
				{isAuth ? (
					<Space>
						{role === 'ADMIN' && (
							<Button icon={<DeploymentUnitOutlined />} onClick={() => navigate(ADMIN_ROUTE)}>
								Admin Panel
							</Button>
						)}
						<Button icon={<ShoppingOutlined />}>Cart</Button>
						<Button icon={<UserOutlined />} onClick={logout}>
							Logout
						</Button>
					</Space>
				) : (
					<Space>
						<Button icon={<ShoppingOutlined />}>Cart</Button>
						<Button icon={<UserOutlined />} onClick={() => navigate(LOGIN_ROUTE)}>
							Login
						</Button>
					</Space>
				)}
			</div>
		</div>
	);
};

export default Navbar;
