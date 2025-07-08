import { writeFile, mkdir, access } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { parse } from 'node-html-parser';
import { finished } from 'node:stream/promises';
import { Readable } from 'node:stream';
import { fetch, Agent } from 'undici'

const KILLERS = [
  'Trapper',
  'Wraith',
  'Hillbilly',
  'Nurse',
  'Shape',
  'Hag',
  'Doctor',
  'Huntress',
  'Cannibal',
  'Nightmare',
  'Pig',
  'Clown',
  'Spirit',
  'Legion',
  'Plague',
  'Ghost_Face',
  'Demogorgon',
  'Oni',
  'Deathslinger',
  'Executioner',
  'Blight',
  'Twins',
  'Trickster',
  'Nemesis',
  'Cenobite',
  'Artist',
  'Onryō',
  'Dredge',
  'Mastermind',
  'Knight',
  'Skull_Merchant',
  'Singularity',
  'Xenomorph',
  'Good_Guy',
  'Unknown',
  'Lich',
  'Dark_Lord',
  'Houndmaster',
  'Ghoul',
  'Animatronic'
];

async function DownloadImage(url, path) {
  try {
      const stream = createWriteStream(path);
      const image = await fetch('https://deadbydaylight.wiki.gg' + url, { dispatcher: new Agent({ autoSelectFamily: true }) });
      await finished(Readable.fromWeb(image.body).pipe(stream));
    } catch (err) {
      throw err;
    }
}

async function GetAddonsForKiller(killer) {
  // get HTML from wiki page for X killer
  let html;
  try {
    const res = await fetch('https://deadbydaylight.wiki.gg/wiki/The_' + killer);
    html = await res.text();
  } catch (err) {
    console.log(err);
  }

  const root = parse(html);
  // get divs with 'addon-container' class, which has addon type info in its class
  // and the related addon icon in a child <img> element
  const addonElements = root.querySelectorAll('h3:has([id*="Add-ons_for"]) + table .addon-container');

  const addons = await Promise.all(addonElements.map(async ae => {
    // wiki uses 'item-element' suffix for addon types in the class, let's get all these
    const className = ae.querySelector('[class*="item-element"]').attributes.class;
    // classnames are seperated by spaces, let's split these into an array
    const splitClassName = className.split(' ');
    // look for the 'item-element' suffix to find the addon type
    // we could just get the last index of the split array, but nothing stops the wiki from changing the position of the class in the html
    const addonType = splitClassName.find(c => c.includes('item-element'));

    const imageUrl = ae.querySelector('img').attributes.src.split('?')[0];
    const splitImageUrl = imageUrl.split('/');
    const splitImageUrlLast = splitImageUrl[splitImageUrl.length-1];
    const publicUrl = 'public/images/addons/' + splitImageUrlLast;
    const relativeUrl = '/images/addons/' + splitImageUrlLast;
    
    await DownloadImage(imageUrl, publicUrl);

    return {
      // we only want the addon type, not the 'item-element' suffix
      // NOTE: very-rare => very
      type: addonType.split('-')[0],
      // remove the extra ? params so we have the absolute source image url
      icon: relativeUrl
    }
  }));

  // do the same for the killer portrait
  const imageUrl = root.querySelector('.charPortraitImage img').attributes.src.split('?')[0];
  const splitImageUrl = imageUrl.split('/');
  const splitImageUrlLast = splitImageUrl[splitImageUrl.length-1];
  const publicUrl = 'public/images/killers/' + splitImageUrlLast;
  const relativeUrl = '/images/killers/' + splitImageUrlLast;

  await DownloadImage(imageUrl, publicUrl);

  return {
    killer: relativeUrl,
    addons
  }
}

async function GetKillerPerks() {
  let html;
  try {
    const res = await fetch('https://deadbydaylight.wiki.gg/wiki/Perks');
    html = await res.text();
  } catch (err) {
    throw err;
  }

  const root = parse(html);
  const perkElements = root.querySelectorAll('h3:has([id*="Killer_Perks_"]) + table tbody tr th:first-child img');

  const perks = await Promise.all(perkElements.map(async pe => {
    // remove the extra ? params so we have the absolute source image url
    const imageUrl = pe.attributes.src.split('?')[0];
    const splitImageUrl = imageUrl.split('/');
    let splitImageUrlEnd = splitImageUrl[splitImageUrl.length-1];
    
    // edge case for Coup, since the French character causes URL issues
    if (splitImageUrlEnd.includes('coup')) {
      splitImageUrlEnd = 'coupdegrace.png';
    }

    const relativeUrl = '/images/perks/' + splitImageUrlEnd;
    const publicUrl = 'public/images/perks/' + splitImageUrlEnd;

    await DownloadImage(imageUrl, publicUrl);

    return {
      name: pe.attributes.alt,
      icon: relativeUrl
    }
  }));

  return perks;
}

export async function GET(req, res) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) return new Response(null, { status: 401 }).json({ message: 'Unauthorized' });
  
  const data = {
    addons: [],
    perks: []
  }
  
  try {
    // make sure folders exist
    if (!await access('public/images/addons')) {
      await mkdir('public/images/addons');
    }
    if (!await access('public/images/killers')) {
      await mkdir('public/images/killers');
    }
    if (!await access('public/images/perks')) {
      await mkdir('public/images/perks');
    }

    // for each killer
    for (const k of KILLERS) data.addons.push(await GetAddonsForKiller(k));
    // addons as well
    data.perks = await GetKillerPerks()
    await writeFile('public/data.json', JSON.stringify(data));
  } catch (err) {
    return Response(null, { status: 400 }).json({ error: err.message, trace: err.stack });
  }

  return new Response(JSON.stringify(data));
}