import { Lesson } from '../types';

export const waterCycleLesson: Lesson = {
  id: 'water-cycle',
  title: 'Water Cycle Adventure',
  description: 'Discover how water moves through our planet in an endless cycle of transformation.',
  badge: 'Water Guardian',
  availableLayers: [
    { id: 'sun', name: 'Sun' },
    { id: 'ocean', name: 'Ocean/Lake' },
    { id: 'clouds', name: 'Clouds' },
    { id: 'vegetation', name: 'Vegetation' },
    { id: 'mountains', name: 'Mountains' },
    { id: 'city', name: 'City' }
  ],
  steps: [
    {
      id: 'evaporation',
      title: 'Evaporation',
      explainer: 'The sun heats water in oceans, lakes, and rivers, turning it into invisible water vapor that rises into the atmosphere.',
      mcq: {
        question: 'What causes water to evaporate and rise into the atmosphere?',
        options: [
          { id: 'wind', text: 'Wind blowing across the water' },
          { id: 'heat', text: 'Heat energy from the sun' },
          { id: 'gravity', text: 'Gravitational pull from the moon' },
          { id: 'pressure', text: 'Air pressure changes' }
        ],
        correctOptionId: 'heat',
        explanationOnCorrect: 'Correct! Solar energy provides the heat needed to convert liquid water into water vapor.',
        explanationOnWrong: 'Not quite. The sun\'s heat energy is what powers evaporation by giving water molecules enough energy to become vapor.'
      },
      visibleLayers: ['sun', 'ocean'],
      animationCues: ['sun-shimmer', 'evaporation-arrows', 'heat-waves']
    },
    {
      id: 'condensation',
      title: 'Condensation',
      explainer: 'As water vapor rises high into the cooler atmosphere, it cools down and condenses around tiny particles to form water droplets in clouds.',
      mcq: {
        question: 'What happens to water vapor when it reaches the cooler upper atmosphere?',
        options: [
          { id: 'disappears', text: 'It disappears completely' },
          { id: 'condenses', text: 'It condenses into tiny water droplets' },
          { id: 'freezes-solid', text: 'It immediately freezes into ice' },
          { id: 'expands', text: 'It expands and becomes lighter' }
        ],
        correctOptionId: 'condenses',
        explanationOnCorrect: 'Excellent! Cooler temperatures cause water vapor to condense around particles, forming the tiny droplets that make up clouds.',
        explanationOnWrong: 'Try again. When water vapor cools, it condenses back into tiny liquid droplets that form clouds.'
      },
      visibleLayers: ['sun', 'ocean', 'clouds'],
      animationCues: ['vapor-rise', 'cloud-formation', 'droplet-cluster']
    },
    {
      id: 'precipitation',
      title: 'Precipitation',
      explainer: 'When water droplets in clouds become too heavy, they fall to Earth as precipitation - rain, snow, sleet, or hail.',
      mcq: {
        question: 'What causes precipitation to fall from clouds?',
        options: [
          { id: 'wind-force', text: 'Strong winds push the water out' },
          { id: 'droplet-weight', text: 'Water droplets become too heavy to stay in the air' },
          { id: 'cloud-explosion', text: 'Clouds explode from too much pressure' },
          { id: 'gravity-waves', text: 'Special gravity waves pull water down' }
        ],
        correctOptionId: 'droplet-weight',
        explanationOnCorrect: 'Perfect! When water droplets in clouds merge and become too heavy, gravity pulls them down as precipitation.',
        explanationOnWrong: 'Not quite right. Precipitation occurs when water droplets grow large and heavy enough that gravity pulls them down to Earth.'
      },
      visibleLayers: ['clouds', 'mountains', 'city', 'vegetation'],
      animationCues: ['rainfall', 'droplet-fall', 'cloud-release']
    },
    {
      id: 'collection',
      title: 'Collection & Runoff',
      explainer: 'Precipitation collects in rivers, lakes, and oceans. Some water flows as runoff across the surface back to larger bodies of water.',
      mcq: {
        question: 'What happens to precipitation when it reaches the ground?',
        options: [
          { id: 'all-evaporates', text: 'It all evaporates immediately' },
          { id: 'collects-flows', text: 'It collects and flows toward rivers, lakes, and oceans' },
          { id: 'stays-put', text: 'It stays exactly where it lands' },
          { id: 'goes-underground', text: 'It all goes deep underground' }
        ],
        correctOptionId: 'collects-flows',
        explanationOnCorrect: 'Great job! Water follows gravity, collecting in low areas and flowing as runoff toward larger water bodies.',
        explanationOnWrong: 'Think about what happens to water on a slope. It flows downhill, collecting in streams, rivers, lakes, and oceans.'
      },
      visibleLayers: ['ocean', 'mountains', 'city'],
      animationCues: ['water-flow', 'runoff-streams', 'collection-pools']
    },
    {
      id: 'infiltration',
      title: 'Infiltration & Groundwater',
      explainer: 'Some water soaks into the ground becoming groundwater. Plants also release water vapor through their leaves in a process called transpiration.',
      mcq: {
        question: 'What are the two ways water can return to the atmosphere from land?',
        options: [
          { id: 'only-evaporation', text: 'Only through evaporation from surfaces' },
          { id: 'evap-transpiration', text: 'Through evaporation and transpiration from plants' },
          { id: 'only-transpiration', text: 'Only through transpiration from plants' },
          { id: 'wind-pressure', text: 'Through wind and air pressure changes' }
        ],
        correctOptionId: 'evap-transpiration',
        explanationOnCorrect: 'Excellent! Water returns to the atmosphere through both evaporation from surfaces and transpiration from plants.',
        explanationOnWrong: 'Remember, plants release water through their leaves (transpiration), and water also evaporates from soil and surface water.'
      },
      visibleLayers: ['vegetation', 'mountains'],
      animationCues: ['infiltration-arrows', 'transpiration-bubbles', 'groundwater-flow']
    }
  ]
};

