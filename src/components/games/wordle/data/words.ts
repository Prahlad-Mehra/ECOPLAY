export interface WordData {
  word: string;
  definition: string;
  applications: string;
  significance: string;
  relatedConcepts: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export const environmentalWords: WordData[] = [
  {
    word: "RECYCLE",
    definition: "The process of converting waste materials into new materials and objects to prevent waste of potentially useful materials.",
    applications: "Recycling aluminum cans, plastic bottles, paper, and electronic waste. Municipal recycling programs and industrial material recovery.",
    significance: "Reduces landfill waste, conserves natural resources, saves energy, and decreases greenhouse gas emissions by up to 1.17 tons of CO2 equivalent per ton of recycled materials.",
    relatedConcepts: ["Circular Economy", "Waste Reduction", "Resource Conservation", "Upcycling"],
    difficulty: "easy"
  },
  {
    word: "EX SITU",
    definition: "Conservation methods that involve removing endangered species from their natural habitat to breed and maintain them in artificial environments like zoos, botanical gardens, or seed banks.",
    applications: "Captive breeding programs for pandas, California condors, and Arabian oryx. Seed banks for crop varieties and endangered plant species.",
    significance: "Serves as a safety net for species facing extinction, maintains genetic diversity, and provides opportunities for research and eventual reintroduction to wild habitats.",
    relatedConcepts: ["In Situ Conservation", "Captive Breeding", "Seed Banks", "Species Recovery"],
    difficulty: "hard"
  },
  {
    word: "IN SITU",
    definition: "Conservation strategies that protect endangered species within their natural habitats by preserving entire ecosystems and communities.",
    applications: "National parks, wildlife reserves, marine protected areas, and community-based conservation programs in local communities.",
    significance: "Maintains natural ecological processes, preserves entire food webs, and is generally more cost-effective than ex situ methods while protecting multiple species simultaneously.",
    relatedConcepts: ["Protected Areas", "Habitat Conservation", "Ecosystem Services", "Biodiversity Hotspots"],
    difficulty: "hard"
  },
  {
    word: "BIOME",
    definition: "A large naturally occurring community of flora and fauna occupying a major habitat, characterized by distinctive climate conditions and dominant vegetation types.",
    applications: "Classification systems for tropical rainforests, temperate grasslands, taiga, tundra, and desert ecosystems used in conservation planning and climate research.",
    significance: "Understanding biomes helps predict climate change impacts, design conservation strategies, and manage natural resources across different geographic regions.",
    relatedConcepts: ["Ecosystem", "Climate Zones", "Biodiversity", "Habitat Types"],
    difficulty: "medium"
  },
  {
    word: "CARBON",
    definition: "A chemical element that forms the backbone of all organic compounds and plays a crucial role in Earth's climate system through the carbon cycle.",
    applications: "Carbon footprint calculations, carbon trading markets, reforestation projects, and carbon capture and storage technologies.",
    significance: "Carbon dioxide is the primary greenhouse gas driving climate change, making carbon management essential for climate mitigation and achieving net-zero emissions.",
    relatedConcepts: ["Greenhouse Gases", "Climate Change", "Carbon Cycle", "Photosynthesis"],
    difficulty: "easy"
  },
  {
    word: "OZONE",
    definition: "A triatomic form of oxygen (O₃) that exists in Earth's stratosphere, forming a protective layer that shields life from harmful ultraviolet radiation.",
    applications: "Monitoring ozone depletion, regulating ozone-depleting substances, and tracking recovery of the ozone layer through international agreements.",
    significance: "The ozone layer prevents harmful UV-B radiation from reaching Earth's surface, protecting human health and preventing damage to crops and marine ecosystems.",
    relatedConcepts: ["UV Radiation", "Chlorofluorocarbons", "Montreal Protocol", "Stratosphere"],
    difficulty: "medium"
  },
  {
    word: "HABITAT",
    definition: "The natural environment where an organism lives and meets all its needs for survival, including food, water, shelter, and breeding conditions.",
    applications: "Habitat restoration projects, wildlife corridor creation, urban planning that considers wildlife needs, and environmental impact assessments.",
    significance: "Habitat destruction is the leading cause of biodiversity loss, making habitat conservation critical for maintaining ecosystem services and preventing extinctions.",
    relatedConcepts: ["Ecological Niche", "Habitat Fragmentation", "Biodiversity", "Conservation"],
    difficulty: "easy"
  },
  {
    word: "BIOMASS",
    definition: "The total mass of living organisms in a given area or ecosystem, often used as a renewable energy source when converted to biofuels.",
    applications: "Bioenergy production from wood chips, agricultural residues, algae cultivation for biodiesel, and biomass power plants for electricity generation.",
    significance: "Biomass represents stored solar energy and can provide carbon-neutral energy alternatives while supporting sustainable waste management practices.",
    relatedConcepts: ["Renewable Energy", "Biofuels", "Energy Pyramid", "Primary Productivity"],
    difficulty: "medium"
  },
  {
    word: "WETLAND",
    definition: "Ecosystems where water is present at or near the surface for extended periods, creating unique conditions that support specialized plant and animal communities.",
    applications: "Natural water filtration systems, flood control infrastructure, wildlife refuges, and ecotourism destinations supporting local economies.",
    significance: "Wetlands provide critical ecosystem services including water purification, flood control, carbon sequestration, and serve as nurseries for many aquatic species.",
    relatedConcepts: ["Ecosystem Services", "Water Cycle", "Biodiversity Hotspots", "Flood Control"],
    difficulty: "medium"
  },
  {
    word: "EROSION",
    definition: "The gradual wearing away and transport of soil, rock, and other surface materials by natural forces such as wind, water, and ice.",
    applications: "Soil conservation practices in agriculture, coastal protection measures, watershed management, and preventing desertification in arid regions.",
    significance: "Erosion can lead to soil degradation, water pollution, loss of fertile farmland, and increased flood risk, making erosion control essential for sustainable land use.",
    relatedConcepts: ["Soil Conservation", "Weathering", "Sedimentation", "Land Degradation"],
    difficulty: "easy"
  },
  {
    word: "ENDEMIC",
    definition: "Species that are native to and found only in a specific geographic region, having evolved in isolation and adapted to local environmental conditions.",
    applications: "Conservation prioritization in biodiversity hotspots, island biogeography studies, and protecting unique species in isolated ecosystems.",
    significance: "Endemic species are particularly vulnerable to extinction and represent irreplaceable components of global biodiversity, often indicating ecosystem health and uniqueness.",
    relatedConcepts: ["Biodiversity Hotspots", "Evolution", "Island Biogeography", "Species Conservation"],
    difficulty: "hard"
  },
  {
    word: "TOXIN",
    definition: "Poisonous substances produced by living organisms that can cause harm to other organisms, including humans, when introduced into biological systems.",
    applications: "Environmental monitoring for natural toxins, biotechnology applications using controlled toxin production, and research into toxin effects on ecosystems.",
    significance: "Understanding natural toxins helps assess environmental health risks, develop safety protocols, and study ecological interactions between species.",
    relatedConcepts: ["Bioaccumulation", "Food Chain", "Environmental Health", "Pollution"],
    difficulty: "medium"
  },
  {
    word: "ALGAE",
    definition: "Simple photosynthetic organisms ranging from microscopic single cells to large multicellular forms, playing crucial roles in aquatic ecosystems and oxygen production.",
    applications: "Biofuel production, wastewater treatment systems, food supplements, and indicators of water quality in environmental monitoring programs.",
    significance: "Algae produce approximately 70% of Earth's oxygen and form the base of most aquatic food webs, while also showing potential for sustainable biotechnology applications.",
    relatedConcepts: ["Photosynthesis", "Aquatic Ecosystems", "Biofuels", "Primary Producers"],
    difficulty: "easy"
  },
  {
    word: "FOREST",
    definition: "Large areas dominated by trees and their associated plant communities, forming complex ecosystems that support diverse wildlife and provide numerous environmental services.",
    applications: "Timber production, carbon sequestration projects, wildlife conservation, watershed protection, and ecotourism supporting local communities.",
    significance: "Forests store 25% of terrestrial carbon, provide habitat for 80% of land-based species, and supply essential resources while regulating water cycles and climate patterns.",
    relatedConcepts: ["Carbon Sequestration", "Biodiversity", "Deforestation", "Ecosystem Services"],
    difficulty: "easy"
  },
  {
    word: "TUNDRA",
    definition: "A biome characterized by very cold temperatures, low precipitation, and permanently frozen subsoil (permafrost), supporting specialized cold-adapted plant and animal communities.",
    applications: "Climate change research, permafrost monitoring, wildlife migration studies, and understanding Arctic ecosystem responses to warming temperatures.",
    significance: "Tundra ecosystems store vast amounts of carbon in permafrost and are highly sensitive to climate change, potentially releasing greenhouse gases as they warm.",
    relatedConcepts: ["Permafrost", "Climate Change", "Arctic Ecosystems", "Carbon Storage"],
    difficulty: "medium"
  },
  {
    word: "COMPOST",
    definition: "Decomposed organic matter created through controlled biological decomposition processes, resulting in nutrient-rich soil amendment that improves soil health and structure.",
    applications: "Home gardening, commercial agriculture, municipal waste management programs, and soil restoration projects in degraded landscapes.",
    significance: "Composting reduces organic waste in landfills, decreases methane emissions, improves soil fertility, and supports sustainable agriculture practices.",
    relatedConcepts: ["Decomposition", "Soil Health", "Waste Reduction", "Sustainable Agriculture"],
    difficulty: "easy"
  },
  {
    word: "KEYSTONE",
    definition: "Species that have disproportionately large effects on their ecosystem relative to their abundance, playing critical roles in maintaining ecological structure and function.",
    applications: "Conservation prioritization, ecosystem restoration planning, predicting cascade effects of species loss, and understanding food web dynamics.",
    significance: "Loss of keystone species can cause ecosystem collapse and dramatic changes in community structure, making their protection essential for ecosystem stability.",
    relatedConcepts: ["Ecological Roles", "Food Webs", "Ecosystem Stability", "Species Interactions"],
    difficulty: "hard"
  },
  {
    word: "METHANE",
    definition: "A potent greenhouse gas (CH₄) produced by anaerobic decomposition of organic matter, with warming potential 25 times greater than carbon dioxide over 100 years.",
    applications: "Livestock management practices, wetland conservation, landfill gas capture systems, and renewable energy production from biogas.",
    significance: "Methane contributes significantly to global warming despite lower atmospheric concentrations, making methane reduction crucial for climate change mitigation.",
    relatedConcepts: ["Greenhouse Gases", "Climate Change", "Biogas", "Atmospheric Chemistry"],
    difficulty: "medium"
  },
  {
    word: "ESTUARY",
    definition: "Coastal water bodies where freshwater from rivers meets and mixes with saltwater from oceans, creating unique brackish environments with high biological productivity.",
    applications: "Commercial and recreational fisheries, coastal development planning, water quality monitoring, and nursery habitat protection for marine species.",
    significance: "Estuaries are among Earth's most productive ecosystems, serving as critical nursery habitats for many marine species and providing natural coastal protection.",
    relatedConcepts: ["Brackish Water", "Marine Nurseries", "Coastal Ecosystems", "Salinity Gradients"],
    difficulty: "hard"
  },
  {
    word: "ECOLOGY",
    definition: "The scientific study of interactions between organisms and their environment, including relationships among organisms and their responses to environmental changes.",
    applications: "Environmental impact assessments, conservation biology research, ecosystem management, and understanding climate change effects on natural systems.",
    significance: "Ecology provides the scientific foundation for understanding environmental problems and developing evidence-based solutions for conservation and environmental management.",
    relatedConcepts: ["Ecosystem Interactions", "Environmental Science", "Conservation Biology", "Systems Thinking"],
    difficulty: "medium"
  }
];

export function getRandomWord(): WordData {
  const randomIndex = Math.floor(Math.random() * environmentalWords.length);
  return environmentalWords[randomIndex];
}