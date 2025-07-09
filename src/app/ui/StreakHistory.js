'use client'

import Perks from '@/app/ui/Perks';
import Image from 'next/image';

export default function StreakHistory({history, preStreak}) {
	const className1 = preStreak ? 'grid grid-cols-3 gap-2 xl:grid-cols-4 2xl:grid-cols-5' : "grid grid-cols-2 gap-2 xl:grid-cols-3 2xl:grid-cols-4";
	const className2 = preStreak ? 'flex items-center ml-2 group-nth-[4n]:invisible xl:group-nth-[4n]:visible 2xl:group-nth-[5n]:invisible'
		: 'flex items-center ml-2 group-nth-[2n]:invisible xl:group-nth-[2n]:visible xl:group-nth-[3n]:invisible 2xl:group-nth-[3n]:visible 2xl:group-nth-[4n]:invisible';
	return (
		<div className={className1}>
			{
				history.map(
					(h, k) =>
					<div key={k} className="flex justify-around group">
						<div className="bg-gray-800 inline-flex p-1">
							<div className="relative">
								<Image placeholder='empty' height="128" width="128" src={h.killer} alt="Killer" />
							</div>
							<div className="flex flex-col justify-center mx-2">
								<div className="relative">
									<Image placeholder='empty' className="absolute top-1/2 left-1/2 -translate-1/2" src={h.addons[0].icon} alt="x Addon" width="35" height="35" />
									<Image placeholder='empty' src={`/images/${h.addons[0].type}.png`} alt={`${h.addons[0].type} Addon`} width="50" height="50" />
								</div>
								<div className="relative">
									<Image placeholder='empty' className="absolute top-1/2 left-1/2 -translate-1/2" src={h.addons[1].icon} alt="x Addon" width="45" height="45" />
									<Image placeholder='empty' src={`/images/${h.addons[1].type}.png`} alt={`${h.addons[1].type} Addon`} width="50" height="50" />
								</div>
							</div>
							<Perks perks={h.perks} size="50" />
						</div>
						<div className={className2}>{'->'}</div>
					</div>
				)
			}
		</div>
	)
}