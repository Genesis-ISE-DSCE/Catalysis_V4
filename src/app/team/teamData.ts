// teamData.ts

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bgClass?: string;
}

export interface Department {
  id: string;
  title: string;
  desc: string;
  bgClass: string;
  textClass: string;
  leads: TeamMember[];
  members: TeamMember[];
}

// Add this to your existing teamData.ts
export const pastMembers = [



  // ... add more past members
];

export const coreLeads: TeamMember[] = [
  { 
    name: 'Dhruv Puri', 
    role: '2026 Genesis Lead', 
    bgClass: 'bg-[#E8192C]', 
    image: 'https://drive.google.com/file/d/1nE7ssrnQbW4m62fBhmqa281DgGZdUCQg/view?usp=drivesdk' 
  },
  { 
    name: 'Khushi Agrawal', 
    role: '2026 Genesis Lead', 
    bgClass: 'bg-[#3B6FC4]', 
    image: 'https://drive.google.com/file/d/16MGJo2vJItZ1dZsQhPiA0l_dds0lVaad/view?usp=drivesdk' 
  },
  { name: "Ananya Pramod", role: "2025 Genesis Lead", image: "" },
  { name: "Himakar MS", role: "2025 Genesis Lead", image: "" },
];


export const departments: Department[] = [
  {
    id: 'Tech',
    title: 'Tech Division',
    desc: 'The builders powering every platform, tool, and screen.',
    bgClass: 'bg-[#3A001D]',
    textClass: 'text-white',
    leads: [
      { name: 'Arpit Srivastava', role: '2026 Tech Lead', image: 'https://drive.google.com/file/d/13yzt7WkiXlerRFkS8v_q1J80aD6rziBc/view?usp=drivesdk' },
      { name: 'Pragati Raj', role: '2025 Tech Lead', image: 'https://drive.google.com/file/d/1CMxPRqGiHsj7uPc_8OKxEKWuwge9yOg0/view?usp=drivesdk' },
    ],
    members: [
      { name: 'Yash Agarwal', role: 'Member', image: 'https://drive.google.com/file/d/1BPSPGhTiTKuymxJQcWSviaMj0eIVbX5t/view?usp=drivesdk' },
      { name: 'Tanmay Srivastava', role: 'Member', image: 'https://drive.google.com/file/d/19EqJ7bex2wrWWbb-GGCpCMXA-1ESQfas/view?usp=drivesdk' },
      { name: 'Ayush', role: 'Member', image: 'https://drive.google.com/file/d/1TWoXk9Cwu9VFvBstV10to-Z-178QVAyS/view?usp=drivesdk' },
      { name: 'Yuvraj Shorewala', role: 'Member', image: 'https://drive.google.com/file/d/1_djTC8XElIGUIQTHnmfpv4yu6JPIfcBi/view?usp=drivesdk' },
      { name: 'Himanshu', role: 'Member', image: 'https://drive.google.com/file/d/1X0rqXSiWeRZW0aiRnonFBwkYmxvZZ6y0/view?usp=drivesdk' },
      { name: 'Naman', role: 'Member', image: 'https://drive.google.com/file/d/1S-dodmlT5lZoevlU1hL0t-SUjGIZ8fpw/view?usp=drivesdk' },
      { name: 'Harsh Kumar Gupta', role: 'Member', image: 'https://drive.google.com/file/d/187SU5drSvnHkBXQAlOnMm9fqEnelrO6t/view?usp=drivesdk' },
      { name: 'Shruti Sinha', role: 'Member', image: 'https://drive.google.com/file/d/1IX9JyEAfm0qoj9vG6rHIUxxY0114kbXT/view?usp=drivesdk' },
      { name: 'Anurag Jain', role: 'Member', image: 'https://drive.google.com/file/d/1gIPGGuK5Gi4imKTzY6cvtWOs2aqwTK5l/view?usp=drivesdk' },
      { name: 'Aman Kumar Singh', role: 'Member', image: 'https://drive.google.com/file/d/18v79JcngtsOwhXAw1QN0L30NzwLO5G6w/view?usp=drivesdk' },
      { name: 'Anshuman', role: 'Member', image: 'https://drive.google.com/file/d/1BA3UGd9s4oyypXeJBMhymUWLvJyyGJaG/view?usp=drivesdk' },
      { name: 'Shubham', role: 'Member', image: 'https://drive.google.com/file/d/1LQKYzmDCFokbiOihrw5mI2D3LXXapa4Z/view?usp=drivesdk' },
      { name: 'Akshat Raj', role: 'Member', image: 'https://drive.google.com/file/d/12oFvy-ZraeAjbLt8bNFbHOZ0_T1lIv1R/view?usp=drivesdk' },
      { name: 'Vedanth', role: 'Member', image: 'https://drive.google.com/file/d/1k_sk5UctT10EmgAr5IIIZbQsRUvs-0WX/view?usp=drivesdk' },
      { name: 'Tejasva Vardhan Sharma', role: 'Member', image: 'https://drive.google.com/file/d/1Dtgd8Ytzsb1Oht27WuUBWbiXJL4QJIYi/view?usp=drivesdk' },
      { name: 'Amanraz Thakur', role: 'Member', image: 'https://drive.google.com/file/d/1NtIAmIO4nlndknmksQRNFLGI5K9Zxrla/view?usp=drivesdk' }
    ]
  },
  {
    id: 'Design',
    title: 'Design Division',
    desc: 'The artists shaping the visual experience.',
    bgClass: 'bg-[#DD273E]',
    textClass: 'text-white',
    leads: [
      { name: 'Angelica', role: '2026 Design Lead', image: 'https://drive.google.com/file/d/1jyS1gLd6g8qQjLw1VRt0LjmdsLnFWXni/view?usp=drivesdk' },
      { name: 'Tanish Srivastava', role: '2026 Design Lead', image: 'https://drive.google.com/file/d/1j_bMtyQVPX5CcIWuNG_96N88xwWFPYV4/view?usp=drivesdk' },
      { name: 'Jai Kesarwani', role: '2026 Design Lead', image: 'https://drive.google.com/file/d/1umKEfcAcnpv1UcRtdccSQbz9Tt2l_bXi/view?usp=drivesdk' },
      { name: 'Kushal', role: '2025 Design Lead', image: 'https://drive.google.com/file/d/1nND_pH_682rZg9JatbnEn473CO-YCKOG/view?usp=drivesdk' },
      
    ],
    members: [
      { name: 'Pallavi P Kamath', role: 'Member', image: 'https://drive.google.com/file/d/1j5hQ4caVypegk4vrVfyrLzUI3TAGvnta/view?usp=drivesdk' },
      { name: 'Disha N G', role: 'Member', image: 'https://drive.google.com/file/d/1CIQq_g0h_DffXTm4KqBBfqhzcjEeaABq/view?usp=drivesdk' },
      { name: 'Prachi', role: 'Member', image: 'https://drive.google.com/file/d/1opqa7tEqmgDJqZwSugoHyV-GVJUl5CkW/view?usp=drivesdk' },
      { name: 'Harsha D Desai', role: 'Member', image: 'https://drive.google.com/file/d/1SLcZmVjMzJ-Tcg5Gk8zYBYS_g6YWhvEh/view?usp=drivesdk' },
      { name: 'Blessy Wilber', role: 'Member', image: 'https://drive.google.com/file/d/1TGEJGiOZwHQFf5yJI0ALnKpv5btfnFsk/view?usp=drivesdk' },
      { name: 'Bhoomika K Nayak', role: 'Member', image: 'https://drive.google.com/file/d/1lstQMI9Jg8ImeLaz8lj4z7187Ptjm8FB/view?usp=drivesdk' },
      { name: 'Rithika', role: 'Member', image: 'https://drive.google.com/file/d/1o2XOU7iq_3X_RB49HuWgHHQxRwCdZgc1/view?usp=drivesdk' },
      { name: 'Gunasree', role: 'Member', image: 'https://drive.google.com/file/d/1RrmUAirkQfoIJRXcpnNHUL7QXMMxonW_/view?usp=drivesdk' },
      { name: 'Rigved', role: 'Member', image: 'https://drive.google.com/file/d/1KbhevIRf8idzv1M976e6DZjDon_Dgntt/view?usp=drivesdk' },
      { name: 'Sachika', role: 'Member', image: 'https://drive.google.com/file/d/1pnfJsrJA1KeOwBHqt-vyNSxx_C8oBzId/view?usp=drivesdk' },
      { name: 'Pavani', role: 'Member', image: 'https://drive.google.com/file/d/1ljd6trzGkOJHjjjrFk7OEHTXEtemdkK6/view?usp=drivesdk' },
      { name: 'Keesha R', role: 'Member', image: 'https://drive.google.com/file/d/11HOmy4vTDiiVyioA2_7GpWUmIjHtJByv/view?usp=drivesdk' },
      { name: 'Shrinidhi Patil', role: 'Member', image: 'https://drive.google.com/file/d/1FVQ81xk2_GPzl2_pMqDlA7Rzq5WlJuDF/view?usp=drivesdk' }
    ]
  },
  {
    id: 'Media',
    title: 'Media Division',
    desc: 'Capturing every spark, sprint, and celebration.',
    bgClass: 'bg-[#FDDF6B]',
    textClass: 'text-[#1A0A0E]',
    leads: [
      { name: 'Disha T P', role: '2026 Media Lead', image: 'https://drive.google.com/file/d/1KgZjGn-SRhphRt0MrQUwibB6HuTd0wKj/view?usp=drivesdk' },
      { name: 'Aditya', role: '2026 Media Lead', image: 'https://drive.google.com/file/d/1XA6AkmS8fs3Jznr1gCTrqw_xdGLo6Tsn/view?usp=drivesdk' },
    ],
    members: [
      { name: 'Varshini', role: 'Member', image: 'https://drive.google.com/file/d/11eE71H6L2tlRAyVarlS_eni7uUZQdc-L/view?usp=drivesdk' },
      { name: 'Nisarga S Reddy', role: 'Member', image: 'https://drive.google.com/file/d/1NPLKlW42gFbXIpaoX1lrsYRtKvVgFdvN/view?usp=drivesdk' },
      { name: 'Prajwal S Shetty', role: 'Member', image: 'https://drive.google.com/file/d/1j6z4R1A_79JFqtpcLYT8jEDHRpYWMOWW/view?usp=drivesdk' },
      { name: 'John', role: 'Member', image: 'https://drive.google.com/file/d/1zuofHSJOnNocMBd868BpZ33oANBc-4eZ/view?usp=drivesdk' },
      { name: 'Keesha R', role: 'Member', image: 'https://drive.google.com/file/d/1vxEzAB6Mf0LTSxc5fl1L3ltt6ZFqUbsz/view?usp=drivesdk' },
      { name: 'Ankit Kumar', role: 'Member', image: 'https://drive.google.com/file/d/1PwrINI1FMbKr5CtjUs8cV40TcQD-ZS1J/view?usp=drivesdk' },
      { name: 'Mayank Raj Anand', role: 'Member', image: 'https://drive.google.com/file/d/1t_gl2HbD0CJ35rd_gS8tB0aWd03D-neX/view?usp=drivesdk' }
    ]
  },
  {
    id: 'Logistics',
    title: 'Doc & Log Division',
    desc: 'Managing documentation and event logistics.',
    bgClass: 'bg-[#3065A6]',
    textClass: 'text-white',
    leads: [
      { name: '2026 Pranaav', role: '2026 Logistics/Docu Lead', image: 'https://drive.google.com/file/d/1GM6C_MiTspnDTx7TWi_656U8PoNGlta3/view?usp=drivesdk' },
      { name: '2026 Umesh', role: '2026 Logistics/Docu Lead', image: 'https://drive.google.com/file/d/1wtizwuBredu-8E-aj39P8hA1EhEfgT__/view?usp=drivesdk' },
      { name: '2026 Gaargi', role: '2026 Logistics/Docu Lead', image: 'https://drive.google.com/file/d/16fSE3dl_UGumyDLak8AtWp0MNrTWinq4/view?usp=drivesdk' },
      { name: '2025 Lochan', role: '2025 Logistics/Docu Lead', image: 'https://drive.google.com/file/d/1LHX2Ik7cNpC6LqSd9usbBE6vx0Kpa2mB/view?usp=drivesdk' },
    ],
    members: [
      { name: 'LAISIRI N M', role: 'Member', image: 'https://drive.google.com/file/d/1Z4ZzOmiJRsN8n41_xrWowOSYvOWqWiVP/view?usp=drivesdk' },
      { name: 'Ashwin', role: 'Member', image: 'https://drive.google.com/file/d/1Nrl7btcRDgm9BLAST2bTboOE60CBmulP/view?usp=drivesdk' },
      { name: 'Bharath Kumar', role: 'Member', image: 'https://drive.google.com/file/d/18E2nmIfkhaY0TkVT1BL4nqcG_3d8NnKW/view?usp=drivesdk' },
      { name: 'Chethan M S', role: 'Member', image: 'https://drive.google.com/file/d/1cclnC9pcCc1l_j6m4b8_RbtTbtH4KszV/view?usp=drivesdk' },
      { name: 'Pratham', role: 'Member', image: 'https://drive.google.com/file/d/1laDP2G5o9zS-wY8YAayP_1wBCE2-VSlb/view?usp=drivesdk' },
      { name: 'Sudiksha P', role: 'Member', image: 'https://drive.google.com/file/d/1w4Q58zk_eRx17_24ObLTDDrvOc-_Wi_N/view?usp=drivesdk' },
      { name: 'Amrutha', role: 'Member', image: 'https://drive.google.com/file/d/1_PZvG-RT-GAIJ6Di2S9x-e9pW4PG27ji/view?usp=drivesdk' },
      { name: 'Srujan', role: 'Member', image: 'https://drive.google.com/file/d/1YS_3CNRjZlPdiYbiTkBEqESu5ywIKe44/view?usp=drivesdk' },
      { name: 'Khushyi', role: 'Member', image: 'https://drive.google.com/file/d/1_-OffqxiFnxyFQAIljoZzik_fHhD8S5w/view?usp=drivesdk' },
      { name: 'Ayush', role: 'Member', image: 'https://drive.google.com/file/d/1Fa-I9VCpsJi5zQd8puiCRf7Py6SljTyk/view?usp=drivesdk' },
      { name: 'Varun', role: 'Member', image: 'https://drive.google.com/file/d/1xHPUSlv6vMCUFHeR7HGhduhHTzV0R1l5/view?usp=drivesdk' },
      { name: 'Ishant Yadav', role: 'Member', image: 'https://drive.google.com/file/d/1eSZK5QM3b9X4dheaPN_9Y0j22HMzguI-/view?usp=drivesdk' },
      { name: 'Sharvari Adiga', role: 'Member', image: 'https://drive.google.com/file/d/15kXhTDWdRkdwM2B1_85HkHvS6SwycEze/view?usp=drivesdk' },
      { name: 'Ayush P', role: 'Member', image: 'https://drive.google.com/file/d/1iiJZilF4uY9pw0UJDHchEoiGyVkiCfF9/view?usp=drivesdk' }
    ]
  },
  {
    id: 'PR',
    title: 'PR Division',
    desc: 'Managing outreach and public relations.',
    bgClass: 'bg-[#DD273E]',
    textClass: 'text-white',
    leads: [
      { name: 'Trisha', role: '2026 PR Lead', image: 'https://drive.google.com/file/d/1rMA5lCL41yciJJMCcuNpBQXihC76AltH/view?usp=drivesdk' },
      { name: 'Gautham KV', role: '2026 PR Lead', image: 'https://drive.google.com/file/d/1NCyFxfAS5lvMOdQIhWYUA1wmld3YnQog/view?usp=drivesdk' },
      { name: 'Khushi Singh', role: '2026 PR Lead', image: 'https://drive.google.com/file/d/1e-IaCwRxvGIGVVPubOgSdOkRcjEXg-Km/view?usp=drivesdk' },
      { name: 'Manaswini G', role: '2025 PR Lead', image: 'https://drive.google.com/file/d/1vCjriug3ToCt9nTXXBM9fiys1HIhV0jB/view?usp=drivesdk' },
    ],
    members: [
      { name: 'Priyanka', role: 'Member', image: 'https://drive.google.com/file/d/1Sq4sjQQdouPb-to8sGVp0kWdHy0ccLkP/view?usp=drivesdk' },
      { name: 'Dhvani Agarwal', role: 'Member', image: 'https://drive.google.com/file/d/1x4ivz21gUuKfsgsJDe61_cKrQxNrubXB/view?usp=drivesdk' },
      { name: 'Eesha Hemani', role: 'Member', image: 'https://drive.google.com/file/d/1dnz7E_9M-LpgpAqzxZJuqAUS3PKwqWBS/view?usp=drivesdk' },
      { name: 'Aman Agarwal', role: 'Member', image: 'https://drive.google.com/file/d/1uj3FivsHYg7m0H66xXKMVkLbhIqgxXdJ/view?usp=drivesdk' },
      { name: 'Saanvi', role: 'Member', image: 'https://drive.google.com/file/d/1Q5T_TyqtY6Byj0blr6V0N914EwpIzkHU/view?usp=drivesdk' },
      { name: 'Prithvi Girish', role: 'Member', image: 'https://drive.google.com/file/d/1MODmjFAmvUajn7ueJjF3qiWvcQKJ3Rgv/view?usp=drivesdk' },
      { name: 'Chinmayee BV', role: 'Member', image: 'https://drive.google.com/file/d/1aOJE6qa4yu0-RISAtZNFDan1kxkaBnO0/view?usp=drivesdk' },
      { name: 'Garv Agarwal', role: 'Member', image: 'https://drive.google.com/file/d/19FanTaIYccnTQGHKU-3CJexhtGiYR_in/view?usp=drivesdk' }
    ]
  },
  {
    id: 'Cultural',
    title: 'Cultural Division',
    desc: 'Curating energy, performances, and vibes.',
    bgClass: 'bg-[#FDDF6B]',
    textClass: 'text-[#1A0A0E]',
    leads: [
      { name: 'Chandan Hegde', role: '2026 Cultural Lead', image: 'https://drive.google.com/file/d/1R6tScom3tq9grlIisNHYLzte6iTU65nh/view?usp=drivesdk' },
      { name: 'Ritu Shree', role: '2026 Cultural Lead', image: 'https://drive.google.com/file/d/16fxSDU-3hulbXDNLVZdGg7lwOmFeDb9u/view?usp=drivesdk' }
    ],
    members: [
      { name: 'Vishesh Kumar', role: 'Member', image: 'https://drive.google.com/file/d/1BNiMtBE1SG17qqzbYKbuMbBYUtlB1Ffg/view?usp=drivesdk' },
      { name: 'Pallavi P Kamath', role: 'Member', image: 'https://drive.google.com/file/d/1BWhAliCw2G8LBjKVNq-eLxEMabLXtsud/view?usp=drivesdk' },
      { name: 'Soundarya', role: 'Member', image: 'https://drive.google.com/file/d/1FiFa05u8pQVZB9GngrmhoHE0rcvRFAAV/view?usp=drivesdk' },
      { name: 'Bharath Kumar', role: 'Member', image: 'https://drive.google.com/file/d/1owh51hoydlXxHuJw5y1xG7UYfnhc4viC/view?usp=drivesdk' },
      { name: 'Gauri S', role: 'Member', image: 'https://drive.google.com/file/d/1lHrjvggzjSsEg87ZdLjU9i9leWX6ZwTo/view?usp=drivesdk' },
      { name: 'K Akanksha', role: 'Member', image: 'https://drive.google.com/file/d/1LHb_KBFGjAIfhogM9Gfe-ytZdR0zPo7V/view?usp=drivesdk' },
      { name: 'Darshan', role: 'Member', image: 'https://drive.google.com/file/d/1xfTpaJXcDNuoOd1oIez32ARl_YFp1OQ9/view?usp=drivesdk' },
      { name: 'Om Tiwari', role: 'Member', image: 'https://drive.google.com/file/d/1XvUY3lXfaLZzjGCm60N-1cToA2cLf_P-/view?usp=drivesdk' },
      { name: 'Shrinidhi Patil', role: 'Member', image: 'https://drive.google.com/file/d/1LX77qg15v8pUl8grMAnGImIruh6bFccg/view?usp=drivesdk' },
      { name: 'Gaurov Shanbhag', role: 'Member', image: 'https://drive.google.com/file/d/1aT4gGwUaEGWFxwrcg6F8m4zaP0y8VfXN/view?usp=drivesdk' }
    ]
  }
];