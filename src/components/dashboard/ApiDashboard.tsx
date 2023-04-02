import { authOptions } from '@lib/auth';
import { db } from '@lib/db';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { formatDistance } from 'date-fns';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import { Input } from '@components/input/Input';
import { FC } from 'react';
import Table from '@components/table/Table';
import ApiKeyOptions from '@components/api-key-options/ApiKeyOptions';

// @ts-expect-error
const ApiDashboard: FC = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	const apiKeys = await db.apiKey.findMany({
		where: { userId: user.user.id }
	});

	const activeKey = apiKeys.find((key) => key.enabled);

	const userRequests = await db.apiRequest.findMany({
		where: {
			apiKeyId: {
				in: apiKeys.map((key) => key.id)
			}
		}
	});

	const serializableRequests = userRequests.map((req) => ({
		...req,
		timestamp: formatDistance(new Date(req.timestamp), new Date())
	}));

	return (
		<div className="container flex flex-col gap-6">
			<Heading>Welcome back, {user.user.name}</Heading>
			<div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
				<Paragraph className="mb-0">Your API key:</Paragraph>
				<Input className="w-fit truncate" readOnly value={activeKey?.key} />
				<ApiKeyOptions apiKey={activeKey?.key || ''} />
			</div>

			<Paragraph className="text-center md:text-left mt-4 -mb-2">
				Your API history:
			</Paragraph>

			<Table userRequests={serializableRequests} />
		</div>
	);
};

export default ApiDashboard;
