"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

export default function HelpDeskForm() {

  type RegistrationResult = {
    success: boolean;
    data: { error?: string; message?: string };
  };

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RegistrationResult | null>(null);  const [selectedEvent, setSelectedEvent] = useState("");
  const [showTeamFields, setShowTeamFields] = useState(false);

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const event = e.target.value;
    setSelectedEvent(event);
    setShowTeamFields(TEAM_EVENTS.includes(event));
  };

  const handleLogout = async () => {
    await fetch("/api/helpdesk/logout", { method: "POST" });
    router.push("/helpdesk/login");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    const formData = new FormData(e.currentTarget);
    const event = formData.get("event") as string;
    const isTeam = TEAM_EVENTS.includes(event);
    
    type MemberData = {
      name: FormDataEntryValue | null;
      usn: FormDataEntryValue | null;
      email: FormDataEntryValue | null;
      phone: FormDataEntryValue | null;
      semester: number;
      branch: FormDataEntryValue | null;
    };

    type RegistrationPayload = {
      event: string;
      team_name: string;
      member1: MemberData;
      member2?: MemberData;
      member3?: MemberData;
    };

    const data: RegistrationPayload = {
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
      const res = await fetch("/api/helpdesk/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      let responseData;
      try {
        responseData = await res.json();
      } catch {
        responseData = { message: "Registration successful" };
      }
      
      if (res.ok) {
        setResult({ success: true, data: responseData });
        (e.target as HTMLFormElement).reset();
        setSelectedEvent("");
        setShowTeamFields(false);
      } else {
        setResult({ 
          success: false, 
          data: { error: responseData.error || "Registration failed" } 
        });
      }
    } catch (error) {
      console.error("Network error:", error);
      setResult({ 
        success: false, 
        data: { error: "Network error. Please try again." } 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "#f1f5f9", fontSize: 28, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.5px" }}>
            Help Desk Registration
          </h1>
          <p style={{ color: "#475569", fontSize: 14, margin: 0 }}>
            Quickly register students for Catalysis events
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            background: "rgba(239,68,68,0.15)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 8,
            color: "#f87171",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div style={cardStyle}>
          <label style={labelStyle}>Select Event <span style={{ color: "#f87171" }}>*</span></label>
          <select name="event" required value={selectedEvent} onChange={handleEventChange} style={selectStyle}>
            <option value="">-- Select an event --</option>
            {[...SOLO_EVENTS, ...TEAM_EVENTS].map(event => (
              <option key={event} value={event}>{EVENT_LABELS[event]}</option>
            ))}
          </select>
          
          {showTeamFields && (
            <div style={{ marginTop: 12, padding: "12px 16px", background: "rgba(99,102,241,0.1)", borderRadius: 8 }}>
              <p style={{ color: "#818cf8", fontSize: 13, margin: 0 }}>⚠️ Team event - register all 3 members together</p>
            </div>
          )}
        </div>
        
        {showTeamFields && (
          <div style={cardStyle}>
            <label style={labelStyle}>Team Name <span style={{ color: "#f87171" }}>*</span></label>
            <input name="team_name" type="text" required placeholder="e.g., Code Warriors" style={inputStyle} />
          </div>
        )}
        
        <div style={cardStyle}>
          <div style={{ marginBottom: 16 }}><h3 style={{ color: "#a5b4fc", margin: 0 }}>Member 1 (Team Lead) <span style={{ color: "#f87171" }}>*</span></h3></div>
          <div style={gridStyle}>
            <input name="member1_name" placeholder="Full Name" required style={inputStyle} />
            <input name="member1_usn" placeholder="USN" required style={inputStyle} />
            <input name="member1_email" placeholder="Email" type="email" required style={inputStyle} />
            <input name="member1_phone" placeholder="Phone" required style={inputStyle} />
            <select name="member1_semester" required style={selectStyle}>
              <option value="">Semester</option>
              {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select name="member1_branch" required style={selectStyle}>
              <option value="">Branch</option>
              {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
        
        {showTeamFields && (
          <div style={cardStyle}>
            <div style={{ marginBottom: 16 }}><h3 style={{ color: "#a5b4fc", margin: 0 }}>Member 2 <span style={{ color: "#f87171" }}>*</span></h3></div>
            <div style={gridStyle}>
              <input name="member2_name" placeholder="Full Name" required style={inputStyle} />
              <input name="member2_usn" placeholder="USN" required style={inputStyle} />
              <input name="member2_email" placeholder="Email" type="email" required style={inputStyle} />
              <input name="member2_phone" placeholder="Phone" required style={inputStyle} />
              <select name="member2_semester" required style={selectStyle}>
                <option value="">Semester</option>
                {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select name="member2_branch" required style={selectStyle}>
                <option value="">Branch</option>
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        )}
        
        {showTeamFields && (
          <div style={cardStyle}>
            <div style={{ marginBottom: 16 }}><h3 style={{ color: "#a5b4fc", margin: 0 }}>Member 3 <span style={{ color: "#f87171" }}>*</span></h3></div>
            <div style={gridStyle}>
              <input name="member3_name" placeholder="Full Name" required style={inputStyle} />
              <input name="member3_usn" placeholder="USN" required style={inputStyle} />
              <input name="member3_email" placeholder="Email" type="email" required style={inputStyle} />
              <input name="member3_phone" placeholder="Phone" required style={inputStyle} />
              <select name="member3_semester" required style={selectStyle}>
                <option value="">Semester</option>
                {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select name="member3_branch" required style={selectStyle}>
                <option value="">Branch</option>
                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
        )}
        
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Registering..." : "Register Student"}
        </button>
        
        {result && (
          <div style={{
            padding: "12px 16px",
            borderRadius: 12,
            marginTop: 20,
            background: result.success ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            border: `1px solid ${result.success ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}>
            <span style={{ 
              color: result.success ? "#4ade80" : "#f87171",
              flex: 1,
              fontSize: 14,
            }}>
              {result.success ? "✅ Registration successful!" : `❌ Error: ${result.data.error}`}
            </span>
            <button
              onClick={() => setResult(null)}
              style={{
                background: "transparent",
                border: "none",
                color: result.success ? "#4ade80" : "#f87171",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                transition: "all 0.2s",
                opacity: 0.7,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.background = result.success ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.7";
                e.currentTarget.style.background = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

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
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  color: "#f1f5f9",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: 8,
  color: "#f1f5f9",
  fontSize: 14,
  fontWeight: 500,
  outline: "none",
  cursor: "pointer",
  transition: "all 0.2s ease",
  fontFamily: "inherit",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  backgroundSize: "16px",
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 16,
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 24px",
  background: "linear-gradient(135deg, #22c55e, #16a34a)",
  border: "none",
  borderRadius: 12,
  color: "#fff",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8,
};