import reelPoster from "@/assets/reel-poster.jpg";
import { reels } from "./reels-data";

export const profile = {
  name: "Farrukh Javeid",
  username: "fjaveid",
  location: "Rawalpindi, Pakistan",
  bio: "I am a human, I think.",
  initials: "FJ",
  followers: 4,
  following: 12,
  totalViews: "71.9K",
  links: [
    { label: "LinkedIn", href: "https://linkedin.com", kind: "linkedin" as const },
    { label: "Instagram", href: "#", kind: "instagram" as const },
    { label: "YouTube", href: "#", kind: "youtube" as const },
  ],
  featured: {
    id: reels[0].id,
    title: "Nature with Library URL",
    poster: reelPoster,
    duration: "0:10",
    views: "3.2K",
  },
  videos: reels.slice(0, 8),
};
