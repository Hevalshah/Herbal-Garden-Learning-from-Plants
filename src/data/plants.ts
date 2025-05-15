
export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  medicinalUses: string[];
  growingConditions: string;
  regions: string[];
  imageUrl?: string;
  modelPath?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  height?: number;
  color?: string;
}

export const plants: Plant[] = [
  {
    id: "lavender",
    name: "Lavender",
    scientificName: "Lavandula",
    description: "Lavender is a flowering plant in the mint family known for its beauty, its sweet floral fragrance, and multiple uses. The flowers and oil are used as medicine.",
    medicinalUses: [
      "Anxiety and stress relief",
      "Sleep improvement",
      "Digestive issues",
      "Skin conditions"
    ],
    growingConditions: "Full sun, well-drained soil, moderate watering",
    regions: ["Mediterranean", "Europe", "Middle East", "India"],
    color: "#9D8EC4",
    height: 1.5,
    position: [-2, 0, -3],
    scale: 1,
  },
  {
    id: "chamomile",
    name: "Chamomile",
    scientificName: "Matricaria chamomilla",
    description: "Chamomile is one of the most ancient medicinal herbs known to mankind. It resembles a daisy with its white petals and yellow disc center, and is renowned for its gentle calming effects.",
    medicinalUses: [
      "Sleep aid",
      "Digestive support",
      "Anti-inflammatory",
      "Skin healing"
    ],
    growingConditions: "Full to partial sun, well-drained soil",
    regions: ["Europe", "North America", "South America"],
    color: "#FFFFFF",
    height: 0.7,
    position: [2, 0, -2],
    scale: 0.8,
  },
  {
    id: "mint",
    name: "Peppermint",
    scientificName: "Mentha piperita",
    description: "Peppermint is a hybrid mint, a cross between watermint and spearmint. It is characterized by its strong, refreshing scent and cooling sensation.",
    medicinalUses: [
      "Digestive aid",
      "Headache relief",
      "Breath freshener",
      "Cold and flu symptom relief"
    ],
    growingConditions: "Partial sun, moist soil, regular watering",
    regions: ["Europe", "North America", "Australia"],
    color: "#68A357",
    height: 0.9,
    position: [0, 0, -4],
    scale: 0.9,
  },
  {
    id: "echinacea",
    name: "Echinacea",
    scientificName: "Echinacea purpurea",
    description: "Echinacea is a group of flowering plants used widely in herbal medicine. The plant features distinctive purple cone-shaped flowers with a spiny central disk.",
    medicinalUses: [
      "Immune system boost",
      "Cold and flu prevention",
      "Wound healing",
      "Anti-inflammatory"
    ],
    growingConditions: "Full sun, well-drained soil, drought tolerant once established",
    regions: ["North America"],
    color: "#B66CA6",
    height: 1.2,
    position: [3, 0, -5],
    scale: 1,
  },
  {
    id: "ginger",
    name: "Ginger",
    scientificName: "Zingiber officinale",
    description: "Ginger is a flowering plant whose rhizome, ginger root or ginger, is widely used as a spice and a folk medicine. It is a herbaceous perennial which grows annual pseudostems.",
    medicinalUses: [
      "Nausea relief",
      "Digestive aid",
      "Anti-inflammatory",
      "Immune support"
    ],
    growingConditions: "Partial shade, rich moist soil, humid environment",
    regions: ["Southeast Asia", "India", "Caribbean"],
    color: "#E8B25B",
    height: 0.5,
    position: [-3, 0, -6],
    scale: 0.7,
  },
  {
    id: "sage",
    name: "Sage",
    scientificName: "Salvia officinalis",
    description: "Sage is an evergreen shrub with woody stems, grayish leaves, and blue to purplish flowers. It has a long history of medicinal and culinary use.",
    medicinalUses: [
      "Sore throat relief",
      "Memory enhancement",
      "Hot flash reduction",
      "Digestive support"
    ],
    growingConditions: "Full sun, well-drained soil, drought tolerant",
    regions: ["Mediterranean", "Balkans"],
    color: "#B2BEB5",
    height: 0.8,
    position: [1, 0, -7],
    scale: 0.85,
  }
];
