const CARDS = [
  // Buildings
  {
    id: 'grand_market', name: 'Grand Market', type: 'building',
    image: 'v1/grand_market1.png',
    effects: [{ resource: 'gold', amount: 3 }],
    desc: '+3 Gold'
  },
  {
    id: 'grand_market2', name: 'Grand Market II', type: 'building',
    image: 'v1/grand_market2.png',
    effects: [{ resource: 'gold', amount: 2 }, { resource: 'food', amount: 1 }],
    desc: '+2 Gold, +1 Food'
  },
  {
    id: 'grand_market3', name: 'Grand Market III', type: 'building',
    image: 'v1/grand_market3.png',
    effects: [{ resource: 'gold', amount: 4 }],
    desc: '+4 Gold'
  },
  {
    id: 'temple', name: 'Temple', type: 'building',
    image: 'v1/temple.png',
    effects: [{ resource: 'faith', amount: 3 }],
    desc: '+3 Faith'
  },
  {
    id: 'monastery', name: 'Monastery', type: 'building',
    image: 'v1/monestary.png',
    effects: [{ resource: 'faith', amount: 2 }, { resource: 'food', amount: 1 }],
    desc: '+2 Faith, +1 Food'
  },
  {
    id: 'observatory', name: 'Golden Observatory', type: 'building',
    image: 'v1/golden_observatory.png',
    effects: [{ resource: 'science', amount: 3 }],
    desc: '+3 Science'
  },
  {
    id: 'aqueduct1', name: 'Aqueduct', type: 'building',
    image: 'v1/aquaduct1.png',
    effects: [{ resource: 'food', amount: 3 }],
    desc: '+3 Food'
  },
  {
    id: 'aqueduct2', name: 'Aqueduct II', type: 'building',
    image: 'v1/aquaduct2.png',
    effects: [{ resource: 'food', amount: 2 }, { resource: 'gold', amount: 1 }],
    desc: '+2 Food, +1 Gold'
  },
  {
    id: 'grand_exchange', name: 'The Grand Exchange', type: 'building',
    image: 'v1/the_grand_exchange.png',
    effects: [{ resource: 'gold', amount: 5 }],
    desc: '+5 Gold'
  },
  {
    id: 'parliament', name: 'Lower Parliament', type: 'building',
    image: 'v1/lower_parliment.png',
    effects: [{ resource: 'culture', amount: 4 }],
    desc: '+4 Culture'
  },
  {
    id: 'fire_pit', name: 'Communal Fire Pit', type: 'building',
    image: 'v1/communal-fire-pit.png',
    effects: [{ resource: 'gold', amount: 1 }, { resource: 'food', amount: 1 }, { resource: 'faith', amount: 1 }],
    desc: '+1 Gold, +1 Food, +1 Faith'
  },
  {
    id: 'river_dwellings', name: 'River Dwellings', type: 'building',
    image: 'v1/river-dwellings.png',
    effects: [{ resource: 'food', amount: 2 }, { resource: 'gold', amount: 1 }],
    desc: '+2 Food, +1 Gold'
  },
  {
    id: 'town_center', name: 'Town Center', type: 'building',
    image: 'v1/town_center_in_dispair.png',
    effects: [{ resource: 'gold', amount: 1 }, { resource: 'food', amount: 1 }, { resource: 'culture', amount: 1 }],
    desc: '+1 Gold, +1 Food, +1 Culture'
  },
  // Units
  {
    id: 'guerrilla_horse', name: 'Guerrilla Cavalry', type: 'unit',
    image: 'v1/gurellia_horse.png',
    effects: [{ resource: 'defense', amount: 2 }, { resource: 'threat', amount: -3 }],
    desc: '+2 Defense, -3 Threat'
  },
  {
    id: 'guerrilla_infantry', name: 'Guerrilla Infantry', type: 'unit',
    image: 'v1/gurellia_infrantry.png',
    effects: [{ resource: 'defense', amount: 1 }, { resource: 'threat', amount: -2 }],
    desc: '+1 Defense, -2 Threat'
  },
  {
    id: 'mining_drill', name: 'Asteroid Mining Drill', type: 'unit',
    image: 'v1/astroid_mining_drill.png',
    effects: [{ resource: 'science', amount: 4 }, { resource: 'gold', amount: 2 }],
    desc: '+4 Science, +2 Gold'
  },
  // Hand events (player chooses)
  {
    id: 'negotiations', name: 'Negotiations', type: 'event',
    image: 'v1/negotiations.png',
    desc: 'Choose a diplomatic outcome',
    choices: [
      { label: 'Accept Terms', effects: [{ resource: 'gold', amount: 5 }] },
      { label: 'Demand More', effects: [{ resource: 'threat', amount: -2 }, { resource: 'culture', amount: 2 }] }
    ]
  },
  {
    id: 'vineyard', name: "Soldiers' Vineyard", type: 'event',
    image: 'v1/soldiers_stumble_on_vingeyard.png',
    desc: 'A lucky discovery — what do your soldiers do?',
    choices: [
      { label: 'Claim the Vineyard', effects: [{ resource: 'food', amount: 4 }, { resource: 'gold', amount: 1 }] },
      { label: 'Leave It Be', effects: [{ resource: 'faith', amount: 3 }] }
    ]
  },
  {
    id: 'council', name: 'Council Meeting', type: 'event',
    image: 'v1/art-noveau- meeting_room.png',
    desc: 'The council demands a vote on priorities',
    choices: [
      { label: 'Fund the Arts', effects: [{ resource: 'culture', amount: 5 }] },
      { label: 'Fund the Temples', effects: [{ resource: 'faith', amount: 4 }, { resource: 'food', amount: 1 }] }
    ]
  },
];

