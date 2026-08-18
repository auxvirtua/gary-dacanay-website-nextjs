import type { Metadata } from "next";
import { PhotosView } from "../living-poster/PhotosView";

export const metadata: Metadata = {
  title: "Photos | Gary Dacanay",
  description: "Portrait and performance photography of jazz vocalist and guitarist Gary Dacanay.",
};

export default function PhotosPage() {
  return <PhotosView />;
}
