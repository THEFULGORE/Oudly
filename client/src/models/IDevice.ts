interface IDeviceInfo {
	id: number;
	title: string;
	description: string;
}

export interface IDevice {
	id: number;
	name: string;
	price: number;
	rating: number;
	img: string;
	info: IDeviceInfo[];
}
