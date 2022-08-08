import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';

const AppRouter = () => {
	const { isAuth } = useAppSelector((state) => state.user);

	return (
		<Routes>
			{isAuth &&
				authRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			{publicRoutes.map(({ path, Component }) => (
				<>
					<Route key={path} path={path} element={<Component />} />
				</>
			))}
			<Route path="*" element={<Navigate replace to={SHOP_ROUTE} />} />
		</Routes>
	);
};

export default AppRouter;
