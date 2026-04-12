// src/components/admin/AdminRegistrationForm.tsx
"use client";
import { useState } from "react";

// Constants
const TEAM_EVENTS = ["technoseek", "coding_relay"];
const SOLO_EVENTS = ["typemaster", "dsa_smackdown", "pitch_perfect", "clash_royale", "prompt_wars"];

const EVENT_LABELS: Record<string, string> = {
  typemaster: "⚡ Typemaster",
  dsa_smackdown: "🧠 DSA Smackdown",
  pitch_perfect: "🎯 Ideathon",
  clash_royale: "👑 Clash Royale",
  prompt_wars: "🤖 Prompt Wars",
  technoseek: "🔍 Technoseek (Team Event - 3 Members)",
  coding_relay: "🏃 Coding Relay (Team Event - 3 Members)",
};
 
const BRANCHES = [
  "Artificial Intelligence and Machine Learning",
  "Aeronautical Engineering",
  "Automobile Engineering",
  "Biotechnology",
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Science and Business Systems",
  "Computer Science and Design",
  "Computer Science and Engineering",
  "Computer Science & Engineering (Cyber Security)",
  "Computer Science & Engineering (Data Science)",
  "Computer Science & Engineering (IoT and Cyber Security Including Block Chain)",
  "Electrical & Electronics Engineering",
  "Electronics & Communication Engineering",
  "Electronics and Instrumentation Engineering",
  "Electronics and Telecommunication Engineering",
  "Information Science and Engineering",
  "Mechanical Engineering",
  "Medical Electronics Engineering",
  "Robotics and Artificial Intelligence",
];

const SEMESTERS = [2, 4, 6, 8];

