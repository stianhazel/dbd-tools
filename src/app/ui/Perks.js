'use client'

import Image from 'next/image';

export default function Perks({perks, size}) {

	return (
		<div className="grid grid-cols-2 gap-1">
			<div className="relative self-end">
				<Image src="/images/perk.png" alt="perk" width={size} height={size} />
				<Image placeholder='empty' className="absolute top-1/2 left-1/2 -translate-1/2" src={perks[0].icon} alt={perks[0].name} width={size-10} height={size-10} />
			</div>
			<div className="relative self-end">
				<Image src="/images/perk.png" alt="perk" width={size} height={size} />
				<Image placeholder='empty' className="absolute top-1/2 left-1/2 -translate-1/2" src={perks[1].icon} alt={perks[1].name} width={size-10} height={size-10} />
			</div>
			<div className="relative self-start">
				<Image src="/images/perk.png" alt="perk" width={size} height={size} />
				<Image placeholder='empty' className="absolute top-1/2 left-1/2 -translate-1/2" src={perks[2].icon} alt={perks[2].name} width={size-10} height={size-10} />
			</div>
			<div className="relative self-start">
				<Image src="/images/perk.png" alt="perk" width={size} height={size} />
				<Image placeholder='empty' className="absolute top-1/2 left-1/2 -translate-1/2" src={perks[3].icon} alt={perks[3].name} width={size-10} height={size-10} />
			</div>
		</div>
	)
}