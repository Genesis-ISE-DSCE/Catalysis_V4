"use client";

import React, { useState } from "react";
import Image from "next/image";
import pokeball1 from "../../../public/poke-balls/pokeball1.png";
import pokeball2 from "../../../public/poke-balls/pokeball2.png";
import { BRANCHES, COLLEGES, TEAM_EVENT_IDS } from "@/lib/formConstants";
import type { EventId } from "@/lib/formConstants";

// ─── Constants & Types ────────────────────────────────────────────────────────

interface EventCard {
  id: EventId;
  name: string;
  type: string;
  imgSrc: string;
  iconBg: string;
}

const ALL_EVENTS: EventCard[] = [
  { id: "pitch_perfect",  name: "PitchDexs",    type: "STRATEGY TYPE", imgSrc: "/events/pitch.png",        iconBg: "#e74c3c" },
  { id: "typemaster",     name: "Typemaster",   type: "SKILL TYPE",    imgSrc: "/events/typemaster.png",   iconBg: "#27ae60" },
  { id: "clash_royale",   name: "Clash Royale", type: "COMBAT TYPE",   imgSrc: "/events/clash-royale.png", iconBg: "#2980b9" },
  { id: "coding_relay",   name: "Coding Relay", type: "TECH TYPE",     imgSrc: "/events/coding-relay.png", iconBg: "#8e44ad" },
  { id: "dsa_smackdown",  name: "DSA",          type: "LOGIC TYPE",    imgSrc: "/events/dsa.png",          iconBg: "#e67e22" },
  { id: "technoseek",     name: "Technoseek",   type: "STRATEGY TYPE", imgSrc: "/events/technoseek.png",   iconBg: "#16a085" },
];

interface MemberData {
  name: string;
  usn: string;
  email: string;
  phone: string;
  semester: string;
  branch: string;
  college: string;
}

interface FieldErrorState {
  name?: string;
  usn?: string;
  email?: string;
  phone?: string;
}

const BLANK_MEMBER: MemberData = { name: "", usn: "", email: "", phone: "", semester: "", branch: "", college: "" };

// ─── Validation Helper ────────────────────────────────────────────────────────

