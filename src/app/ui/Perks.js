'use client'

import Image from 'next/image';

export default function Perks({className='', scale, perks}) {
	if (className) className = ' ' + className;
	
	let perkClassnames;
	if (scale === 'small') {
		perkClassnames = [
			'relative grid grid-cols-2 items-center top-[25px] z-0' + className,
			'relative right-[25px] bottom-[25px]',
			'relative left-[25px] bottom-[25px]',
			'relative bottom-[50px]'
		]
	} else {
		perkClassnames = [
			'relative grid grid-cols-2 items-center top-[55px] z-0' + className,
			'relative right-[55px] bottom-[55px]',
			'relative left-[55px] bottom-[55px]',
			'relative bottom-[110px]'
		]
	}

	scale = scale === 'small' ? 50 : 110;

	return (
		<div className={'grid grid-cols-2' + className}>
			<div className="relative">
				<Image src="/images/perk.png" alt="perk" width={scale} height={scale} />
				<Image className="absolute top-1/2 left-1/2 -translate-1/2" src={perks[0].icon} alt={perks[0].name} width={scale-10} height={scale-10} />
			</div>
			<div className="relative">
				<Image src="/images/perk.png" alt="perk" width={scale} height={scale} />
				<Image className="absolute top-1/2 left-1/2 -translate-1/2" src={perks[1].icon} alt={perks[1].name} width={scale-10} height={scale-10} />
			</div>
			<div className="relative">
				<Image src="/images/perk.png" alt="perk" width={scale} height={scale} />
				<Image className="absolute top-1/2 left-1/2 -translate-1/2" src={perks[2].icon} alt={perks[2].name} width={scale-10} height={scale-10} />
			</div>
			<div className="relative">
				<Image src="/images/perk.png" alt="perk" width={scale} height={scale} />
				<Image className="absolute top-1/2 left-1/2 -translate-1/2" src={perks[3].icon} alt={perks[3].name} width={scale-10} height={scale-10} />
			</div>
		</div>
	)
}