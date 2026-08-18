import type { Metadata } from "next";
import { Suspense } from "react";
import { VideosView } from "../living-poster/VideosView";

export const metadata: Metadata = {
  title: "Videos | Gary Dacanay",
  description: "Watch live jazz performances by vocalist and guitarist Gary Dacanay.",
};

export default function VideosPage() {
  return (
    <Suspense fallback={null}>
      <VideosView />
    </Suspense>
  );
}
