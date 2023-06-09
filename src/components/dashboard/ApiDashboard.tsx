import { authOptions } from '@lib/auth';
import { db } from '@lib/db';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Heading from '@components/heading/Heading';
import Paragraph from '@components/paragraph/Paragraph';
import { Input } from '@components/input/Input';
import { FC } from 'react';
import Table from '@components/table/Table';
import ApiKeyOptions from '@components/api-key-options/ApiKeyOptions';

// @ts-expect-error server-side
const ApiDashboard: FC = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  const apiKeys = await db.apiKey.findMany({
    where: { userId: user.user.id },
  });

  const activeKey = apiKeys.find(key => key.enabled);

  const userRequests = await db.apiRequest.findMany({
    where: {
      apiKeyId: {
        in: apiKeys.map(key => key.key),
      },
    },
  });

  const serializableRequests = userRequests.map(req => ({
    ...req,
    timestamp: format(req.timestamp, 'MMMM d, yyyy HH:mm:ss'),
  }));

  return (
    <div className='container flex flex-col gap-6'>
      <Heading>
        Welcome back,
        <span className='ml-4 text-indigo-600'>{user.user.name}</span>
        <span className='ml-6'>🦄</span>
      </Heading>
      <div className='flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center'>
        <Paragraph className='mb-0'>Your API key:</Paragraph>
        <Input className='w-fit truncate' readOnly value={activeKey?.key} />
        <ApiKeyOptions apiKey={activeKey?.key || ''} />
      </div>

      <Paragraph className='text-center md:text-left mt-4 -mb-2'>
        Your API history:
      </Paragraph>

      <Table userRequests={serializableRequests} />
    </div>
  );
};

export default ApiDashboard;
