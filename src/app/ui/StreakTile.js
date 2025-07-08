import Image from "next/image";

import Perks from '@/app/ui/Perks';
import Button from '@/app/ui/Button';

import { useState } from 'react';

export default function StreakTile({killerData, incrementStreak, resetStreak}) {
	const [rolled, setRolled] = useState(false);
	
	const { killer, addons, perks } = killerData;

	const won = () => {
		incrementStreak();
		setRolled(false);
	}

	const lost = () => {
		resetStreak();
		setRolled(false);
	}

	return (
		<div className="bg-gray-800 flex flex-col relative">
			<div className="inline-flex p-3 items-center">
				<div className={`relative h-64 w-48 ${!rolled ? 'invisible' : ''}`}>
					<Image className="object-contain sm:object-cover" fill={true} src={killer} alt="Killer" />
				</div>

				<div className={`flex flex-col mx-4 ${!rolled ? 'invisible' : ''}`}>
					<div className="relative">
						<Image src={`/images/${addons[0].type}.png`} alt={`${addons[0].type} Addon`} width="100" height="100" />
						<Image className="absolute top-1/2 left-1/2 -translate-1/2" src={addons[0].icon} alt="Addon" width="90" height="90" />
					</div>
					<div className="relative">
						<Image src={`/images/${addons[1].type}.png`} alt={`${addons[1].type} Addon`} width="100" height="100" />
						<Image className="absolute top-1/2 left-1/2 -translate-1/2" src={addons[1].icon} alt="Addon" width="90" height="90" />
					</div>
				</div>

				<Perks perks={perks} scale="big" className={`${!rolled ? 'invisible' : ''}`}/>
			</div>

			<div className={`grid grid-cols-2 z-1 ${!rolled ? 'invisible' : ''}`}>
				<Button color="green" onClick={won}>Won</Button>
				<Button color="red" onClick={lost} className="bg-red-500 hover:bg-red-600">Lost</Button>
			</div>

			{!rolled && <Button className="absolute top-1/2 left-1/2 -translate-1/2" onClick={() => setRolled(true)}>Roll</Button>}
		</div>
	)
}