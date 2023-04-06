import { Button } from '@components/button/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@components/dropdown-menu/DropdownMenu';
import Icons from '@components/icons/Icons';
import { Mode, modes } from '@lib/prompts';
import { FC } from 'react';

type Props = {
	mode: Mode;
	setMode: (mode: Mode) => void;
};

const ModeDropdown: FC<Props> = ({ mode, setMode }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="flex items-center gap-2" variant="subtle">
					<span>Mode:</span>
					<span className="font-bold">{mode}</span>
					<Icons.ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" forceMount>
				{modes.map((mode, i) => (
					<DropdownMenuItem key={i} onClick={() => setMode(mode)}>
						{mode}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ModeDropdown;