const getFieldError = (field: keyof MemberData, value: string) => {
  if (!value) return "";
  switch (field) {
    case "name":
      return /^[a-zA-Z\s]{3,50}$/.test(value) ? "" : "Letters only (min 3 chars)";
    case "usn":
      return /^[a-zA-Z0-9]{10,20}$/.test(value) ? "" : "Invalid USN format (10+ chars)";
    case "email":
      return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value) ? "" : "Must be a valid @gmail.com address";
    case "phone":
      return /^[6-9]\d{9}$/.test(value) ? "" : "Enter a valid 10-digit Indian number";
    default:
      return "";
  }
};

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventId | "">("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null); // State for Custom Modal
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<[MemberData, MemberData, MemberData]>([
    { ...BLANK_MEMBER },
    { ...BLANK_MEMBER },
    { ...BLANK_MEMBER },
  ]);

  const [errors, setErrors] = useState<FieldErrorState[]>([{}, {}, {}]);

  const isTeam = selectedEvent !== "" && TEAM_EVENT_IDS.includes(selectedEvent as EventId);

  const updateMember = (index: 0 | 1 | 2, field: keyof MemberData, value: string) => {
    const error = getFieldError(field, value);
    setErrors((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: error };
      return next;
    });

    setMembers((prev) => {
      const next = [...prev] as [MemberData, MemberData, MemberData];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return setModalError("Please select a game first!");

    const hasErrors = errors.some(obj => Object.values(obj).some(val => val !== ""));
    if (hasErrors) return setModalError("Please fix the validation errors in the fields.");

    setLoading(true);

    const payload = {
      event: selectedEvent,
      team_name: isTeam ? teamName : "",
      member1: { ...members[0], semester: Number(members[0].semester) },
      member2: isTeam ? { ...members[1], semester: Number(members[1].semester) } : {},
      member3: isTeam ? { ...members[2], semester: Number(members[2].semester) } : {},
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setIsSuccess(true);
      } else {
        setModalError(data.error || "Something went wrong."); // Show modal instead of alert
      }
    } catch {
      setLoading(false);
      setModalError("Network error. Please check your connection.");
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#f5eaea] dark:bg-[#0A0018] min-h-screen font-nunito flex items-center justify-center p-6">
        <div className="bg-white dark:bg-[#160030] border-4 border-black dark:border-white/15 p-10 rounded-[2.5rem] shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,45,85,0.2)] text-center max-w-lg w-full animate-in zoom-in duration-300">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="font-gliker text-4xl text-[#dd273e] mb-4" style={{ fontWeight: 900 }}>Trainer Registered!</h1>
          <p className="font-nunito font-bold text-gray-700 dark:text-white/60 mb-8">
            Registration successful. Your details have been recorded. See you at the battleground!
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="bg-black dark:bg-[#DD273E] text-white px-10 py-4 rounded-full font-black tracking-widest hover:scale-105 transition active:translate-y-1"
          >
            GO TO HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f5eaea] dark:bg-[#0A0018] min-h-screen font-nunito relative">
      
      {/* ── Custom Error Modal ── */}
      {modalError && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#160030] border-[4px] border-black dark:border-white/15 rounded-[2rem] shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-none max-w-sm w-full p-8 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-[#dd273e] rounded-full border-4 border-black dark:border-transparent flex items-center justify-center mx-auto mb-4 text-white text-3xl font-black">
              !
            </div>
            <h2 className="font-gliker text-2xl text-black dark:text-white mb-3">Notice!</h2>
            <p className="font-nunito font-bold text-gray-600 dark:text-white/55 mb-6 leading-tight">
              {modalError}
            </p>
            <button 
              onClick={() => setModalError(null)}
              className="w-full bg-black text-white font-black py-3 rounded-xl border-2 border-black hover:bg-gray-800 transition active:translate-y-1 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] uppercase tracking-widest"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="text-center pt-28 pb-32 px-6">
        {/* Organiser badge */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-5">
          <span className="inline-flex items-center gap-1.5 bg-white dark:bg-[#160030] border-2 border-black dark:border-white/20 rounded-full px-4 py-1 text-[11px] font-black tracking-widest uppercase text-[#3A001D] dark:text-white/80 shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-none">
            <span className="w-2 h-2 rounded-full bg-[#DD273E] inline-block" />
            Club Genesis &nbsp;·&nbsp; ISE Dept, DSCE
          </span>
          <span className="inline-flex items-center bg-[#DD273E] border-2 border-black dark:border-transparent rounded-full px-4 py-1 text-[11px] font-black tracking-widest uppercase text-white shadow-[2px_2px_0_rgba(0,0,0,1)] dark:shadow-[0_0_10px_rgba(255,45,85,0.4)]">
            Catalysis V4.0
          </span>
        </div>
        <h1 className="text-[#2d1216] dark:text-white text-5xl md:text-6xl mb-4 leading-tight" style={{ fontFamily: "'Gliker', 'Fredoka One', cursive", fontWeight: 900 }}>
          Trainer Registration
        </h1>
        <p className="max-w-xl mx-auto text-[#2d1216] dark:text-white/55 text-sm md:text-base opacity-70 leading-relaxed font-medium">
          Start your adventure today. Select your battleground carefully. Strive with determination and skill to ascend and claim your rightful place as a true champion.
        </p>
      </div>

      <div className="relative w-full">
        {/* Pink Stacked Cards UI */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-[#FF94a5] rounded-t-[2.5rem] border-t-2 border-x-2 border-black z-[1]" style={{ transform: "translateY(-6.0rem)" }} />
        <div className="absolute top-0 left-0 right-0 h-24 bg-[#fc7d8d] rounded-t-[2.5rem] border-t-2 border-x-2 border-black z-[2]" style={{ transform: "translateY(-3.0rem)" }} />
        <div className="absolute top-0 left-0 right-0 h-24 bg-[#e06675] rounded-t-[2.5rem] border-t-2 border-x-2 border-black z-[3]" style={{ transform: "translateY(-1.3rem)" }} />

        {/* Main Form Body */}
        <div className="relative bg-[#dd273e] rounded-t-[2.5rem] border-t-2 border-x-2 border-black z-[10] overflow-hidden pt-16 pb-0">
          
          <div className="pointer-events-none absolute top-[-2%] right-[-8%] opacity-[0.12] select-none">
            <Image src={pokeball2} alt="pokeball" width={420} height={420} className="rotate-[-10deg]" />
          </div>
          <div className="pointer-events-none absolute top-[38%] left-[-10%] opacity-[0.12] select-none">
            <Image src={pokeball1} alt="pokeball" width={380} height={380} className="rotate-[15deg]" />
          </div>

          <form onSubmit={handleSubmit} className="relative z-20 w-full max-w-4xl mx-auto px-6 md:px-12 pb-0 space-y-14">
            <Section title="PERSONAL DETAILS" />
            <MemberForm member={members[0]} errors={errors[0]} index={0} label="Member 1" onChange={updateMember} showLabel={false} />

            <div className="space-y-8 -mt-4">
              <Section title="SELECT YOUR EVENTS" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-3xl mx-auto">
                {ALL_EVENTS.map((ev) => (
                  <EventCardItem key={ev.id} event={ev} selected={selectedEvent === ev.id} onSelect={() => setSelectedEvent(ev.id)} />
                ))}
              </div>
            </div>

            {isTeam && (
              <div className="space-y-8 transition-all duration-300">
                <Section title="TEAM DETAILS" />
                <div className="max-w-3xl mx-auto">
                  <InputField label="Team Name" placeholder="Enter your team name" value={teamName} onChange={setTeamName} required />
                </div>
              </div>
            )}

            <div className="space-y-8">
              <Section title="ACADEMIC DETAILS" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto">
                <SelectField label="College" placeholder="Select college" value={members[0].college} options={COLLEGES.map((c) => ({ value: c, label: c }))} onChange={(v: string) => updateMember(0, "college", v)} />
                <SelectField label="Semester" placeholder="Select semester" value={members[0].semester} options={["1","2","3","4","5","6","7","8"].map((o) => ({ value: o, label: `Semester ${o}` }))} onChange={(v: string) => updateMember(0, "semester", v)} />
                <BranchSelectField label="Branch" placeholder="Select branch" value={members[0].branch} onChange={(v) => updateMember(0, "branch", v)} />
              </div>
            </div>

            {isTeam && (
              <>
                <div className="space-y-8">
                  <Section title="MEMBER 2 DETAILS" />
                  <MemberForm member={members[1]} errors={errors[1]} index={1} label="Member 2" onChange={updateMember} showLabel />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto">
                    <SelectField label="College" placeholder="Select college" value={members[1].college} options={COLLEGES.map((c) => ({ value: c, label: c }))} onChange={(v) => updateMember(1, "college", v)} />
                    <SelectField label="Semester" placeholder="Select semester" value={members[1].semester} options={["1","2","3","4","5","6","7","8"].map((o) => ({ value: o, label: `Semester ${o}` }))} onChange={(v) => updateMember(1, "semester", v)} />
                    <BranchSelectField label="Branch" placeholder="Select branch" value={members[1].branch} onChange={(v) => updateMember(1, "branch", v)} />
                  </div>
                </div>
                <div className="space-y-8">
                  <Section title="MEMBER 3 DETAILS" />
                  <MemberForm member={members[2]} errors={errors[2]} index={2} label="Member 3" onChange={updateMember} showLabel />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto">
                    <SelectField label="College" placeholder="Select college" value={members[2].college} options={COLLEGES.map((c) => ({ value: c, label: c }))} onChange={(v) => updateMember(2, "college", v)} />
                    <SelectField label="Semester" placeholder="Select semester" value={members[2].semester} options={["1","2","3","4","5","6","7","8"].map((o) => ({ value: o, label: `Semester ${o}` }))} onChange={(v) => updateMember(2, "semester", v)} />
                    <BranchSelectField label="Branch" placeholder="Select branch" value={members[2].branch} onChange={(v) => updateMember(2, "branch", v)} />
                  </div>
                </div>
              </>
            )}

            <div className="flex flex-col items-start gap-5 pt-6 pb-24 max-w-3xl mx-auto">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" required className="w-4 h-4 border-2 border-black rounded accent-[#dd273e] cursor-pointer" />
                <span className="text-white font-semibold text-sm">I agree to follow all event rules and guidelines.</span>
              </label>
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 rounded-2xl bg-black z-0" style={{ transform: "translate(4px, 6px)" }} />
                <button type="submit" disabled={loading || !selectedEvent} className="relative z-10 bg-white text-black font-black tracking-widest uppercase px-12 py-3.5 rounded-2xl border-2 border-black transition-transform duration-150 group-hover:-translate-y-0.5 group-active:translate-y-1 disabled:opacity-60 text-sm" style={{ letterSpacing: "0.15em" }}>
                  {loading ? "Registering..." : "REGISTER NOW"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───

function Section({ title }: { title: string }) {
  return (
    <div className="flex justify-center">
      <div className="bg-[#b31d2f] px-8 py-2 rounded-full border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
        <span className="text-white font-black text-[9px] tracking-[0.25em] uppercase">{title}</span>
      </div>
    </div>
  );
}

interface MemberFormProps {
  member: MemberData;
  errors: FieldErrorState;
  index: 0 | 1 | 2;
  label: string;
  onChange: (i: 0 | 1 | 2, f: keyof MemberData, v: string) => void;
  showLabel: boolean;
}

function MemberForm({ member, errors, index, onChange, showLabel }: MemberFormProps) {
  const req = index === 0;
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {showLabel && <p className="text-white/60 text-xs font-bold uppercase tracking-widest text-center -mb-2">— Member {index + 1} —</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
        <InputField label="Name" placeholder="Enter your full name" value={member.name} error={errors?.name} onChange={(v: string) => onChange(index, "name", v)} required={req} />
        <InputField label="USN" placeholder="Enter your USN / ID" value={member.usn} error={errors?.usn} onChange={(v: string) => onChange(index, "usn", v)} required={req} />
        <InputField label="Email" placeholder="Enter email address" value={member.email} error={errors?.email} onChange={(v: string) => onChange(index, "email", v)} required={req} type="email" />
        <InputField label="Phone Number" placeholder="Enter phone number" value={member.phone} error={errors?.phone} onChange={(v: string) => onChange(index, "phone", v)} required={req} type="tel" />
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
}

function InputField({ label, placeholder, value, error, onChange, required, type = "text" }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white ml-2 font-semibold text-base" style={{ fontFamily: "'Gliker','Fredoka One',cursive" }}>{label}</label>
      <input type={type} required={required} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className={`w-full px-5 py-3.5 rounded-full border-2 border-black bg-white text-black text-sm outline-none transition-all ${error ? 'ring-4 ring-yellow-400' : 'focus:ring-2 focus:ring-white/40'}`} />
      <div className="min-h-[16px] ml-4">
        {error ? (
          <p className="text-yellow-300 text-[10px] font-bold uppercase italic tracking-wider animate-pulse">⚠️ {error}</p>
        ) : (
          <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest">
            {label === "Phone" ? "Starts with 6-9" : label === "USN" ? "Alphanumeric" : label === "Email" ? "Ends with @gmail.com" : ""}
          </p>
        )}
      </div>
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  placeholder: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}

function SelectField({ label, placeholder, value, options, onChange }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white ml-2 font-semibold text-base" style={{ fontFamily: "'Gliker','Fredoka One',cursive" }}>{label}</label>
      <div className="relative">
        <select required value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-5 py-3.5 rounded-full border-2 border-black bg-white text-black text-sm outline-none appearance-none cursor-pointer">
          <option value="">{placeholder}</option>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none"><path d="M1 1L7 7L13 1" stroke="#dd273e" strokeWidth="2.5" strokeLinecap="round" /></svg>
        </div>
      </div>
    </div>
  );
}

function BranchSelectField({ label, placeholder, value, onChange }: Omit<SelectFieldProps, "options">) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white ml-2 font-semibold text-base" style={{ fontFamily: "'Gliker','Fredoka One',cursive" }}>{label}</label>
      <div className="relative">
        <select required value={value} onChange={(e) => onChange(e.target.value)} className="w-full px-5 py-3.5 rounded-full border-2 border-black bg-white text-black text-sm outline-none appearance-none cursor-pointer">
          <option value="">{placeholder}</option>
          {BRANCHES.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
        </select>
        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none"><path d="M1 1L7 7L13 1" stroke="#dd273e" strokeWidth="2.5" strokeLinecap="round" /></svg>
        </div>
      </div>
    </div>
  );
}

function EventCardItem({ event, selected, onSelect }: { event: EventCard; selected: boolean; onSelect: () => void }) {
  return (
    <div onClick={onSelect} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onSelect()} className={`flex items-center gap-3 px-3 py-2.5 rounded-full border-2 cursor-pointer transition-all duration-200 select-none ${selected ? "border-black dark:border-white/30 bg-[#fdf3d7] dark:bg-white/10 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[0_0_12px_rgba(255,45,85,0.25)]" : "border-black dark:border-white/10 bg-[#f5eaea] dark:bg-white/4 hover:bg-[#fdf3d7]/60 dark:hover:bg-white/8"}`}>
      <div className="w-11 h-11 rounded-full border-2 border-black dark:border-white/20 flex items-center justify-center shrink-0 overflow-hidden" style={{ background: event.iconBg }}>
        <Image src={event.imgSrc} alt={event.name} width={44} height={44} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-black dark:text-white text-sm leading-tight font-bold truncate" style={{ fontFamily: "'Gliker','Fredoka One',cursive" }}>{event.name}</p>
        <p className="text-[9px] font-bold text-black/40 dark:text-white/35 uppercase tracking-wider mt-0.5">{event.type}</p>
      </div>
      <div className="w-8 h-8 rounded-full border-2 border-dashed border-black/30 dark:border-white/20 flex items-center justify-center shrink-0">
        {selected && <div className="w-4 h-4 bg-black dark:bg-white rounded-full" />}
      </div>
    </div>
  );
}