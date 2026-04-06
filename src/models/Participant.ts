import mongoose, { Schema, Document } from "mongoose";
import { COLLEGES } from "@/lib/formConstants";

export type EventName = "technoseek" | "typemaster" | "clash_royale" | "coding_relay" | "dsa_smackdown" | "pitch_perfect";

export const TEAM_EVENTS: EventName[] = ["technoseek", "coding_relay"];

interface Member {
  name: string;
  usn: string;
  email: string;
  phone: string;
  semester: number;
  branch: string;
  college: string;
}

export interface IParticipant extends Document {
  team_name: string;
  event: EventName;
  member1: Member;
  member2?: Partial<Member>;
  member3?: Partial<Member>;
  registeredAt: Date;
}

const MemberSchema = new Schema<Member>({
  name: { type: String },
  usn: { type: String },
  email: { type: String },
  phone: { type: String },
  semester: { type: Number },
  branch: { type: String },
  college: { type: String, enum: [...COLLEGES] },
});

const ParticipantSchema = new Schema<IParticipant>({
  team_name: { type: String, default: "" },
  event: {
    type: String,
    enum: ["technoseek","typemaster","clash_royale","coding_relay","dsa_smackdown","pitch_perfect"],
    required: true
  },
  member1: { type: MemberSchema, required: true },
  member2: { type: MemberSchema, default: {} },
  member3: { type: MemberSchema, default: {} },
  registeredAt: { type: Date, default: Date.now },
});

export default mongoose.models.Participant || mongoose.model<IParticipant>("Participant", ParticipantSchema);