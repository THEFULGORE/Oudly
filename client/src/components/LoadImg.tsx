import React, { FC, useState } from 'react';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Button, message } from 'antd';
import Upload, { UploadChangeParam } from 'antd/lib/upload';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { UploadRequestOption } from 'rc-upload/lib/interface';

const dummyRequest = (options: UploadRequestOption<any>) => {
	setTimeout(() => {
		if (options.onSuccess) {
			options.onSuccess('ok');
		}
	}, 0);
};

const props: UploadProps = {
	beforeUpload: (file) => {
		const isPNG = file.type === 'image/png' || file.type === 'image/jpeg';
		if (!isPNG) {
			message.error(`${file.name} is not a png or jpeg file`);
		}
		return isPNG || Upload.LIST_IGNORE;
	},
};

type loadImageProps = {
	LoadImage: Function;
};

const LoadImg: FC<loadImageProps> = ({ LoadImage }) => {
	const [loading, setLoading] = useState(false);

	const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
		LoadImage(info.file);
	};

	return (
		<Upload customRequest={dummyRequest} onChange={handleChange} {...props}>
			<Button icon={<UploadOutlined />}>Click to Upload</Button>
		</Upload>
	);
};

export default LoadImg;
