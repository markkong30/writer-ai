import { FC, ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

const Badge: FC<Props> = ({ children }) => {
	return (
		<div className="inline-flex ml-2 px-1.5 py-1 bg-gray-400 text-black font-semibold text-sm border border-gray-700 rounded">
			{children}
		</div>
	);
};

export default Badge;