export const nitrogenCycleLesson: Lesson = {
  id: 'nitrogen-cycle',
  title: 'Nitrogen Cycle Explorer',
  description: 'Learn how nitrogen moves through ecosystems, supporting all life on Earth.',
  badge: 'Nitrogen Master',
  availableLayers: [
    { id: 'atmosphere', name: 'Atmosphere' },
    { id: 'bacteria', name: 'Bacteria' },
    { id: 'plants', name: 'Plants' },
    { id: 'animals', name: 'Animals' },
    { id: 'soil', name: 'Soil' },
    { id: 'decomposers', name: 'Decomposers' }
  ],
  steps: [
    {
      id: 'nitrogen-fixation',
      title: 'Nitrogen Fixation',
      explainer: 'Special bacteria in soil and plant roots convert atmospheric nitrogen gas (N₂) into ammonia, making it available for plants to use.',
      mcq: {
        question: 'What converts atmospheric nitrogen into a form plants can use?',
        options: [
          { id: 'sunlight', text: 'Direct sunlight' },
          { id: 'bacteria', text: 'Nitrogen-fixing bacteria' },
          { id: 'plant-roots', text: 'Plant roots alone' },
          { id: 'rainfall', text: 'Rainwater' }
        ],
        correctOptionId: 'bacteria',
        explanationOnCorrect: 'Correct! Nitrogen-fixing bacteria have the special ability to convert N₂ gas into ammonia that plants can absorb.',
        explanationOnWrong: 'Not quite. Only certain bacteria have the enzymes needed to "fix" atmospheric nitrogen into ammonia.'
      },
      visibleLayers: ['atmosphere', 'bacteria', 'soil'],
      animationCues: ['nitrogen-molecules', 'bacteria-conversion', 'ammonia-production']
    },
    {
      id: 'nitrification',
      title: 'Nitrification',
      explainer: 'Soil bacteria convert ammonia into nitrites and then into nitrates, the form of nitrogen that plants can easily absorb through their roots.',
      mcq: {
        question: 'What do nitrifying bacteria convert ammonia into?',
        options: [
          { id: 'oxygen', text: 'Pure oxygen' },
          { id: 'nitrates', text: 'Nitrites and nitrates' },
          { id: 'carbon', text: 'Carbon compounds' },
          { id: 'water', text: 'Water molecules' }
        ],
        correctOptionId: 'nitrates',
        explanationOnCorrect: 'Perfect! Nitrifying bacteria first convert ammonia to nitrites, then to nitrates - the form plants prefer.',
        explanationOnWrong: 'Think about the nitrogen compounds. Bacteria convert ammonia through nitrites into nitrates for plants.'
      },
      visibleLayers: ['bacteria', 'soil'],
      animationCues: ['ammonia-conversion', 'nitrite-formation', 'nitrate-creation']
    },
    {
      id: 'assimilation',
      title: 'Assimilation',
      explainer: 'Plants absorb nitrates through their roots and use them to build proteins and nucleic acids. Animals then eat plants to get their nitrogen.',
      mcq: {
        question: 'How do animals get the nitrogen they need?',
        options: [
          { id: 'breathing', text: 'By breathing atmospheric nitrogen' },
          { id: 'eating-plants', text: 'By eating plants or other animals that ate plants' },
          { id: 'absorbing-soil', text: 'By absorbing it directly from soil' },
          { id: 'drinking-water', text: 'By drinking nitrogen-rich water' }
        ],
        correctOptionId: 'eating-plants',
        explanationOnCorrect: 'Exactly! Animals get nitrogen by eating plants (or other animals), as they cannot use atmospheric nitrogen directly.',
        explanationOnWrong: 'Remember, animals cannot use atmospheric nitrogen directly - they must get it through the food chain.'
      },
      visibleLayers: ['plants', 'animals', 'soil'],
      animationCues: ['root-absorption', 'protein-building', 'food-chain-arrows']
    },
    {
      id: 'ammonification',
      title: 'Ammonification (Decay)',
      explainer: 'When plants and animals die, decomposer bacteria break down their nitrogen-containing compounds, returning ammonia to the soil.',
      mcq: {
        question: 'What happens to nitrogen compounds when organisms die?',
        options: [
          { id: 'disappear', text: 'They disappear completely' },
          { id: 'decompose-ammonia', text: 'Decomposers break them down into ammonia' },
          { id: 'become-oxygen', text: 'They turn into oxygen gas' },
          { id: 'stay-unchanged', text: 'They remain unchanged in the soil' }
        ],
        correctOptionId: 'decompose-ammonia',
        explanationOnCorrect: 'Great! Decomposer bacteria break down organic nitrogen compounds, releasing ammonia back to the soil.',
        explanationOnWrong: 'Think about decomposition. Bacteria break down dead organisms, releasing their nitrogen as ammonia back to the soil.'
      },
      visibleLayers: ['decomposers', 'soil', 'plants'],
      animationCues: ['decay-process', 'ammonia-release', 'nutrient-cycling']
    },
    {
      id: 'denitrification',
      title: 'Denitrification',
      explainer: 'In waterlogged soils, denitrifying bacteria convert nitrates back into nitrogen gas, which returns to the atmosphere, completing the cycle.',
      mcq: {
        question: 'How does nitrogen return to the atmosphere?',
        options: [
          { id: 'plant-breathing', text: 'Plants release it when they breathe' },
          { id: 'denitrifying-bacteria', text: 'Denitrifying bacteria convert nitrates to nitrogen gas' },
          { id: 'animal-exhaling', text: 'Animals exhale it directly' },
          { id: 'soil-evaporation', text: 'It evaporates from dry soil' }
        ],
        correctOptionId: 'denitrifying-bacteria',
        explanationOnCorrect: 'Excellent! Denitrifying bacteria in waterlogged soils convert nitrates back to nitrogen gas, completing the cycle.',
        explanationOnWrong: 'Close the loop! Denitrifying bacteria return nitrogen to the atmosphere as nitrogen gas.'
      },
      visibleLayers: ['bacteria', 'soil', 'atmosphere'],
      animationCues: ['denitrification', 'nitrogen-release', 'atmospheric-return']
    }
  ]
};

export const lessons = [waterCycleLesson, nitrogenCycleLesson];