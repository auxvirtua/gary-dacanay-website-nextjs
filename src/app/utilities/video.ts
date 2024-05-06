import { VideoQuality } from "../enums";

export default function getVideoThumbnail(
  videoId: string,
  quality: VideoQuality,
) {
  // iterate through the quality options
  // and return the first one that is available
  // in the order of max, high, medium, low
  // if none are available, return null

  const qualities = Object.values(VideoQuality);
  const index = qualities.indexOf(quality);

  for (let i = index; i < qualities.length; i++) {
    const quality = qualities[i];
    const thumbnail = `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
    return thumbnail;
  }

  return null; // Return null if no thumbnail is found
}

export { getVideoThumbnail };
