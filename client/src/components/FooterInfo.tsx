import { GithubOutlined, MailOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';

const FooterInfo = () => {
	return (
		<div>
			<Divider />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Title level={5}>
					Made with ❤ by{' '}
					<a href="https://github.com/THEFULGORE" target="_blank">
						THEFULGORE
					</a>
				</Title>
			</div>
		</div>
	);
};

export default FooterInfo;
