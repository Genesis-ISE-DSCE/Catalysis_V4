export type EventDetails = {
  title: string;
  subtitle: string;
  image: string;
  heroColor: string;
  selectionColor: string;
  tags: string[];
  description: string;
  rules: string[];
  prizes: string[];
  schedule: string[];
  requirements: string[];
};

export const eventData: Record<string, EventDetails> = {
  "clash-royale": {
    title: "Clash Royale",
    subtitle: "Battle your way to the throne and prove your ultimate gaming supremacy",
    image: "/pokemons/arceus.svg",
    heroColor: "#F5E6A3",
    selectionColor: "#E8D580",
    tags: ["Mobile Gaming", "Strategy", "Tournament"],
    description: "Coordinate, build your perfect deck, and outsmart your opponents in this fast-paced mobile strategy game. Prove your tactical synergy to claim the title of campus champions.",
    rules: [
      "Individual participation only",
      "Standard Tournament rules apply",
      "No toxic behavior or BMing (instant warning)",
      "Bring your own fully charged device",
      "- Exploiting game bugs is strictly forbidden"
    ],
    prizes: [
      "🥇 1st Place: Rs. 1,000 + Certificate",
      "🥈 2nd Place: Rs. 750 + Certificate",
      "Total Prize Pool: Rs. 1,750"
    ],
    schedule: [
      "Date: Day 2 - Friday, 18 April",
      "Time: 1:30 PM - 2:30 PM"
    ],
    requirements: [
      "Valid Supercell account",
      "Stable internet connection",
      "- Student ID proof"
    ]
  },
  "dsa-smackdown": {
    title: "DSA Smackdown",
    subtitle: "Where logic meets speed in the ultimate coding showdown",
    image: "/pokemons/alakazam.svg",
    heroColor: "#F5D76E",
    selectionColor: "#E8C84A",
    tags: ["Data Structures", "Optimization", "Logic"],
    description: "Put your algorithmic thinking to the ultimate test. Solve complex Data Structure and Algorithm problems under a strict time limit. Efficiency, memory, and execution speed are your only allies.",
    rules: [
      "Individual participation only",
      "Plagiarism checks will be strictly enforced post-event",
      "Scoring is based on test cases passed and time complexity",
      "- Accessing external code repositories is forbidden"
    ],
    prizes: [
      "🥇 1st Place: Rs. 1,500 + Certificate",
      "🥈 2nd Place: Rs. 1,000 + Certificate",
      "🥉 3rd Place: Rs. 500 + Certificate",
      "Total Prize Pool: Rs. 3,000"
    ],
    schedule: [
      "Date: Day 2 - Friday, 18 April",
      "Time: 9:30 AM - 11:30 AM"
    ],
    requirements: [
      "Active HackerRank or LeetCode account",
      "Bring your own laptop (recommended)",
      "- Student ID proof"
    ]
  },
  "typemaster": {
    title: "Typemaster",
    subtitle: "Unleash your typing speed and accuracy like never before",
    image: "/pokemons/rayquaza.svg",
    heroColor: "#83BD90",
    selectionColor: "#83BD90",
    tags: ["Speed Demon", "Precision Master", "Combo Builder"],
    description: "Typemaster is a high-speed typing competition designed to test your accuracy, speed, and consistency. Participants will compete in multiple rounds where precision and quick reflexes are the key to survival.",
    rules: [
      "Individual participation only",
      "Participants must use the assigned system",
      "No external keyboards allowed",
      "Any malpractice leads to disqualification",
      "- Decisions by judges are final"
    ],
    prizes: [
      "🥇 1st Place: Rs. 1,500 + Certificate",
      "🥈 2nd Place: Rs. 1,000 + Certificate",
      "🥉 3rd Place: Rs. 500 + Certificate",
      "Total Prize Pool: Rs. 3,000"
    ],
    schedule: [
      "Date: Day 2 - Friday, 18 April",
      "Time: 11:30 AM - 12:30 PM"
    ],
    requirements: [
      "Basic typing skills",
      "Student ID / Registration proof",
      "- Punctuality"
    ]
  },
  "pitchdexs": {
    title: "PitchDexs",
    subtitle: "Turn your ideas into impact with the power of persuasion",
    image: "/pokemons/jigglypuff.svg",
    heroColor: "#FFB6C1",
    selectionColor: "#FF9AAF",
    tags: ["Ideation", "Business Model", "Presentation"],
    description: "Got the next billion-dollar idea? Present your startup pitch to our panel of judges. You will be evaluated on innovation, market feasibility, revenue model, and overall presentation skills.",
    rules: [
      "Presentations must not exceed 5 minutes",
      "A 3-minute Q&A session from judges will follow",
      "Live prototypes or Figma designs yield bonus points",
      "- All business ideas must be original"
    ],
    prizes: [
      "🥇 Best Pitch: Rs. 1,000 + Certificate",
      "🥈 Runner-up: Rs. 750 + Certificate",
      "Total Prize Pool: Rs. 1,750"
    ],
    schedule: [
      "Date: Day 2 - Friday, 18 April",
      "Time: 2:30 PM - 3:30 PM"
    ],
    requirements: [
      "Pitch Deck (.PPT or .PDF) submitted prior to event",
      "Formal or Smart Casual attire",
      "- Student ID proof"
    ]
  },
  "technoseek": {
    title: "Technoseek",
    subtitle: "Hunt the tech, solve the clues, and conquer the challenge",
    image: "/pokemons/zoroark.svg",
    heroColor: "#C45B5B",
    selectionColor: "#C45B5B",
    tags: ["Scavenger Hunt", "Tech Puzzles", "Teamwork"],
    description: "Navigate through mind-bending technical puzzles and clues hidden across the campus. Combine your technical knowledge with quick thinking to be the first team to crack the final code.",
    rules: [
      "Team of 4 members required",
      "No outside internet assistance for offline clues",
      "Any destruction of campus property leads to disqualification",
      "- Decisions by the clue-masters are final"
    ],
    prizes: [
      "🥇 1st Place Team: Rs. 5,000 + Trophy",
      "🥈 2nd Place Team: Rs. 3,000 + Certificate",
      "🥉 3rd Place Team: Rs. 2,000 + Certificate",
      "Total Prize Pool: Rs. 10,000"
    ],
    schedule: [
      "Date: Day 1 - Thursday, 17 April",
      "Time: 10:15 AM - 12:30 PM"
    ],
    requirements: [
      "Team of exactly 4 members",
      "At least one fully charged smartphone per team",
      "QR Code Scanner app installed",
      "- Student ID proof"
    ]
  },
  "code-relay": {
    title: "Coding Relay",
    subtitle: "Pass the logic, carry the code, and race to victory together",
    image: "/pokemons/ditto.svg",
    heroColor: "#B39DDB",
    selectionColor: "#B39DDB",
    tags: ["Algorithms", "Team Sync", "Endurance"],
    description: "A fast-paced tag-team coding competition. One team member starts coding a solution, and when the buzzer rings, the next member must take over exactly where they left off without communicating!",
    rules: [
      "Teams of exactly 3 members required",
      "Absolutely no verbal communication during handoffs",
      "Standard libraries only; no external APIs allowed",
      "- Code must compile to be evaluated"
    ],
    prizes: [
      "🥇 1st Place Team: Rs. 4,000 + Trophy",
      "🥈 2nd Place Team: Rs. 2,500 + Certificate",
      "🥉 3rd Place Team: Rs. 1,500 + Certificate",
      "Total Prize Pool: Rs. 8,000"
    ],
    schedule: [
      "Date: Day 1 - Thursday, 17 April",
      "Time: 1:30 PM - 3:30 PM"
    ],
    requirements: [
      "Team of exactly 3 members",
      "Strong logic fundamentals",
      "Familiarity with C++, Java, or Python",
      "- Student ID proof"
    ]
  }
};
