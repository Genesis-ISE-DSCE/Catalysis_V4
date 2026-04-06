import React, { useState } from "react";
import { Participant, Member } from "./ParticipantsClient";
import { EVENT_IDS, EVENT_LABELS, BRANCHES, COLLEGES } from "@/lib/formConstants";

interface EditModalProps {
  participant: Participant;
  onClose: () => void;
  onSave: (updated: Participant) => void;
}

export default function EditModal({ participant, onClose, onSave }: EditModalProps) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    team_name: participant.team_name || "",
    event: participant.event,
    member1: { ...participant.member1 },
    member2: { ...participant.member2 },
    member3: { ...participant.member3 },
  });

  const handleMemberChange = (memberNum: "member1" | "member2" | "member3", field: keyof Member, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [memberNum]: {
        ...prev[memberNum],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload: Partial<typeof formData> = { ...formData };
    if (!formData.member2.name && !formData.member2.usn) delete payload.member2;
    if (!formData.member3.name && !formData.member3.usn) delete payload.member3;

    try {
      const res = await fetch(`/api/admin/participants/${participant._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        onSave(data.participant);
      } else {
        alert("Failed to update participant");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 999,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16,
    }} onClick={onClose}>
      <div
        style={{
          background: "#131830", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20, width: "100%", maxWidth: 650, maxHeight: "90vh",
          display: "flex", flexDirection: "column",
          boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ padding: "24px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ color: "#f1f5f9", margin: 0, fontSize: 20, fontWeight: 700 }}>Edit Registration</h2>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: 24 }}>&times;</button>
        </div>

        <div style={{ padding: "24px 32px", overflowY: "auto", flex: 1 }}>
          <form id="edit-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={labelStyle}>Event</label>
                <select
                  value={formData.event}
                  onChange={(e) => setFormData({...formData, event: e.target.value})}
                  style={inputStyle}
                  required
                >
                  {EVENT_IDS.map(e => (
                    <option key={e} value={e}>{EVENT_LABELS[e]}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Team Name (Optional)</label>
                <input
                  type="text"
                  value={formData.team_name}
                  onChange={(e) => setFormData({...formData, team_name: e.target.value})}
                  style={inputStyle}
                />
              </div>
            </div>

            {(["member1", "member2", "member3"] as const).map((m, i) => (
              <div key={m} style={{ background: "rgba(255,255,255,0.03)", padding: 20, borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                <h4 style={{ color: "#a5b4fc", margin: "0 0 16px", fontSize: 13, textTransform: "uppercase", letterSpacing: "1px" }}>
                  Member {i + 1} {i === 0 ? "(Lead Required)" : "(Optional)"}
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <input placeholder="Name" value={formData[m].name || ""} onChange={(e) => handleMemberChange(m, "name", e.target.value)} style={inputStyle} required={i===0} />
                  <input placeholder="USN" value={formData[m].usn || ""} onChange={(e) => handleMemberChange(m, "usn", e.target.value)} style={inputStyle} required={i===0} />
                  <input placeholder="Email" type="email" value={formData[m].email || ""} onChange={(e) => handleMemberChange(m, "email", e.target.value)} style={inputStyle} required={i===0} />
                  <input placeholder="Phone" value={formData[m].phone || ""} onChange={(e) => handleMemberChange(m, "phone", e.target.value)} style={inputStyle} required={i===0} />
                  <select value={formData[m].semester || ""} onChange={(e) => handleMemberChange(m, "semester", parseInt(e.target.value))} style={inputStyle} required={i===0}>
                    <option value="">Semester</option>
                    {["1","2","3","4","5","6","7","8"].map(s => <option key={s} value={s}>Semester {s}</option>)}
                  </select>
                  <select value={formData[m].college || ""} onChange={(e) => handleMemberChange(m, "college", e.target.value)} style={inputStyle} required={i===0}>
                    <option value="">College</option>
                    {COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <select value={formData[m].branch || ""} onChange={(e) => handleMemberChange(m, "branch", e.target.value)} style={{ ...inputStyle, gridColumn: "1 / -1" }} required={i===0}>
                    <option value="">Branch</option>
                    {BRANCHES.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </form>
        </div>

        <div style={{ padding: "20px 32px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button type="button" onClick={onClose} disabled={saving} style={{ ...btnStyle, background: "rgba(255,255,255,0.06)", color: "#a5b4fc" }}>
            Cancel
          </button>
          <button type="submit" form="edit-form" disabled={saving} style={{ ...btnStyle, background: "rgba(99,102,241,0.2)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.4)" }}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", color: "#64748b", fontSize: 12, fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" };
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#f1f5f9",
  fontSize: 14, outline: "none", boxSizing: "border-box"
};
const btnStyle: React.CSSProperties = {
  padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600,
  cursor: "pointer", border: "1px solid transparent", transition: "all 0.15s"
};
