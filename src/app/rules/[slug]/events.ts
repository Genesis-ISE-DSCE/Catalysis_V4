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
    description: "Coordinate, build your perfect deck, and outsmart your opponents in this fast-paced 1v1 mobile strategy tournament. Bracket-based progression from Bo1 rounds all the way to a Bo5 grand final — prove your deck mastery and claim the throne.",
    rules: [
      "Individual participation only",
      "Bracket-based tournament progression",
      "Early rounds: Best of 1 (Bo1)",
      "Semifinals: Best of 3 (Bo3)",
      "Finals: Best of 5 (Bo5)",
      "Friendly Battle format at Standard Levels",
      "No repeated cards across decks",
      "Valid college ID mandatory",
      "Pre-registration required",
      "Bring your own fully charged mobile device",
      "Use own stable 5G/4G data — organizers not responsible for lag or disconnections",
      "Delay of more than 5–10 minutes results in a forfeit",
      "No toxic behavior or unsportsmanlike conduct (instant warning/disqualification)",
      "Exploiting game bugs is strictly forbidden"
    ],
    prizes: [
      "🥇 1st Place: ₹2,000 + Certificate",
      "🥈 2nd Place: ₹1,000 + Certificate",
      "Total Prize Pool: ₹3,000"
    ],
    schedule: [
      "Date: Day 1 - Friday, 17 April",
      "Time: 2:00 PM - 4:00 PM"
    ],
    requirements: [
      "Valid Supercell account",
      "Own fully charged mobile device",
      "Stable 5G/4G data connection",
      "Valid college ID proof"
    ]
  },
  "dsa-smackdown": {
    title: "DSA Smackdown",
    subtitle: "Where logic meets speed in the ultimate coding showdown",
    image: "/pokemons/alakazam.svg",
    heroColor: "#F5D76E",
    selectionColor: "#E8C84A",
    tags: ["Data Structures", "Optimization", "Logic"],
    description: "Put your algorithmic thinking to the ultimate test on Vjudge. Solve Data Structure and Algorithm problems under a strict time limit. Points are awarded per correct answer based on difficulty, with partial credit for test cases passed.",
    rules: [
      "Individual participation only",
      "Platform: Vjudge",
      "Points awarded per correctly answered question (varies by difficulty)",
      "Partial points given for test cases passed",
      "Tiebreaker: Fastest total completion time",
      "Code in any language specified for the contest",
      "Can use lab computers or own laptops",
      "Plagiarism checks will be strictly enforced",
      "Accessing external code repositories is forbidden",
      "All work must be original and created during the event",
      "No pre-written code or templates allowed",
      "No extra time provided under any circumstances"
    ],
    prizes: [
      "🥇 1st Place: ₹2,000 + Certificate",
      "🥈 2nd Place: ₹1,000 + Certificate",
      "Total Prize Pool: ₹3,000"
    ],
    schedule: [
      "Date: Day 2 - Saturday, 18 April",
      "Time: 10:00 AM - 12:00 PM"
    ],
    requirements: [
      "Active Vjudge account",
      "Lab computer or own laptop",
      "Valid college ID proof"
    ]
  },
  "typemaster": {
    title: "Typemaster",
    subtitle: "Unleash your typing speed and accuracy like never before",
    image: "/pokemons/rayquaza.svg",
    heroColor: "#83BD90",
    selectionColor: "#83BD90",
    tags: ["Speed Demon", "Precision Master", "2 Attempts"],
    description: "Typemaster is a high-speed typing competition testing accuracy, speed, and consistency. Each participant gets 1 trial (practice) run followed by 1 actual scored run. Rankings are based on Words Per Minute (WPM), with accuracy as the tiebreaker.",
    rules: [
      "Individual participation only",
      "Each participant gets 1 trial (practice) run + 1 actual scored run",
      "Scored on WPM (Words Per Minute)",
      "Tiebreaker: Accuracy percentage",
      "Fixed time limit will be announced before the event",
      "Participants must use the assigned system",
      "No external keyboards allowed",
      "Any malpractice leads to immediate disqualification",
      "Decisions by judges are final"
    ],
    prizes: [
      "🥇 1st Place: ₹2,000 + Certificate",
      "🥈 2nd Place: ₹1,000 + Certificate",
      "Total Prize Pool: ₹3,000"
    ],
    schedule: [
      "Day 1 - Friday, 17 April: Whole Day",
      "Day 2 - Saturday, 18 April: Whole Day"
    ],
    requirements: [
      "Valid college ID / Registration proof",
      "Punctuality"
    ]
  },
  "pitchdexs": {
    title: "Ideathon",
    subtitle: "Turn your ideas into impact with the power of persuasion",
    image: "/pokemons/jigglypuff.svg",
    heroColor: "#FFB6C1",
    selectionColor: "#FF9AAF",
    tags: ["Ideation", "Open Innovation", "Presentation"],
    description: "Got the next big idea? Present your concept to our panel of judges under the theme of Open Innovation. A max 5-slide PPT covering problem, idea, implementation, and impact — judged on innovation, feasibility, scalability, and sustainability.",
    rules: [
      "Individual participation only",
      "Theme: Open Innovation",
      "Maximum 5-slide PPT with the following structure:",
      "  Slide 1: Title + Problem Statement",
      "  Slide 2: Existing Solutions + Gap",
      "  Slide 3: Your Idea",
      "  Slide 4: Implementation Plan + Target Users",
      "  Slide 5: Impact + Future Scope",
      "Presentation must not exceed 5 minutes",
      "A 3-minute Q&A session from judges will follow",
      "Judged on: Innovation, Feasibility, Scalability, Sustainability",
      "Live prototypes or Figma designs yield bonus points",
      "No pre-written code or external assistance allowed"
    ],
    prizes: [
      "🥇 Best Pitch: ₹2,000 + Certificate",
      "🥈 Runner-up: ₹1,000 + Certificate",
      "Total Prize Pool: ₹3,000"
    ],
    schedule: [
      "Date: Day 1 - Friday, 17 April",
      "Time: 10:00 AM - 12:00 PM"
    ],
    requirements: [
      "Pitch in PPT or PDF format",
      "Formal or Smart Casual attire",
      "Valid college ID proof"
    ]
  },
  "prompt-wars": {
    title: "Prompt Wars",
    subtitle: "Engineer the perfect prompt and outthink every challenger",
    image: "/pokemons/chatot.png",
    heroColor: "#D6E8F7",
    selectionColor: "#4A8FD4",
    tags: ["AI Prompting", "Creative", "Individual"],
    description: "Build a documentation website using only AI tools — but you only get 2 prompts: 1 for creation and 1 for refinement. The build phase is strictly 20 minutes within a 1-hour total duration. Judged on structure, prompt effectiveness, creativity, and completeness.",
    rules: [
      "Individual participation only",
      "Task: Build a documentation website using AI tools",
      "Only 2 prompts allowed: 1 creation prompt + 1 refinement prompt",
      "Build phase: 20 minutes (strictly enforced)",
      "Total event duration: 1 hour",
      "Participants must use the provided AI interface",
      "No pre-written prompts or external assistance allowed",
      "Judged on: Structure, Prompt Effectiveness, Creativity, Completeness",
      "Decisions by judges are final"
    ],
    prizes: [
      "🥇 1st Place: ₹2,000 + Certificate",
      "🥈 2nd Place: ₹1,000 + Certificate",
      "Total Prize Pool: ₹3,000"
    ],
    schedule: [
      "Date: Day 2 - Saturday, 18 April",
      "Time: 2:00 PM - 3:00 PM"
    ],
    requirements: [
      "Basic understanding of AI tools",
      "Valid college ID / Registration proof",
      "Punctuality"
    ]
  },
  "technoseek": {
    title: "Technoseek",
    subtitle: "Hunt the tech, solve the clues, and conquer the challenge",
    image: "/pokemons/zoroark.svg",
    heroColor: "#C45B5B",
    selectionColor: "#C45B5B",
    tags: ["Scavenger Hunt", "Tech Puzzles", "Team of 3"],
    description: "Starting at the Amphitheatre, navigate through mind-bending technical puzzles and clues spread across the entire campus. Teams of 3 race against the clock — winning is determined by total time including penalties. Use fewer hints to break ties.",
    rules: [
      "Team of exactly 3 members required",
      "Starting point: Amphitheatre; entire event takes place on campus",
      "Teams must carry at least one laptop",
      "Solve technical clues and puzzles to progress",
      "Winning determined by total completion time (including penalties)",
      "Hint requests are allowed but carry a time penalty",
      "Tiebreaker: Team using fewer hints wins",
      "Bonus round conducted if a tie still persists",
      "No outside internet assistance for offline clues",
      "Any destruction of campus property leads to immediate disqualification",
      "Decisions by clue-masters are final"
    ],
    prizes: [
      "🥇 1st Place Team: ₹5,000 + Trophy",
      "🥈 2nd Place Team: ₹2,500 + Certificate",
      "Total Prize Pool: ₹7,500"
    ],
    schedule: [
      "Date: Day 1 - Friday, 17 April",
      "Time: 10:30 AM - 4:00 PM"
    ],
    requirements: [
      "Team of exactly 3 members",
      "At least one laptop per team",
      "QR Code Scanner app installed",
      "Valid college ID proof for all members"
    ]
  },
  "code-relay": {
    title: "Coding Relay",
    subtitle: "Pass the logic, carry the code, and race to victory together",
    image: "/pokemons/ditto.svg",
    heroColor: "#B39DDB",
    selectionColor: "#B39DDB",
    tags: ["Algorithms", "Team of 3", "Endurance"],
    description: "A fast-paced tag-team coding competition. The problem statement is given only to the first member. Each member codes for 30 minutes, then passes the baton with a 2-minute transition — no communication allowed during handoffs. Code must be deployable at the end of each round.",
    rules: [
      "Teams of exactly 3 members required",
      "Problem statement given to the first member only",
      "Each participant codes for 30 minutes per round",
      "2-minute transition period between rounds",
      "Absolutely no verbal or written communication during handoffs",
      "Code must be deployable at the end of each round",
      "Standard libraries only; no external APIs allowed",
      "Plagiarism strictly prohibited",
      "No sabotaging other teams",
      "Code must compile to be evaluated"
    ],
    prizes: [
      "🥇 1st Place Team: ₹5,000 + Trophy",
      "🥈 2nd Place Team: ₹2,500 + Certificate",
      "Total Prize Pool: ₹7,500"
    ],
    schedule: [
      "Date: Day 2 - Saturday, 18 April",
      "Time: 12:15 PM - 2:00 PM"
    ],
    requirements: [
      "Team of exactly 3 members",
      "Strong logic fundamentals",
      "Familiarity with C++, Java, or Python",
      "Valid college ID proof for all members"
    ]
  }
};
