// Shared constants for registration form, admin panel, and Mongoose schema

export const COLLEGES = ["DSCE", "DSATM", "DSU"] as const;
export type College = (typeof COLLEGES)[number];

export const EVENT_IDS = [
  "technoseek",
  "typemaster",
  "clash_royale",
  "coding_relay",
  "dsa_smackdown",
  "pitch_perfect",
] as const;
export type EventId = (typeof EVENT_IDS)[number];

export const TEAM_EVENT_IDS: readonly EventId[] = ["technoseek", "coding_relay"];

export const EVENT_LABELS: Record<EventId, string> = {
  pitch_perfect: "PitchDexs",
  typemaster:    "Typemaster",
  clash_royale:  "Clash Royale",
  coding_relay:  "Code Relay",
  dsa_smackdown: "DSA Event",
  technoseek:    "Technoseek",
};

export const BRANCHES: { value: string; label: string }[] = [
  { value: "Artificial Intelligence and Machine Learning",                                      label: "AI & ML" },
  { value: "Aeronautical Engineering",                                                          label: "Aeronautical Engg" },
  { value: "Automobile Engineering",                                                            label: "Automobile Engg" },
  { value: "Biotechnology",                                                                     label: "Biotechnology" },
  { value: "Chemical Engineering",                                                              label: "Chemical Engg" },
  { value: "Civil Engineering",                                                                 label: "Civil Engg" },
  { value: "Computer Science and Business Systems",                                             label: "CS & Business Systems" },
  { value: "Computer Science and Design",                                                       label: "CS & Design" },
  { value: "Computer Science and Engineering",                                                  label: "CSE" },
  { value: "Computer Science & Engineering (Cyber Security)",                                   label: "CSE (Cyber Security)" },
  { value: "Computer Science & Engineering (Data Science)",                                     label: "CSE (Data Science)" },
  { value: "Computer Science & Engineering (IoT and Cyber Security Including Block Chain Technology)", label: "CSE (IoT & Cyber Security)" },
  { value: "Electrical & Electronics Engineering",                                              label: "EEE" },
  { value: "Electronics & Communication Engineering",                                           label: "ECE" },
  { value: "Electronics and Instrumentation Engineering",                                       label: "EIE" },
  { value: "Electronics and Telecommunication Engineering",                                     label: "E&TC" },
  { value: "Information Science and Engineering",                                               label: "ISE" },
  { value: "Mechanical Engineering",                                                            label: "Mechanical Engg" },
  { value: "Medical Electronics Engineering",                                                   label: "Medical Electronics" },
  { value: "Robotics and Artificial Intelligence",                                              label: "Robotics & AI" },
];

export const SEMESTERS = ["1","2","3","4","5","6","7","8"] as const;
