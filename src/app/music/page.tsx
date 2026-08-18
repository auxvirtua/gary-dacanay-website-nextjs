import type { Metadata } from "next";
import { MusicView } from "../living-poster/MusicView";

export const metadata: Metadata = {
  title: "Music | Gary Dacanay",
  description: "Listen to featured recordings by jazz vocalist and guitarist Gary Dacanay.",
};

export default function MusicPage() {
  return <MusicView />;
}
