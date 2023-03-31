'use client';

import { nodejs, python } from '@lib/constants';
import Code from '@components/code-writer/CodeWriter';
import { FC } from 'react';
import SimpleBar from 'simplebar-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/tab/Tab';
import 'simplebar-react/dist/simplebar.min.css';

const DocumentationTabs: FC = () => {
	return (
		<Tabs defaultValue="nodejs" className="max-w-3xl w-full">
			<TabsList>
				<TabsTrigger value="nodejs">NodeJS</TabsTrigger>
				<TabsTrigger value="python">Python</TabsTrigger>
			</TabsList>
			<TabsContent value="nodejs">
				<SimpleBar forceVisible="y">
					<Code animate code={nodejs} language="javascript" show />
				</SimpleBar>
			</TabsContent>
			<TabsContent value="python">
				<SimpleBar forceVisible="y">
					<Code animate code={python} language="python" show />
				</SimpleBar>
			</TabsContent>
		</Tabs>
	);
};

export default DocumentationTabs;
