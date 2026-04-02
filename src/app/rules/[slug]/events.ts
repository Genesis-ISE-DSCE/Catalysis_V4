// You can export a type here if you are using strict TypeScript
export type EventDetails = {
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  description: string;
  rules: string[];
  prizes: string[];
  schedule: string[];
  requirements: string[];
};

export const eventData: Record<string, EventDetails> = {
  "typemaster": {
    title: "Typemaster Arena",
    subtitle: "Type fast. Stay accurate. Outpace every competitor.",
    image: "/pokemons/rayquaza.svg",
    tags: ["Speed Demon", "Precision Master", "Combo Builder"],
    description: "Typemaster Arena is a high-speed typing competition designed to test your accuracy, speed, and consistency. Participants will compete in multiple rounds where precision and quick reflexes are the key to survival. Only those who maintain high accuracy while typing at incredible speed will rise to the top.",
    rules: [
      "Participants must use the assigned system",
      "No external keyboards allowed",
      "Any malpractice leads to disqualification",
      "- Decisions by judges are final",
      "- Late entries will not be allowed"
    ],
    prizes: [
      "🥇 Winner: ₹XXXX + Certificate",
      "🥈 Runner-up: ₹XXXX + Certificate",
      "🎖️ Participation Certificates for all"
    ],
    schedule: [
      "Date: Day 1", 
      "Time: 01:30 PM – 03:30 PM"
    ],
    requirements: [
      "Basic typing skills", 
      "Student ID / Registration proof", 
      "- Punctuality"
    ]
  },
  "clash-royale": {
    title: "Clash Royale",
    subtitle: "Enter the battlefield.",
    image: "/pokemons/arceus.svg",
    tags: ["Strategy", "1v1", "Card Battle"],
    description: "Coordinate, outmaneuver, and outsmart your opponents in this fast-paced card battle. Prove your deck-building strategy and raw mechanical skill to claim the title of campus champions.",
    rules: [
      "Standard 1v1 Clash Royale rules apply",
      "No toxic behavior (instant warning)",
      "Bring your own device with Clash Royale installed",
      "- Exploiting bugs is strictly forbidden"
    ],
    prizes: [
      "🥇 Winner: ₹XXXX + Trophy",
      "🥈 Runner-up: ₹XXXX + Certificate",
      "🎖️ MVP Award for top player"
    ],
    schedule: [
      "Date: Day 2",
      "Time: 01:30 PM – 03:30 PM"
    ],
    requirements: [
      "Valid Clash Royale account",
      "Fully charged device with the game installed",
      "- Student ID proof"
    ]
  },
  "technoseek": {
    title: "Technoseek",
    subtitle: "Your journey to becoming a champion begins now.",
    image: "/pokemons/zoroark.svg",
    tags: ["Scavenger Hunt", "Tech Puzzles", "Teamwork"],
    description: "Navigate through mind-bending technical puzzles and clues hidden across the campus. Combine your technical knowledge with quick thinking to be the first team to crack the final code.",
    rules: [
      "Teams must consist of 2-4 members",
      "No outside internet assistance for offline clues",
      "Any destruction of campus property leads to disqualification",
      "- Decisions by the clue-masters are final"
    ],
    prizes: [
      "🥇 Winner: ₹XXXX + Certificate",
      "🥈 Runner-up: ₹XXXX + Certificate",
      "🎖️ Participation Certificates for all"
    ],
    schedule: [
      "Date: Day 1", 
      "Time: 10:15 AM – 12:30 PM"
    ],
    requirements: [
      "At least one fully charged smartphone per team", 
      "QR Code Scanner app installed", 
      "- Student ID proof"
    ]
  },
  "coding-relay": {
    title: "Coding Relay",
    subtitle: "Tag-team coding under intense pressure.",
    image: "/pokemons/ditto.svg",
    tags: ["Algorithms", "Team Sync", "Endurance"],
    description: "A fast-paced tag-team coding competition. One team member starts coding a solution, and when the buzzer rings, the next member must take over exactly where they left off without communicating!",
    rules: [
      "Teams of 3 members are strictly required",
      "Absolutely no verbal communication during handoffs",
      "Standard libraries only; no external APIs allowed",
      "- Code must compile to be evaluated"
    ],
    prizes: [
      "🥇 Winning Team: ₹XXXX + Certificate",
      "🥈 Runner-up Team: ₹XXXX + Certificate",
      "🎖️ Participation Certificates for all"
    ],
    schedule: [
      "Round 1: Day 1 | 02:30 PM – 03:30 PM", 
      "Finals: Day 2 | 01:30 PM – 03:30 PM"
    ],
    requirements: [
      "Strong logic fundamentals", 
      "Familiarity with C++, Java, or Python", 
      "- Student ID proof"
    ]
  },
  "dsa-challenge": {
    title: "DSA Challenge",
    subtitle: "Crack the code and become a true champion.",
    image: "/pokemons/alakazam.svg",
    tags: ["Data Structures", "Optimization", "Logic"],
    description: "Put your algorithmic thinking to the ultimate test. Solve complex Data Structure and Algorithm problems under a strict time limit. Efficiency, memory, and execution speed are your only allies.",
    rules: [
      "Individual participation only",
      "Plagiarism checks will be strictly enforced post-event",
      "Scoring is based on test cases passed and time complexity",
      "- Accessing external code repositories is forbidden"
    ],
    prizes: [
      "🥇 Winner: ₹XXXX + Certificate",
      "🥈 Runner-up: ₹XXXX + Certificate",
      "🎖️ Participation Certificates for all"
    ],
    schedule: [
      "Day 2 Batch: 10:15 AM – 12:30 PM",
      "Day 3 Batch: 10:15 AM – 12:30 PM"
    ],
    requirements: [
      "Active HackerRank or LeetCode account", 
      "Bring your own laptop (recommended)", 
      "- Student ID proof"
    ]
  },
  "pitch-event": {
    title: "Pitch Event",
    subtitle: "Make your presentation stand out and secure victory.",
    image: "/pokemons/jigglypuff.svg",
    tags: ["Ideation", "Business Model", "Presentation"],
    description: "Got the next billion-dollar idea? Present your startup pitch to our panel of judges. You will be evaluated on innovation, market feasibility, revenue model, and overall presentation skills.",
    rules: [
      "Presentations must not exceed 5 minutes",
      "A 3-minute Q&A session from judges will follow",
      "Live prototypes or Figma designs yield bonus points",
      "- All business ideas must be original"
    ],
    prizes: [
      "🥇 Best Pitch: ₹XXXX + Certificate",
      "🥈 Runner-up: ₹XXXX + Certificate",
      "🎖️ Potential Incubation/Mentorship opportunities"
    ],
    schedule: [
      "Date: Day 3", 
      "Time: 01:30 PM – 02:30 PM"
    ],
    requirements: [
      "Pitch Deck (.PPT or .PDF) submitted prior to event", 
      "Formal or Smart Casual attire", 
      "- Student ID proof"
    ]
  }
};