export default function AdminRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [showTeamFields, setShowTeamFields] = useState(false);

  const isTeamEvent = TEAM_EVENTS.includes(selectedEvent);

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target.value;
    setSelectedEvent(event);
    setShowTeamFields(TEAM_EVENTS.includes(event));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    const formData = new FormData(e.currentTarget);
    const event = formData.get("event") as string;
    const isTeam = TEAM_EVENTS.includes(event);
    
    const data: any = {
      event,
      team_name: isTeam ? (formData.get("team_name") as string) : "",
      member1: {
        name: formData.get("member1_name"),
        usn: formData.get("member1_usn"),
        email: formData.get("member1_email"),
        phone: formData.get("member1_phone"),
        semester: parseInt(formData.get("member1_semester") as string),
        branch: formData.get("member1_branch"),
      },
    };
    
    if (isTeam) {
      if (formData.get("member2_name")) {
        data.member2 = {
          name: formData.get("member2_name"),
          usn: formData.get("member2_usn"),
          email: formData.get("member2_email"),
          phone: formData.get("member2_phone"),
          semester: parseInt(formData.get("member2_semester") as string),
          branch: formData.get("member2_branch"),
        };
      }
      
      if (formData.get("member3_name")) {
        data.member3 = {
          name: formData.get("member3_name"),
          usn: formData.get("member3_usn"),
          email: formData.get("member3_email"),
          phone: formData.get("member3_phone"),
          semester: parseInt(formData.get("member3_semester") as string),
          branch: formData.get("member3_branch"),
        };
      }
    }
    
    try {
      const res = await fetch("/api/internal/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const responseData = await res.json();
      setResult({ success: res.ok, data: responseData });
    } catch (error) {
      setResult({ success: false, data: { error: "Network error. Please try again." } });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.5px" }}>
          Help Desk Registration
        </h1>
        <p style={{ color: "#475569", fontSize: 14, margin: 0 }}>
          Quickly register students for Catalysis events
        </p>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Event Selection Card */}
        <div style={cardStyle}>
          <label style={labelStyle}>
            Select Event <span style={{ color: "#f87171" }}>*</span>
          </label>
          <select
            name="event"
            required
            value={selectedEvent}
            onChange={handleEventChange}
            style={selectStyle}
          >
            <option value="">-- Select an event --</option>
            {[...SOLO_EVENTS, ...TEAM_EVENTS].map(event => (
              <option key={event} value={event}>{EVENT_LABELS[event]}</option>
            ))}
          </select>
          
          {isTeamEvent && (
            <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(99,102,241,0.1)", borderRadius: 8, border: "1px solid rgba(99,102,241,0.2)" }}>
              <p style={{ color: "#818cf8", fontSize: 13, margin: 0 }}>
                ⚠️ This is a team event. You need to register all 3 team members together.
              </p>
            </div>
          )}
        </div>
        
        {/* Team Name (for team events) */}
        {showTeamFields && (
          <div style={cardStyle}>
            <label style={labelStyle}>
              Team Name <span style={{ color: "#f87171" }}>*</span>
            </label>
            <input
              name="team_name"
              type="text"
              required
              placeholder="e.g., Code Warriors, Tech Titans"
              style={inputStyle}
            />
            <p style={{ color: "#475569", fontSize: 11, marginTop: 6 }}>Unique team name for identification</p>
          </div>
        )}
        
        {/* Member 1 (Lead) - Always required */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ color: "#a5b4fc", fontSize: 14, fontWeight: 600, margin: 0 }}>Member 1 (Team Lead)</h3>
            <span style={{ background: "rgba(248,113,113,0.15)", color: "#f87171", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>Required</span>
          </div>
          <div style={gridStyle}>
            <input name="member1_name" placeholder="Full Name" required style={inputStyle} />
            <input name="member1_usn" placeholder="USN (e.g., 1DS24CS001)" required style={inputStyle} />
            <input name="member1_email" placeholder="Email" type="email" required style={inputStyle} />
            <input name="member1_phone" placeholder="Phone Number" required style={inputStyle} />
            <select name="member1_semester" required style={selectStyle}>
              <option value="">Select Semester</option>
              {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
            <select name="member1_branch" required style={selectStyle}>
              <option value="">Select Branch</option>
              {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
        
        {/* Member 2 - Required for team events */}
        {showTeamFields && (
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ color: "#a5b4fc", fontSize: 14, fontWeight: 600, margin: 0 }}>Member 2</h3>
              <span style={{ background: "rgba(248,113,113,0.15)", color: "#f87171", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>Required</span>
            </div>
            <div style={gridStyle}>
              <input name="member2_name" placeholder="Full Name" required style={inputStyle} />
              <input name="member2_usn" placeholder="USN" required style={inputStyle} />
              <input name="member2_email" placeholder="Email" type="email" required style={inputStyle} />
              <input name="member2_phone" placeholder="Phone Number" required style={inputStyle} />
              <select name="member2_semester" required style={selectStyle}>
                <option value="">Select Semester</option>
                {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
              <select name="member2_branch" required style={selectStyle}>
                <option value="">Select Branch</option>
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        )}
        
        {/* Member 3 - Required for BOTH Technoseek and Coding Relay */}
        {showTeamFields && (
          <div style={cardStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <h3 style={{ color: "#a5b4fc", fontSize: 14, fontWeight: 600, margin: 0 }}>Member 3</h3>
              <span style={{ background: "rgba(248,113,113,0.15)", color: "#f87171", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4 }}>Required</span>
            </div>
            <div style={gridStyle}>
              <input name="member3_name" placeholder="Full Name" required style={inputStyle} />
              <input name="member3_usn" placeholder="USN" required style={inputStyle} />
              <input name="member3_email" placeholder="Email" type="email" required style={inputStyle} />
              <input name="member3_phone" placeholder="Phone Number" required style={inputStyle} />
              <select name="member3_semester" required style={selectStyle}>
                <option value="">Select Semester</option>
                {SEMESTERS.map(s => <option key={s} value={s}>Semester {s}</option>)}
              </select>
              <select name="member3_branch" required style={selectStyle}>
                <option value="">Select Branch</option>
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = "linear-gradient(135deg, #4f46e5, #7c3aed)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #6366f1, #8b5cf6)"; }}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
              <span style={spinnerStyle} />
              Registering...
            </span>
          ) : (
            "Register Student"
          )}
        </button>
        
        {/* Result Message */}
        {result && (
          <div style={{
            padding: "14px 18px",
            borderRadius: 12,
            background: result.success ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            border: `1px solid ${result.success ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
            marginTop: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span>{result.success ? "✅" : "❌"}</span>
              <span style={{ color: result.success ? "#4ade80" : "#f87171", fontSize: 14 }}>
                {result.success ? "Registration successful!" : `Error: ${result.data.error}`}
              </span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

// Styles matching the admin panel theme
const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 16,
  padding: 24,
  marginBottom: 24,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  color: "#94a3b8",
  fontSize: 13,
  fontWeight: 500,
  marginBottom: 8,
  letterSpacing: "0.3px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "rgb(227, 228, 235)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  color: "#111213",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "rgb(227, 228, 235)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  color: "#162535",
  fontSize: 14,
  outline: "none",
  cursor: "pointer",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 16,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 24px",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  border: "none",
  borderRadius: 12,
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  transition: "all 0.2s",
  letterSpacing: "0.2px",
  boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
  marginTop: 8,
};

const spinnerStyle: React.CSSProperties = {
  display: "inline-block",
  width: 16,
  height: 16,
  border: "2px solid rgba(255,255,255,0.3)",
  borderTopColor: "#fff",
  borderRadius: "50%",
  animation: "spin 0.7s linear infinite",
};