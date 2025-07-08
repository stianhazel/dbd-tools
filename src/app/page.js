import Streak from '@/app/ui/Streak';
import { readFile } from 'node:fs/promises';

export default async function Home() {
  // get killers and perks
  console.log('rendering')
  const dataFile = await readFile('public/data.json');
  const killerData = JSON.parse(dataFile);

  return (
    <main>
      <h1 className="text-4xl mb-8">Killer Streak Randomizer</h1>
      <Streak constKillerData={killerData.addons} killerPerks={killerData.perks} />
    </main>
  );
}