'use client'

import { useEffect, useState } from 'react';
import { Random } from '../lib/util';

import Button from '@/app/ui/Button';
import StreakTile from '@/app/ui/StreakTile';
import StreakHistory from '@/app/ui/StreakHistory';

export default function Streak({ constKillerData, killerPerks }) {
	console.log('rendering')
	const [killerData, setKillerData] = useState([...constKillerData]);
	const [streakHistory, setStreakHistory] = useState([]);
	const [streakActive, setStreakActive] = useState(false);
	const [currentKiller, setCurrentKiller] = useState(null);
	const [streakWon, setStreakWon] = useState(false);

	const setRandomKillerAndAddonsAndPerks = () => {
		// get random indexes for addons and killer and perks
		// and remove it from the array
		const rolledKillerIndex = Random(killerData.length);
		const rolledKiller = killerData[rolledKillerIndex];

		setKillerData([...killerData].toSpliced(rolledKillerIndex, 1));

		// need the value of addon1's index, so we can use it as an exclusion in Random to avoid duplicates
		const addon1Index = Random(rolledKiller.addons.length);
		const addon1 = rolledKiller.addons[addon1Index];
		const addon2 = rolledKiller.addons[Random(rolledKiller.addons.length, [addon1Index])];

		const perk1Index = Random(killerPerks.length);
		const perk2Index = Random(killerPerks.length, [perk1Index]);
		const perk3Index = Random(killerPerks.length, [perk1Index, perk2Index]);
		const perk4Index = Random(killerPerks.length, [perk1Index, perk2Index, perk3Index]);
		const perks = [
			killerPerks[perk1Index],
			killerPerks[perk2Index],
			killerPerks[perk3Index],
			killerPerks[perk4Index],
		]

		setCurrentKiller({
			killer: rolledKiller.killer,
			addons: [addon1, addon2],
			perks
		})
	}

	const incrementStreak = () => {
		setStreakHistory(
			[
				...streakHistory,
				{
					killer: currentKiller.killer,
					addons: [currentKiller.addons[0], currentKiller.addons[1]],
					perks: currentKiller.perks
				}
			]
		);
		if (killerData.length === 0) setStreakWon(true); else setRandomKillerAndAddonsAndPerks();
	}

	const resetStreak = () => {
		localStorage.removeItem('currentStreak');
		setStreakHistory([]);
		setStreakActive(false);
		setCurrentKiller(null);
		setStreakWon(false);
		setKillerData([...constKillerData]);
	}
	
	const startStreak = () => {
		setStreakActive(true);
		if (killerData.length === 0) {
			setStreakWon(true);
		} else {
			setRandomKillerAndAddonsAndPerks();
		}
	}

	useEffect(() => {
		// check if we currently have a streak
		if (localStorage.getItem('currentStreak') !== null) {
			const currentStreak = JSON.parse(localStorage.getItem('currentStreak'));
			setStreakHistory(currentStreak);
			for (const k of currentStreak) {
				killerData.splice(killerData.findIndex(kd => kd.killer === k.killer), 1);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('currentStreak', JSON.stringify(streakHistory));
	}, [streakHistory])

	return (
		<div>
			{!streakActive
				? <>
					<Button color="green" onClick={startStreak}>{streakHistory.length === 0 ? 'Start' : 'Continue'}</Button>
					{streakHistory.length > 0 && 
					<>
						<h2 className="text-2xl my-8">Current Streak: {streakHistory.length} / {constKillerData.length}</h2>
						<StreakHistory preStreak history={streakHistory} />
					</>}
				  </>
				: <>
				{!streakWon
					? 
					<div className="flex gap-24 items-start">
						<h2 className="absolute text-2xl top-[5%] left-1/2">{streakHistory.length > 0 && streakHistory.length || 0} / 40</h2>
						<StreakTile
							incrementStreak={incrementStreak}
							resetStreak={resetStreak}
							killerData={currentKiller}
						/>
						<StreakHistory history={streakHistory} />
					</div>
					: 	<>
							<h2 className="text-2xl">Streak complete!</h2>
							<Button onClick={resetStreak} className="my-4">New Streak</Button>
							<StreakHistory history={streakHistory} />
						</>
				}</>
			}
		</div>
	)
}