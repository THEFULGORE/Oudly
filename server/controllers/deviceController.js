const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');

const create = async (req, res, next) => {
	try {
		let { name, price, brandId, info } = req.body;
		const { img } = req.files;
		let fileName = uuid.v4() + '.jpg';
		img.mv(path.resolve(__dirname, '..', 'static', fileName));
		const device = await Device.create({ name, price, brandId, img: fileName });

		info = JSON.parse(info);
		console.log('success');
		if (info) {
			info.forEach((el) => {
				DeviceInfo.create({
					title: el.title,
					description: el.description,
					deviceId: device.id,
				});
			});
		}

		return res.json(device);
	} catch (e) {
		next(ApiError.badRequest(e.message));
	}
};
const getAll = async (req, res) => {
	let { brandId, limit, page, colName, order, lowestPrice, highestPrice, searchName } = req.query;
	page = page || 1;
	limit = limit || 9;
	let offset = page * limit - limit;
	let devices;
	console.log(searchName);
	if (searchName) {
		devices = await Device.findAndCountAll({
			where: {
				name: { [Op.substring]: searchName },
			},
			limit,
			offset,
			order: [[colName, order]],
		});
		return res.json(devices);
	}

	if (brandId) {
		devices = await Device.findAndCountAll({
			where: {
				brandId: { [Op.or]: brandId },
				price: { [Op.and]: [{ [Op.gte]: lowestPrice }, { [Op.lte]: highestPrice }] },
			},
			limit,
			offset,
			order: [[colName, order]],
		});
	} else {
		devices = await Device.findAndCountAll({
			where: {
				price: { [Op.and]: [{ [Op.gte]: lowestPrice }, { [Op.lte]: highestPrice }] },
			},
			limit,
			offset,
			order: [[colName, order]],
		});
	}

	return res.json(devices);
};
const getOne = async (req, res) => {
	const { id } = req.params;
	const device = await Device.findOne({
		where: { id },
		include: [{ model: DeviceInfo, as: 'info' }],
	});
	return res.json(device);
};

module.exports = {
	create,
	getAll,
	getOne,
};
