export type Photo = {
  alt: string;
  height: number;
  objectPosition?: string;
  src: string;
  width: number;
};

export const photos: Photo[] = [
  {
    src: "/images/photos/web/street-portrait.webp",
    alt: "Gary Dacanay standing with a sunburst hollow-body guitar inside an ornate atrium.",
    width: 1467,
    height: 2200,
    objectPosition: "50% 30%",
  },
  {
    src: "/images/photos/web/grand-entrance.webp",
    alt: "Gary Dacanay leaping with a sunburst hollow-body guitar beneath an ornate glass ceiling.",
    width: 1467,
    height: 2200,
    objectPosition: "50% 44%",
  },
  {
    src: "/images/photos/web/guitar-portrait.webp",
    alt: "Gary Dacanay holding a sunburst hollow-body guitar outside a live music venue.",
    width: 1467,
    height: 2200,
    objectPosition: "50% 32%",
  },
  {
    src: "/images/photos/web/city-portrait.webp",
    alt: "Gary Dacanay posing with his guitar on a brick-paved city street.",
    width: 1467,
    height: 2200,
  },
  {
    src: "/images/photos/web/city-guitar-1.webp",
    alt: "Gary Dacanay smiling with his guitar outside a downtown venue.",
    width: 1467,
    height: 2200,
  },
  {
    src: "/images/photos/web/city-guitar-2.webp",
    alt: "Gary Dacanay holding his guitar upright on a city street.",
    width: 1467,
    height: 2200,
  },
  {
    src: "/images/photos/web/city-guitar-3.webp",
    alt: "Gary Dacanay holding his guitar in front of downtown buildings and string lights.",
    width: 1467,
    height: 2200,
  },
];
