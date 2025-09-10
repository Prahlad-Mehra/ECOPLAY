import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Droplets, 
  Zap, 
  Wind, 
  TreePine, 
  Recycle, 
  Waves, 
  Home,
  Factory
} from 'lucide-react';
import TopicModal from './TopicModal';

interface Topic {
  id: string;
  title: string;
  description: string;
  detailedContent: string;
  keyPoints: string[];
  quizCategory: string;
  icon: React.ComponentType<any>;
  color: string;
}

const EnvironmentalLearningHub = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const topics: Topic[] = [
    {
      id: 'climate-change',
      title: 'Climate Change',
      description: 'Understanding global warming and its impacts',
      detailedContent: `Climate change refers to long-term shifts in global temperatures and weather patterns. While climate variations are natural, human activities since the 1800s have been the main driver of climate change, primarily due to burning fossil fuels like coal, oil, and gas.

The greenhouse effect is essential for life on Earth, but human activities have intensified this natural process. When we burn fossil fuels, we release greenhouse gases like carbon dioxide into the atmosphere. These gases trap heat from the sun, causing global temperatures to rise.

The consequences of climate change are far-reaching and include rising sea levels, more frequent extreme weather events, changes in precipitation patterns, and threats to food security. However, by understanding these challenges, we can take action to reduce our carbon footprint and adapt to changing conditions.`,
      keyPoints: [
        'Global average temperature has risen by 1.1°C since pre-industrial times',
        'Carbon dioxide levels are the highest they\'ve been in 3 million years',
        'Arctic sea ice is declining at a rate of 13% per decade',
        'Renewable energy adoption can significantly reduce greenhouse gas emissions',
        'Individual actions like energy conservation make a collective difference'
      ],
      quizCategory: 'climate',
      icon: Globe,
      color: 'blue'
    },
    {
      id: 'water-conservation',
      title: 'Water Conservation',
      description: 'Protecting our most precious resource',
      detailedContent: `Water is essential for all life on Earth, yet only 2.5% of the planet's water is freshwater, and much of that is locked in ice caps and glaciers. This makes freshwater one of our most precious and limited resources.

The water cycle continuously moves water through the environment via evaporation, condensation, and precipitation. However, human activities like pollution, over-extraction, and climate change are disrupting this natural cycle. Water pollution from industrial waste, agricultural runoff, and plastic contamination threatens both human health and aquatic ecosystems.

Conservation efforts focus on reducing water waste, protecting water sources from pollution, and developing sustainable water management practices. Simple actions like fixing leaks, using water-efficient appliances, and protecting watersheds can have significant impacts on water availability for future generations.`,
      keyPoints: [
        'Only 0.3% of Earth\'s water is accessible freshwater for human use',
        'Agriculture consumes 70% of global freshwater supplies',
        'A single dripping faucet can waste over 3,000 gallons per year',
        'Wetlands act as natural water filters and flood protection',
        'Rainwater harvesting can reduce household water consumption by 40%'
      ],
      quizCategory: 'water',
      icon: Droplets,
      color: 'cyan'
    },
    {
      id: 'renewable-energy',
      title: 'Renewable Energy',
      description: 'Clean energy for a sustainable future',
      detailedContent: `Renewable energy comes from natural sources that are constantly replenished, such as sunlight, wind, rain, tides, waves, and geothermal heat. Unlike fossil fuels, renewable energy sources produce little to no greenhouse gas emissions and will never run out.

Solar energy harnesses the power of the sun through photovoltaic panels or solar thermal systems. Wind energy captures the kinetic energy of moving air through wind turbines. Hydroelectric power uses flowing water to generate electricity, while geothermal energy taps into the Earth's internal heat.

The transition to renewable energy is crucial for combating climate change and achieving energy independence. As technology advances, renewable energy becomes more efficient and cost-effective, making it increasingly competitive with traditional fossil fuels. Many countries are setting ambitious targets to achieve 100% renewable energy in the coming decades.`,
      keyPoints: [
        'Solar energy could theoretically power the entire world 10,000 times over',
        'Wind power capacity has grown by 260% in the last decade',
        'Renewable energy now employs over 13 million people worldwide',
        'The cost of solar power has dropped by 90% since 2010',
        'Renewable energy sources produce 26% of global electricity'
      ],
      quizCategory: 'energy',
      icon: Zap,
      color: 'yellow'
    },
    {
      id: 'air-pollution',
      title: 'Air Pollution & Solutions',
      description: 'Cleaning the air we breathe',
      detailedContent: `Air pollution occurs when harmful substances are released into the atmosphere, affecting human health, wildlife, and the environment. Major pollutants include particulate matter, nitrogen oxides, sulfur dioxide, carbon monoxide, and volatile organic compounds.

The primary sources of air pollution are transportation, industrial processes, power generation, and agricultural activities. Vehicle emissions contribute significantly to urban air pollution, while industrial facilities and power plants release large quantities of pollutants into the atmosphere.

Solutions to air pollution include transitioning to clean energy sources, improving public transportation, implementing stricter emission standards, and developing green technologies. Cities worldwide are creating low-emission zones, promoting electric vehicles, and investing in air quality monitoring systems to protect public health.`,
      keyPoints: [
        'Air pollution causes 7 million premature deaths annually worldwide',
        'Transportation accounts for 24% of global CO₂ emissions',
        'Electric vehicles produce 60% fewer emissions than gasoline cars',
        'Trees can remove up to 48 pounds of CO₂ per year',
        'Indoor air can be 2-5 times more polluted than outdoor air'
      ],
      quizCategory: 'general',
      icon: Wind,
      color: 'gray'
    },
    {
      id: 'deforestation-biodiversity',
      title: 'Deforestation & Biodiversity',
      description: 'Protecting forests and wildlife',
      detailedContent: `Forests cover about 31% of the global land area and are home to 80% of terrestrial biodiversity. They play crucial roles in regulating climate, purifying air and water, and providing resources for billions of people. However, we lose 10 million hectares of forest annually due to deforestation.

Biodiversity refers to the variety of life on Earth, including genetic diversity within species, species diversity within ecosystems, and ecosystem diversity across landscapes. This diversity is essential for ecosystem stability, resilience, and the provision of ecosystem services that humans depend on.

Deforestation and habitat destruction are the leading causes of biodiversity loss. When forests are cleared for agriculture, urban development, or logging, countless species lose their homes. Conservation efforts focus on protecting existing forests, restoring degraded habitats, and creating wildlife corridors that connect fragmented ecosystems.`,
      keyPoints: [
        'Forests store 25% of all terrestrial carbon',
        'We\'re currently experiencing the 6th mass extinction event',
        'Tropical rainforests contain 50% of Earth\'s biodiversity on just 6% of land',
        'One tree can produce enough oxygen for two people per day',
        'Reforestation can restore ecosystems and create carbon sinks'
      ],
      quizCategory: 'biodiversity',
      icon: TreePine,
      color: 'green'
    },
    {
      id: 'waste-management',
      title: 'Waste Management & Recycling',
      description: 'Reducing, reusing, and recycling for a cleaner planet',
      detailedContent: `Effective waste management follows the "3 Rs" hierarchy: Reduce, Reuse, and Recycle. The goal is to minimize the amount of waste sent to landfills and incinerators while maximizing resource recovery and environmental protection.

Reducing consumption is the most effective strategy, followed by reusing items for their original or alternative purposes. Recycling involves processing used materials into new products, conserving raw materials and energy. Composting organic waste creates nutrient-rich soil amendments while reducing methane emissions from landfills.

Modern waste management systems also focus on waste-to-energy technologies, extended producer responsibility, and circular economy principles. These approaches aim to eliminate waste by designing products for durability, repairability, and recyclability, creating closed-loop systems where waste becomes input for new production cycles.`,
      keyPoints: [
        'The average person generates 4.5 pounds of waste daily',
        'Recycling one aluminum can saves enough energy to run a TV for 3 hours',
        'Composting can reduce household waste by up to 30%',
        'Plastic takes 400-1000 years to decompose in landfills',
        'The circular economy could generate $4.5 trillion in economic benefits by 2030'
      ],
      quizCategory: 'waste',
      icon: Recycle,
      color: 'emerald'
    },
    {
      id: 'ocean-conservation',
      title: 'Ocean Conservation',
      description: 'Protecting marine ecosystems and life',
      detailedContent: `Oceans cover 71% of Earth's surface and contain 97% of the planet's water. They regulate climate, produce over 50% of the oxygen we breathe, and support incredible biodiversity. Marine ecosystems provide food, livelihoods, and economic benefits for billions of people worldwide.

However, oceans face unprecedented threats from pollution, overfishing, climate change, and acidification. Plastic pollution has created massive garbage patches, while chemical runoff creates dead zones where marine life cannot survive. Rising temperatures and changing ocean chemistry threaten coral reefs and marine food chains.

Ocean conservation efforts include establishing marine protected areas, reducing plastic pollution, sustainable fishing practices, and addressing climate change. Individual actions like reducing plastic use, choosing sustainable seafood, and supporting ocean conservation organizations can contribute to protecting these vital ecosystems.`,
      keyPoints: [
        'Oceans absorb 30% of human-produced carbon dioxide',
        '8 million tons of plastic enter oceans annually',
        'Coral reefs support 25% of marine species on less than 1% of ocean area',
        'Overfishing affects 90% of global fish stocks',
        'Marine protected areas can increase fish populations by 600%'
      ],
      quizCategory: 'general',
      icon: Waves,
      color: 'blue'
    },
    {
      id: 'sustainable-living',
      title: 'Sustainable Living',
      description: 'Everyday choices for environmental impact',
      detailedContent: `Sustainable living involves making conscious choices that reduce our environmental impact while maintaining quality of life. It encompasses everything from the food we eat and products we buy to how we travel and use energy in our homes.

Key aspects of sustainable living include choosing renewable energy, reducing consumption, buying local and organic products, minimizing waste, and using eco-friendly transportation. Sustainable practices also involve supporting businesses that prioritize environmental responsibility and social equity.

The goal is to live within Earth's ecological limits while ensuring that future generations can meet their own needs. This requires balancing economic, social, and environmental considerations in our daily decisions. Small changes in individual behavior, when adopted by many people, can create significant positive environmental impacts.`,
      keyPoints: [
        'The average American carbon footprint is 16 tons CO₂ per year',
        'Eating less meat can reduce personal emissions by up to 73%',
        'LED bulbs use 75% less energy than incandescent bulbs',
        'Buying local food can reduce transportation emissions by 90%',
        'A vegetarian diet saves 1,100 gallons of water per day'
      ],
      quizCategory: 'general',
      icon: Home,
      color: 'green'
    },
    {
      id: 'pollution-control',
      title: 'Pollution Control',
      description: 'Strategies to reduce environmental contamination',
      detailedContent: `Pollution control involves preventing, reducing, and managing the release of harmful substances into the environment. This includes air pollution from vehicles and industries, water pollution from chemicals and waste, soil contamination from pesticides and heavy metals, and noise pollution in urban areas.

Effective pollution control requires a combination of regulatory measures, technological solutions, and behavioral changes. Governments implement emission standards, environmental regulations, and monitoring systems. Industries develop cleaner production technologies, waste treatment systems, and pollution prevention strategies.

Individual actions also play a crucial role in pollution control. Choosing eco-friendly products, properly disposing of hazardous materials, reducing energy consumption, and supporting clean transportation options all contribute to reducing pollution levels and protecting environmental and human health.`,
      keyPoints: [
        'Air pollution reduces global life expectancy by 2.2 years on average',
        'Industrial activities account for 21% of global greenhouse gas emissions',
        'Proper waste treatment can remove 99% of pollutants from wastewater',
        'Catalytic converters reduce vehicle emissions by up to 90%',
        'Green building standards can reduce energy use by 30-50%'
      ],
      quizCategory: 'general',
      icon: Factory,
      color: 'red'
    }
  ];

  const openModal = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTopic(null), 300);
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Environmental Learning Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore comprehensive guides on key environmental topics. Click any card to dive deep into the science, 
            impacts, and solutions for each environmental challenge.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => openModal(topic)}
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                {/* Icon Header */}
                <div className={`h-24 bg-gradient-to-br from-${topic.color}-400 to-${topic.color}-600 flex items-center justify-center relative overflow-hidden`}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <topic.icon className="w-12 h-12 text-white drop-shadow-lg" />
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full" />
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {topic.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {topic.description}
                  </p>
                  
                  {/* Learn More Indicator */}
                  <div className="flex items-center justify-between">
                    <span className={`text-${topic.color}-600 font-semibold text-sm group-hover:text-${topic.color}-700 transition-colors`}>
                      Click to learn more
                    </span>
                    <motion.div
                      className={`w-8 h-8 bg-${topic.color}-100 rounded-full flex items-center justify-center group-hover:bg-${topic.color}-200 transition-colors`}
                      whileHover={{ x: 5 }}
                    >
                      <span className={`text-${topic.color}-600 text-lg`}>→</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Test Your Knowledge?</h3>
            <p className="text-xl mb-6 opacity-90">
              After exploring these topics, challenge yourself with our interactive quizzes!
            </p>
            <Link to="/quizzes">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                Take Environmental Quizzes
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Topic Modal */}
      <TopicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        topic={selectedTopic}
      />
    </div>
  );
};

export default EnvironmentalLearningHub;