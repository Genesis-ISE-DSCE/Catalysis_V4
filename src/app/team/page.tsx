// TeamPage.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { coreLeads, departments, pastMembers } from './teamData';

// Helper to convert Google Drive viewer links to our custom caching API
const getDirectImageLink = (url: string) => {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `/api/image/${match[1]}`; 
  }
  return url;
};

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', ...departments.map(d => d.id), 'Alumni'];

  return (
    <div suppressHydrationWarning className="bg-[#FFEEF0] font-nunito text-[#1A0A0E] min-h-screen">
      {/* suppressHydrationWarning added to the div above to prevent browser extensions from crashing React */}
      
      {/* ── HERO ── */}
      <section className="bg-[#FFEEF0] pt-20 pb-16 px-6 text-center relative overflow-hidden">
        <div className="inline-block bg-[#FDDF6B] text-[#1A0A0E] font-black text-xs px-4 py-1.5 rounded-full border-2 border-[#1A0A0E] mb-6 relative z-10 uppercase">
          Meet the Crew
        </div>
        <h1 className="font-gliker text-5xl md:text-8xl text-[#3A001D] leading-tight relative z-10 mb-6" >
          The <span className="text-[#3A001D]">Trainers</span><br />Behind Catalysis
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

      <div className="pb-20 max-w-7xl mx-auto px-6">
        
        {/* ── CURRENT TEAM (Hidden when 'Alumni' is explicitly selected) ── */}
        {activeFilter !== 'Alumni' && (
          <>
            {/* ── CORE LEADERSHIP ── */}
            {activeFilter === 'All' && (
              <div className="mb-16">
                <div className="p-6 rounded-2xl border-4 border-[#1A0A0E] shadow-[6px_6px_0_#1A0A0E] mb-10 bg-white text-[#1A0A0E]">
                  <h3 className="font-gliker text-3xl md:text-4xl uppercase">Core Leadership</h3>
                  <p className="font-bold opacity-80">The visionaries leading Genesis.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* Changed key={i} to a unique ID to prevent map re-rendering bugs */}
                  {coreLeads?.map((lead, i) => (
                    <div key={`core-${lead.name}-${i}`} className="bg-white border-4 border-[#1A0A0E] rounded-2xl p-5 shadow-[6px_6px_0_#1A0A0E] relative overflow-hidden group">
                      <div className="absolute top-3 right-3 bg-[#F5C518] border-2 border-[#1A0A0E] px-3 py-1 rounded-full text-[10px] font-black uppercase z-10">Lead</div>
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full border-2 border-[#1A0A0E] flex-shrink-0 overflow-hidden relative ${lead.bgClass}`}>
                          {lead.image ? (
                            <Image 
                              src={getDirectImageLink(lead.image)} 
                              alt={lead.name} 
                              fill 
                              sizes="(max-width: 768px) 64px, 64px"
                              quality={75}
                              className="object-cover" 
                            />
                          ) : (
                            <span className="flex items-center justify-center h-full font-gliker text-2xl text-white">{lead.name?.[0] || '?'}</span>
                          )}
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

            {/* ── DEPARTMENTS ── */}
            {departments
              ?.filter(d => activeFilter === 'All' || activeFilter === d.id)
              .map((dept) => (
              <div key={`dept-${dept.id}`} className="mb-16">
                <div className={`p-6 rounded-2xl border-4 border-[#1A0A0E] shadow-[6px_6px_0_#1A0A0E] mb-10 ${dept.bgClass} ${dept.textClass}`}>
                  <h3 className="font-gliker text-3xl md:text-4xl uppercase">{dept.title}</h3>
                  <p className="font-bold opacity-80">{dept.desc}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {dept.leads?.map((lead, i) => (
                    <div key={`lead-${dept.id}-${lead.name}-${i}`} className="bg-white border-4 border-[#1A0A0E] rounded-2xl p-5 shadow-[6px_6px_0_#1A0A0E] relative overflow-hidden group">
                      <div className="absolute top-3 right-3 bg-[#FDDF6B] border-2 border-[#1A0A0E] px-3 py-1 rounded-full text-[10px] font-black uppercase z-10">Lead</div>
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full border-2 border-[#1A0A0E] flex-shrink-0 overflow-hidden relative ${dept.bgClass}`}>
                          {lead.image ? (
                            <Image 
                              src={getDirectImageLink(lead.image)} 
                              alt={lead.name} 
                              fill 
                              sizes="(max-width: 768px) 64px, 64px"
                              quality={75}
                              className="object-cover" 
                            />
                          ) : (
                            <span className="flex items-center justify-center h-full font-gliker text-2xl text-white">{lead.name?.[0] || '?'}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-gliker text-xl leading-none">{lead.name}</h4>
                          <p className="text-xs font-black text-[#E8192C] uppercase mt-1">{lead.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {dept.members?.map((m, i) => (
                    <div key={`member-${dept.id}-${m.name}-${i}`} className="bg-white border-2 border-[#1A0A0E] rounded-xl p-3 shadow-[4px_4px_0_#1A0A0E] hover:-translate-y-1 transition-transform">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full border border-[#1A0A0E] flex-shrink-0 overflow-hidden relative bg-slate-100">
                          {m.image ? (
                            <Image 
                              src={getDirectImageLink(m.image)} 
                              alt={m.name} 
                              fill 
                              sizes="(max-width: 768px) 40px, 40px"
                              quality={60}
                              className="object-cover" 
                              loading="lazy"
                            />
                          ) : (
                            <span className="flex items-center justify-center h-full font-black text-sm">{m.name?.[0] || '?'}</span>
                          )}
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
          </>
        )}

        {/* ── PAST LEADS & MEMBERS SECTION (ALUMNI) ── */}
        {(activeFilter === 'All' || activeFilter === 'Alumni') && (
          <div className="mt-20">
            <div className="p-6 rounded-2xl border-4 border-[#1A0A0E] shadow-[6px_6px_0_#1A0A0E] mb-10 bg-[#1A0A0E] text-white">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h3 className="font-gliker text-3xl md:text-4xl uppercase text-[#FDDF6B]">The Legacy</h3>
                  <p className="font-bold opacity-80 mt-1">Past Leads and Members who shaped Genesis.</p>
                </div>
                <div className="bg-[#E8192C] text-white px-4 py-1.5 rounded-full border-2 border-white text-[10px] font-black uppercase inline-block self-start md:self-auto">
                  Hall of Fame
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pastMembers?.map((m, i) => (
                <div key={`alumni-${m.name}-${i}`} className="bg-white border-2 border-[#1A0A0E] rounded-xl p-3 shadow-[4px_4px_0_#1A0A0E] hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-[#1A0A0E] flex-shrink-0 overflow-hidden relative bg-slate-100">
                      {m.image ? (
                        <Image 
                          src={getDirectImageLink(m.image)} 
                          alt={m.name} 
                          fill 
                          sizes="(max-width: 768px) 40px, 40px"
                          className="object-cover" 
                        />
                      ) : (
                        <span className="flex items-center justify-center h-full font-black text-sm text-[#1A0A0E]">{m.name?.[0] || '?'}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-black text-xs truncate leading-tight text-[#1A0A0E]">{m.name}</p>
                      <p className="text-[9px] font-bold text-slate-500 uppercase truncate mt-0.5">{m.role}</p>
                      <p className="text-[9px] font-black text-[#E8192C]">{m.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── JOIN BAND ── */}
      <section className="bg-[#FDDF6B] border-t-4 border-[#1A0A0E] p-12 text-center">
        <h2 className="font-gliker text-4xl mb-4">Want to Join the Crew?</h2>
        <p className="font-bold mb-8 max-w-lg mx-auto">Recruitments are currently closed. We usually open doors every year - stay tuned!</p>
        <div className="inline-block bg-[#1A0A0E] text-white font-gliker px-8 py-3 rounded-full border-4 border-[#1A0A0E] cursor-not-allowed opacity-80">COMING SOON</div>
      </section>
    </div>
    
  );
}