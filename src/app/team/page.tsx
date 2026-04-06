"use client";

import React, { useState } from 'react';
import Image from 'next/image';

// Helper to convert Google Drive viewer links to direct image links
const getDirectImageLink = (url: string) => {
  if (!url) return '';
  // Extract the file ID from the standard drive URL
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    // Returns a reliable thumbnail endpoint
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w400`;
  }
  return url;
};

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  // Overall Core Leadership
  const coreLeads = [
    { name: 'Dhruv Puri', role: 'Genesis Lead', bgClass: 'bg-[#E8192C]', image: 'https://drive.google.com/file/d/1nE7ssrnQbW4m62fBhmqa281DgGZdUCQg/view?usp=drivesdk' },
    { name: 'Khushi Agrawal', role: 'Genesis Lead', bgClass: 'bg-[#3B6FC4]', image: 'https://drive.google.com/file/d/16MGJo2vJItZ1dZsQhPiA0l_dds0lVaad/view?usp=drivesdk' }
  ];

  const departments = [
    {
      id: 'Tech',
      title: 'Tech Division',
      desc: 'The builders powering every platform, tool, and screen.',
      bgClass: 'bg-[#1A0A0E]',
      textClass: 'text-white',
      leads: [
        { name: 'Arpit Srivastava', role: 'Tech Lead', image: 'https://drive.google.com/file/d/13yzt7WkiXlerRFkS8v_q1J80aD6rziBc/view?usp=drivesdk' }
      ],
      members: [
        { name: 'Pragati Raj', role: 'Member', image: 'https://drive.google.com/file/d/1CMxPRqGiHsj7uPc_8OKxEKWuwge9yOg0/view?usp=drivesdk' },
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
      bgClass: 'bg-[#E8192C]',
      textClass: 'text-white',
      leads: [
        { name: 'Angelica', role: 'Design Lead', image: 'https://drive.google.com/file/d/1jyS1gLd6g8qQjLw1VRt0LjmdsLnFWXni/view?usp=drivesdk' },
        { name: 'Tanish Srivastava', role: 'Design Lead', image: 'https://drive.google.com/file/d/1j_bMtyQVPX5CcIWuNG_96N88xwWFPYV4/view?usp=drivesdk' },
        { name: 'Jai Kesarwani', role: 'Design Lead', image: 'https://drive.google.com/file/d/1umKEfcAcnpv1UcRtdccSQbz9Tt2l_bXi/view?usp=drivesdk' }
      ],
      members: [
        { name: 'Kushal', role: 'Member', image: 'https://drive.google.com/file/d/1nND_pH_682rZg9JatbnEn473CO-YCKOG/view?usp=drivesdk' },
        { name: 'Sachika', role: 'Member', image: 'https://drive.google.com/file/d/1pnfJsrJA1KeOwBHqt-vyNSxx_C8oBzId/view?usp=drivesdk' },
        { name: 'Pallavi P Kamath', role: 'Member', image: 'https://drive.google.com/file/d/1j5hQ4caVypegk4vrVfyrLzUI3TAGvnta/view?usp=drivesdk' },
        { name: 'Disha N G', role: 'Member', image: 'https://drive.google.com/file/d/1CIQq_g0h_DffXTm4KqBBfqhzcjEeaABq/view?usp=drivesdk' },
        { name: 'Prachi', role: 'Member', image: 'https://drive.google.com/file/d/1opqa7tEqmgDJqZwSugoHyV-GVJUl5CkW/view?usp=drivesdk' },
        { name: 'Harsha D Desai', role: 'Member', image: 'https://drive.google.com/file/d/1SLcZmVjMzJ-Tcg5Gk8zYBYS_g6YWhvEh/view?usp=drivesdk' },
        { name: 'Blessy Wilber', role: 'Member', image: 'https://drive.google.com/file/d/1TGEJGiOZwHQFf5yJI0ALnKpv5btfnFsk/view?usp=drivesdk' },
        { name: 'Bhoomika K Nayak', role: 'Member', image: 'https://drive.google.com/file/d/1lstQMI9Jg8ImeLaz8lj4z7187Ptjm8FB/view?usp=drivesdk' },
        { name: 'Rithika', role: 'Member', image: 'https://drive.google.com/file/d/1o2XOU7iq_3X_RB49HuWgHHQxRwCdZgc1/view?usp=drivesdk' },
        { name: 'Gunasree', role: 'Member', image: 'https://drive.google.com/file/d/1RrmUAirkQfoIJRXcpnNHUL7QXMMxonW_/view?usp=drivesdk' },
        { name: 'Rigved', role: 'Member', image: 'https://drive.google.com/file/d/1KbhevIRf8idzv1M976e6DZjDon_Dgntt/view?usp=drivesdk' },
        { name: 'Sinchana M Gowda 3sem', role: 'Member', image: 'https://drive.google.com/file/d/1jrMXvRXgQrmgK8j_C5EbG0cTVP6tOzmp/view?usp=drivesdk' },
        { name: 'Pavani', role: 'Member', image: 'https://drive.google.com/file/d/1ljd6trzGkOJHjjjrFk7OEHTXEtemdkK6/view?usp=drivesdk' },
        { name: 'Keesha R', role: 'Member', image: 'https://drive.google.com/file/d/11HOmy4vTDiiVyioA2_7GpWUmIjHtJByv/view?usp=drivesdk' },
        { name: 'Shrinidhi Patil', role: 'Member', image: 'https://drive.google.com/file/d/1FVQ81xk2_GPzl2_pMqDlA7Rzq5WlJuDF/view?usp=drivesdk' }
      ]
    },
    {
      id: 'Media',
      title: 'Media Division',
      desc: 'Capturing every spark, sprint, and celebration.',
      bgClass: 'bg-[#F5C518]',
      textClass: 'text-[#1A0A0E]',
      leads: [
        { name: 'Disha T P', role: 'Media Lead', image: 'https://drive.google.com/file/d/1KgZjGn-SRhphRt0MrQUwibB6HuTd0wKj/view?usp=drivesdk' },
        { name: 'Aditya', role: 'Media Lead', image: 'https://drive.google.com/file/d/1XA6AkmS8fs3Jznr1gCTrqw_xdGLo6Tsn/view?usp=drivesdk' }
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
      bgClass: 'bg-[#3B6FC4]',
      textClass: 'text-white',
      leads: [
        { name: 'Pranaav', role: 'Logistics/Docu Lead', image: 'https://drive.google.com/file/d/1GM6C_MiTspnDTx7TWi_656U8PoNGlta3/view?usp=drivesdk' },
        { name: 'Umesh', role: 'Logistics/Docu Lead', image: 'https://drive.google.com/file/d/1wtizwuBredu-8E-aj39P8hA1EhEfgT__/view?usp=drivesdk' },
        { name: 'Gaargi', role: 'Logistics/Docu Lead', image: 'https://drive.google.com/file/d/16fSE3dl_UGumyDLak8AtWp0MNrTWinq4/view?usp=drivesdk' }
      ],
      members: [
        { name: 'LAISIRI N M', role: 'Member', image: 'https://drive.google.com/file/d/1Z4ZzOmiJRsN8n41_xrWowOSYvOWqWiVP/view?usp=drivesdk' },
        { name: 'Lochan', role: 'Member', image: 'https://drive.google.com/file/d/1LHX2Ik7cNpC6LqSd9usbBE6vx0Kpa2mB/view?usp=drivesdk' },
        { name: 'Manaswini G', role: 'Member', image: 'https://drive.google.com/file/d/1G-63PR1UBQl4owh-oymqXlPi25gWo-vc/view?usp=drivesdk' },
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
      bgClass: 'bg-[#E8192C]',
      textClass: 'text-white',
      leads: [
        { name: 'Trisha', role: 'PR Lead', image: 'https://drive.google.com/file/d/1rMA5lCL41yciJJMCcuNpBQXihC76AltH/view?usp=drivesdk' },
        { name: 'Gautham KV', role: 'PR Lead', image: 'https://drive.google.com/file/d/1NCyFxfAS5lvMOdQIhWYUA1wmld3YnQog/view?usp=drivesdk' },
        { name: 'Khushi Singh', role: 'PR Lead', image: 'https://drive.google.com/file/d/1e-IaCwRxvGIGVVPubOgSdOkRcjEXg-Km/view?usp=drivesdk' }
      ],
      members: [
        { name: 'Priyanka', role: 'Member', image: 'https://drive.google.com/file/d/1Sq4sjQQdouPb-to8sGVp0kWdHy0ccLkP/view?usp=drivesdk' },
        { name: 'Manaswini G', role: 'Member', image: 'https://drive.google.com/file/d/1vCjriug3ToCt9nTXXBM9fiys1HIhV0jB/view?usp=drivesdk' },
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
      bgClass: 'bg-[#F5C518]',
      textClass: 'text-[#1A0A0E]',
      leads: [
        { name: 'Chandan Hegde', role: 'Cultural Lead', image: 'https://drive.google.com/file/d/1R6tScom3tq9grlIisNHYLzte6iTU65nh/view?usp=drivesdk' },
        { name: 'Ritu Shree', role: 'Cultural Lead', image: 'https://drive.google.com/file/d/16fxSDU-3hulbXDNLVZdGg7lwOmFeDb9u/view?usp=drivesdk' }
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

  const filters = ['All', 'Tech', 'Design', 'Media', 'Logistics', 'PR', 'Cultural'];

  return (
    <div className="bg-[#FDE8EC] font-nunito text-[#1A0A0E] min-h-screen">
      {/* ── HERO ── */}
      <section className="bg-[#1A0A0E] pt-20 pb-16 px-6 text-center border-b-4 border-[#1A0A0E] relative overflow-hidden">
        <div className="absolute inset-0 font-gliker text-[60px] md:text-[80px] text-white/[0.02] tracking-[6px] pointer-events-none select-none">
          GENESIS GENESIS GENESIS GENESIS GENESIS GENESIS GENESIS GENESIS
        </div>
        <div className="inline-block bg-[#E8192C] text-white font-black text-xs px-4 py-1.5 rounded-full border-2 border-[#F5C518] mb-6 relative z-10 uppercase">
          Meet the Crew
        </div>
        <h1 className="font-gliker text-5xl md:text-8xl text-white leading-tight relative z-10 mb-6" style={{ textShadow: '4px 4px 0 #E8192C' }}>
          The <span className="text-[#F5C518]">Trainers</span><br />Behind Catalysis
        </h1>
      </section>

      {/* ── FILTER BAR ── */}
      <div className="py-8 px-6 flex gap-3 flex-wrap justify-center">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`border-2 border-[#1A0A0E] rounded-full px-6 py-2 font-black text-xs uppercase transition-all shadow-[3px_3px_0_#1A0A0E] active:translate-y-1
              ${activeFilter === f ? 'bg-[#E8192C] text-white -translate-y-1 shadow-[5px_5px_0_#1A0A0E]' : 'bg-white hover:bg-slate-50'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── DEPARTMENTS ── */}
      <div className="pb-20 max-w-7xl mx-auto px-6">
        
        {/* ── CORE LEADERSHIP ── */}
        {activeFilter === 'All' && (
          <div className="mb-16">
            <div className="p-6 rounded-2xl border-4 border-[#1A0A0E] shadow-[6px_6px_0_#1A0A0E] mb-10 bg-white text-[#1A0A0E]">
              <h3 className="font-gliker text-3xl md:text-4xl uppercase">Core Leadership</h3>
              <p className="font-bold opacity-80">The visionaries leading Genesis.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {coreLeads.map((lead, i) => (
                <div key={i} className="bg-white border-4 border-[#1A0A0E] rounded-2xl p-5 shadow-[6px_6px_0_#1A0A0E] relative overflow-hidden group">
                  <div className="absolute top-3 right-3 bg-[#F5C518] border-2 border-[#1A0A0E] px-3 py-1 rounded-full text-[10px] font-black uppercase z-10">Lead</div>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full border-2 border-[#1A0A0E] flex-shrink-0 overflow-hidden relative ${lead.bgClass}`}>
                      {lead.image ? <Image src={getDirectImageLink(lead.image)} alt={lead.name} fill className="object-cover" /> : <span className="flex items-center justify-center h-full font-gliker text-2xl text-white">{lead.name[0]}</span>}
                    </div>
                    <div>
                      <h4 className="font-gliker text-xl leading-none">{lead.name}</h4>
                      <p className="text-xs font-black text-[#E8192C] uppercase mt-1">{lead.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {departments
          .filter(d => activeFilter === 'All' || activeFilter === d.id)
          .map((dept) => (
          <div key={dept.id} className="mb-16">
            <div className={`p-6 rounded-2xl border-4 border-[#1A0A0E] shadow-[6px_6px_0_#1A0A0E] mb-10 ${dept.bgClass} ${dept.textClass}`}>
              <h3 className="font-gliker text-3xl md:text-4xl uppercase">{dept.title}</h3>
              <p className="font-bold opacity-80">{dept.desc}</p>
            </div>

            {/* Leads Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {dept.leads.map((lead, i) => (
                <div key={i} className="bg-white border-4 border-[#1A0A0E] rounded-2xl p-5 shadow-[6px_6px_0_#1A0A0E] relative overflow-hidden group">
                  <div className="absolute top-3 right-3 bg-[#F5C518] border-2 border-[#1A0A0E] px-3 py-1 rounded-full text-[10px] font-black uppercase z-10">Lead</div>
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-full border-2 border-[#1A0A0E] flex-shrink-0 overflow-hidden relative ${dept.bgClass}`}>
                      {lead.image ? <Image src={getDirectImageLink(lead.image)} alt={lead.name} fill className="object-cover" /> : <span className="flex items-center justify-center h-full font-gliker text-2xl text-white">{lead.name[0]}</span>}
                    </div>
                    <div>
                      <h4 className="font-gliker text-xl leading-none">{lead.name}</h4>
                      <p className="text-xs font-black text-[#E8192C] uppercase mt-1">{lead.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {dept.members.map((m, i) => (
                <div key={i} className="bg-white border-2 border-[#1A0A0E] rounded-xl p-3 shadow-[4px_4px_0_#1A0A0E] hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#1A0A0E] flex-shrink-0 overflow-hidden relative bg-slate-100">
                      {m.image ? <Image src={getDirectImageLink(m.image)} alt={m.name} fill className="object-cover" /> : <span className="flex items-center justify-center h-full font-black text-sm">{m.name[0]}</span>}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-xs truncate leading-tight">{m.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Member</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── JOIN BAND ── */}
      <section className="bg-[#F5C518] border-t-4 border-[#1A0A0E] p-12 text-center">
        <h2 className="font-gliker text-4xl mb-4">Want to Join the Crew?</h2>
        <p className="font-bold mb-8 max-w-lg mx-auto">Recruitments are currently closed. We usually open doors every semester—stay tuned!</p>
        <div className="inline-block bg-[#1A0A0E] text-white font-gliker px-8 py-3 rounded-full border-4 border-[#1A0A0E] cursor-not-allowed opacity-80">COMING SOON</div>
      </section>
    </div>
  );
}