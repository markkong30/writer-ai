import ApiDashboard from '@components/dashboard/ApiDashboard';
import RequestApiKey from '@components/request-api-key/RequestApiKey';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
	title: 'AuthorAI API | Dashboard',
	description: 'Free & open-source text AuthorAI API'
};

const Dashboard = async () => {
	const user = await getServerSession(authOptions);
	if (!user) return notFound();

	const apiKey = await db.apiKey.findFirst({
		where: { userId: user.user.id, enabled: true }
	});

	return (
		<div className="max-w-7xl mx-auto mt-16 pt-20">
			{apiKey ? <ApiDashboard /> : <RequestApiKey />}
		</div>
	);
};

export default Dashboard;
