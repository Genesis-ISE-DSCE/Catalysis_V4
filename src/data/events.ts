export interface EventShowcase {
  name: string;
  type: string;
  image: string;
  color: string;
  detailsLink: string;
  top?: string;
  width?: number;
  height?: number;
  tags?: string[];
  badgeColor: string;
  badgeIcon: string;
  badgeIconAlt: string;
  imageBg: string;
  showcaseTags: { label: string; bg: string; border: string }[];
}

export const EVENTS_DATA: EventShowcase[] = [
  {
    name: "DSA SMACKDOWN",
    type: "TECHNICAL",
    image: "/pokemons/alakazam.svg",
    color: "#FFD1D1",
    detailsLink: "/rules/dsa-smackdown",
    tags: ["Data Structures", "Logic", "Problem Solving", "Optimization"],
    badgeColor: "#FFB84D",
    badgeIcon: "/pokemons/fire.png",
    badgeIconAlt: "Fire",
    imageBg: "#FFF8D6",
    showcaseTags: [
      { label: "Data Structures", bg: "#FFD9C3", border: "#FBB993" },
      { label: "Logic", bg: "#E6DBED", border: "#CCB8E6" },
      { label: "Problem Solving", bg: "#CEF2FF", border: "#A6E0F4" },
      { label: "Optimization", bg: "#D6EBDC", border: "#ADD6B8" },
    ],
  },
  {
    name: "PITCH PERFECT",
    type: "ENTREPRENEURSHIP",
    image: "/pokemons/jigglypuff.svg",
    color: "#D1FFE9",
    detailsLink: "/rules/pitch-wala",
    width: 175,
    height: 175,
    tags: ["Business Model", "Ideation", "Public Speaking", "Presentation"],
    badgeColor: "#5AC178",
    badgeIcon: "/pokemons/leaf.png",
    badgeIconAlt: "Leaf",
    imageBg: "#83CCB147",
    showcaseTags: [
      { label: "Business Model", bg: "#FFD9C3", border: "#FBB993" },
      { label: "Ideation", bg: "#E6DBED", border: "#CCB8E6" },
      { label: "Public Speaking", bg: "#CEF2FF", border: "#A6E0F4" },
      { label: "Presentation", bg: "#D6EBDC", border: "#ADD6B8" },
    ],
  },
  {
    name: "CODING RELAY",
    type: "TEAM BATTLE",
    image: "/pokemons/ditto.svg",
    color: "#FFD1D1",
    detailsLink: "/rules/code-relay",
    top: "top-[-25px]",
    tags: ["Algorithms", "Endurance", "Team Sync"],
    badgeColor: "#FFB84D",
    badgeIcon: "/pokemons/fire.png",
    badgeIconAlt: "Fire",
    imageBg: "#FFF8D6",
    showcaseTags: [
      { label: "Algorithms", bg: "#FFD9C3", border: "#FBB993" },
      { label: "Endurance", bg: "#E6DBED", border: "#CCB8E6" },
      { label: "Team Sync", bg: "#CEF2FF", border: "#A6E0F4" },
      { label: "Relay", bg: "#D6EBDC", border: "#ADD6B8" },
    ],
  },
  {
    name: "TECHNOSEEK",
    type: "EXPLORATION",
    image: "/pokemons/zoroark.svg",
    color: "#D1FFE9",
    detailsLink: "/rules/technoseek",
    top: "top-[-30px]",
    tags: ["Scavenger Hunt", "Teamwork", "Tech Puzzles", "Treasure Hunt"],
    badgeColor: "#5AC178",
    badgeIcon: "/pokemons/leaf.png",
    badgeIconAlt: "Leaf",
    imageBg: "#83CCB147",
    showcaseTags: [
      { label: "Scavenger Hunt", bg: "#FFD9C3", border: "#FBB993" },
      { label: "Teamwork", bg: "#E6DBED", border: "#CCB8E6" },
      { label: "Tech Puzzles", bg: "#CEF2FF", border: "#A6E0F4" },
      { label: "Treasure Hunt", bg: "#D6EBDC", border: "#ADD6B8" },
    ],
  },
  {
    name: "CLASH ROYALE",
    type: "GAMING",
    image: "/pokemons/arceus.svg",
    color: "#FFD1D1",
    detailsLink: "/rules/clash-royale",
    width: 175,
    height: 160,
    tags: ["Strategy Builder", "Deck Master", "Live Combat", "Real-time"],
    badgeColor: "#FFB84D",
    badgeIcon: "/pokemons/fire.png",
    badgeIconAlt: "Fire",
    imageBg: "#FFF8D6",
    showcaseTags: [
      { label: "Strategy Builder", bg: "#FFD9C3", border: "#FBB993" },
      { label: "Deck Master", bg: "#E6DBED", border: "#CCB8E6" },
      { label: "Live Combat", bg: "#CEF2FF", border: "#A6E0F4" },
      { label: "Real-time", bg: "#D6EBDC", border: "#ADD6B8" },
    ],
  },
  {
    name: "TYPEMASTER",
    type: "SKILL",
    image: "/pokemons/rayquaza.svg",
    color: "#D1FFE9",
    detailsLink: "/rules/typemaster",
    width: 200,
    height: 175,
    tags: ["Speed Demon", "Precision Master", "Combo Builder"],
    badgeColor: "#5AC178",
    badgeIcon: "/pokemons/leaf.png",
    badgeIconAlt: "Leaf",
    imageBg: "#83CCB147",
    showcaseTags: [
      { label: "Speed Demon", bg: "#FFD9C3", border: "#FBB993" },
      { label: "Precision Master", bg: "#CCB8E0", border: "#A890C8" },
      { label: "Combo Builder", bg: "#CEF2FF", border: "#A6E0F4" },
      { label: "Typing", bg: "#D6EBDC", border: "#ADD6B8" },
    ],
  },
];