const RANDOM_EVENTS = [
  {
    name: 'Scientific Breakthrough',
    image: 'old/00000-624751989.png',
    choices: [
      { label: 'Fund Research', effects: [{ resource: 'science', amount: 4 }] },
      { label: 'Sell the Discovery', effects: [{ resource: 'gold', amount: 5 }] }
    ]
  },
  {
    name: 'Lost Ruins Discovered',
    image: 'old/00010-3419429122.png',
    choices: [
      { label: 'Excavate Carefully', effects: [{ resource: 'science', amount: 3 }, { resource: 'culture', amount: 2 }] },
      { label: 'Loot and Move On', effects: [{ resource: 'gold', amount: 6 }] }
    ]
  },
  {
    name: 'Military Crisis',
    image: 'old/00018-2402048703.png',
    choices: [
      { label: 'Deploy Forces', effects: [{ resource: 'threat', amount: -4 }, { resource: 'gold', amount: -2 }] },
      { label: 'Fortify Borders', effects: [{ resource: 'defense', amount: 3 }] }
    ]
  },
  {
    name: 'Parliament Convenes',
    image: 'old/00030-1217213740.png',
    choices: [
      { label: 'Pass Grain Laws', effects: [{ resource: 'food', amount: 4 }, { resource: 'culture', amount: 1 }] },
      { label: 'Pass Trade Laws', effects: [{ resource: 'gold', amount: 4 }, { resource: 'science', amount: 1 }] }
    ]
  },
  {
    name: 'Ancient Ritual Site',
    image: 'old/00042-2516955697.png',
    choices: [
      { label: 'Hold Ceremony', effects: [{ resource: 'faith', amount: 5 }] },
      { label: 'Build Over It', effects: [{ resource: 'gold', amount: 3 }, { resource: 'faith', amount: -1 }] }
    ]
  },
  {
    name: 'The Great Flood',
    image: 'old/00054-1954791785.png',
    choices: [
      { label: 'Build Levees', effects: [{ resource: 'food', amount: -2 }, { resource: 'gold', amount: -2 }] },
      { label: 'Retreat to High Ground', effects: [{ resource: 'food', amount: -4 }, { resource: 'culture', amount: 2 }] }
    ]
  },
  {
    name: 'Workshop Fire',
    image: 'old/00062-3473479164.png',
    choices: [
      { label: 'Fight the Flames', effects: [{ resource: 'gold', amount: -3 }, { resource: 'threat', amount: 1 }] },
      { label: 'Rebuild Stronger', effects: [{ resource: 'gold', amount: -2 }, { resource: 'science', amount: 3 }] }
    ]
  },
];
