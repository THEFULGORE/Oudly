import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { $authHost, $host } from './index';

export const createBrand = async (brand: Object) => {
	const { data } = await $authHost.post('api/brand', brand);
	return data;
};

export const getBrands = async () => {
	const { data } = await $host.get('api/brand');
	return data;
};

export const createDevice = async (device: Object) => {
	const { data } = await $authHost.post('api/device', device);
	return data;
};

export const getDevices = async (
	brandId: CheckboxValueType[] | null,
	page: number,
	limit = 5,
	colName: string,
	order: string,
	lowestPrice: number,
	highestPrice: number,
	searchName: string
) => {
	const { data } = await $host.get('api/device', {
		params: {
			brandId,
			page,
			limit,
			colName,
			order,
			lowestPrice,
			highestPrice,
			searchName,
		},
	});
	return data;
};

export const getOneDevice = async (id: string) => {
	const { data } = await $host.get('api/device/' + id);
	return data;
};
