export type EventDetails = {
  title: string;
  subtitle: string;
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
    tags: ["Mobile Gaming", "Strategy", "Tournament"],
    description: "Coordinate, build your perfect deck, and outsmart your opponents in this fast-paced mobile strategy game. Prove your tactical synergy to claim the title of campus champions.",
    rules: [
      "Standard Tournament rules apply",
      "No toxic behavior or BMing (instant warning)",
      "Bring your own fully charged devices",
      "- Exploiting game bugs is strictly forbidden"
    ],
    prizes: [
      "🥇 Winning Team: ₹XXXX + Trophy",
      "🥈 Runner-up Team: ₹XXXX + Certificate",
      "🎖️ MVP Award for top player"
    ],
    schedule: [
      "Date: Day 2", 
      "Time: 01:30 PM – 03:30 PM"
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
  "typemaster": {
    title: "Typemaster",
    subtitle: "Unleash your typing speed and accuracy like never before",
    tags: ["Speed Demon", "Precision Master", "Combo Builder"],
    description: "Typemaster is a high-speed typing competition designed to test your accuracy, speed, and consistency. Participants will compete in multiple rounds where precision and quick reflexes are the key to survival.",
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
  "pitch-wala": {
    title: "Pitch Wala",
    subtitle: "Turn your ideas into impact with the power of persuasion",
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
  },
  "technoseek": {
    title: "Technoseek",
    subtitle: "Hunt the tech, solve the clues, and conquer the challenge",
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
  "code-relay": {
    title: "Code Relay",
    subtitle: "Pass the logic, carry the code, and race to victory together",
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
  }
};