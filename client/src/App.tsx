import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { Layout, Spin } from 'antd';
import Navbar from './components/Navbar';
import { useAppSelector } from './hooks/hooks';
import { LoadingOutlined } from '@ant-design/icons';
import { check } from './http/userAPI';
import { useDispatch } from 'react-redux';
import { setIsAuth, setUser } from './store/reducers/userSlice';
import FooterInfo from './components/FooterInfo';

const { Header, Content, Footer } = Layout;
const antIcon = <LoadingOutlined style={{ fontSize: '10rem' }} spin />;

const App = () => {
	const { user } = useAppSelector((state) => state.user);
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		check()
			.then((data: any) => {
				dispatch(setUser(data));
				dispatch(setIsAuth(true));
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <Spin tip="Loading..." className="app__spin" indicator={antIcon} />;
	}

	return (
		<BrowserRouter>
			<Layout>
				<Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
					<Navbar />
				</Header>
				<Layout>
					<Content style={{ display: 'flex', padding: '0 1rem', marginTop: '74px' }}>
						<AppRouter />
					</Content>
				</Layout>
				<Footer style={{ padding: '1rem 1rem' }}>
					<FooterInfo />
				</Footer>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
