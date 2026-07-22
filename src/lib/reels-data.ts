import reelPoster from "@/assets/reel-poster.jpg";

export type Reel = {
  id: string;
  lesson: string;
  title: string;
  summary: string;
  curator: string;
  duration: string;
  views: string;
  likes: string;
  category: string;
  poster: string;
  takeaways: { num: string; title: string; body: string }[];
};

export const reels: Reel[] = [
  {
    id: "atmospheric-depth",
    lesson: "Lesson 04",
    title: "Atmospheric Depth",
    summary: "Visual perspective in large-scale landscapes.",
    curator: "@qadsa",
    duration: "0:10",
    views: "2.1K",
    likes: "184",
    category: "Cinematography",
    poster: reelPoster,
    takeaways: [
      { num: "01", title: "Light Refraction", body: "How particle density changes perceived color at altitude." },
      { num: "02", title: "Scale Anchors", body: "Using focal peaks to give the viewer orientation." },
      { num: "03", title: "Aerial Perspective", body: "Distant objects lose contrast — cool blues push depth backward." },
    ],
  },
  {
    id: "compound-interest",
    lesson: "Lesson 12",
    title: "Compound Interest",
    summary: "Why time beats timing, in ten seconds flat.",
    curator: "@mira.fin",
    duration: "0:09",
    views: "8.4K",
    likes: "612",
    category: "Finance",
    poster: reelPoster,
    takeaways: [
      { num: "01", title: "Base Formula", body: "A = P(1 + r/n)^(nt) — memorize this shape." },
      { num: "02", title: "Time Wins", body: "Starting 10 years earlier beats doubling contribution." },
      { num: "03", title: "Reinvest", body: "Interest on interest is where the curve bends up." },
    ],
  },
  {
    id: "css-grid",
    lesson: "Lesson 07",
    title: "CSS Grid in 10s",
    summary: "grid-template-areas, the human-readable way.",
    curator: "@devnotes",
    duration: "0:10",
    views: "12.9K",
    likes: "1.1K",
    category: "Code",
    poster: reelPoster,
    takeaways: [
      { num: "01", title: "Areas", body: "Name your regions instead of counting columns." },
      { num: "02", title: "Auto-fit", body: "repeat(auto-fit, minmax(...)) = free responsiveness." },
      { num: "03", title: "Gap", body: "gap replaces margin hacks entirely." },
    ],
  },
  {
    id: "krebs-cycle",
    lesson: "Lesson 02",
    title: "Krebs Cycle",
    summary: "Eight steps, one loop, all your energy.",
    curator: "@bio.daily",
    duration: "0:10",
    views: "5.7K",
    likes: "402",
    category: "Biology",
    poster: reelPoster,
    takeaways: [
      { num: "01", title: "Acetyl-CoA", body: "The 2-carbon entry ticket into the cycle." },
      { num: "02", title: "NADH & FADH2", body: "Electron carriers feeding the transport chain." },
      { num: "03", title: "ATP Yield", body: "One turn = 3 NADH, 1 FADH2, 1 GTP." },
    ],
  },
  {
    id: "rule-of-thirds",
    lesson: "Lesson 01",
    title: "Rule of Thirds",
    summary: "Where the eye lands before the brain reads.",
    curator: "@frameworks",
    duration: "0:08",
    views: "22.3K",
    likes: "2.4K",
    category: "Photography",
    poster: reelPoster,
    takeaways: [
      { num: "01", title: "Grid", body: "Two vertical, two horizontal — four power points." },
      { num: "02", title: "Subject", body: "Place the eye on an intersection, not center." },
      { num: "03", title: "Horizon", body: "Never split the frame in half. Push up or down." },
    ],
  },
  {
    id: "stoic-morning",
    lesson: "Lesson 09",
    title: "Stoic Morning",
    summary: "Marcus Aurelius' pre-dawn priming, condensed.",
    curator: "@slowreads",
    duration: "0:10",
    views: "3.8K",
    likes: "298",
    category: "Philosophy",
    poster: reelPoster,
    takeaways: [
      { num: "01", title: "Premeditation", body: "Name the difficult people you'll meet today." },
      { num: "02", title: "Assent", body: "Choose your response before the moment arrives." },
      { num: "03", title: "Return", body: "Come back to the ruling faculty when you drift." },
    ],
  },
  {
    id: "kanban-flow",
    lesson: "Lesson 06",
    title: "Kanban Flow",
    summary: "WIP limits, and why fewer lanes ship faster.",
    curator: "@ops.lab",
    duration: "0:09",
    views: "1.9K",
    likes: "144",
    category: "Product",
    poster: reelPoster,
    takeaways: [
      { num: "01", title: "Limit WIP", body: "Cap in-progress to force finishing." },
      { num: "02", title: "Pull, don't push", body: "New work only starts when a slot opens." },
      { num: "03", title: "Cycle time", body: "Measure start-to-done, not effort." },
    ],
  },
  {
    id: "chord-inversions",
    lesson: "Lesson 03",
    title: "Chord Inversions",
    summary: "Same notes, different bass, whole new mood.",
    curator: "@keys.io",
    duration: "0:10",
    views: "4.6K",
    likes: "371",
    category: "Music",
    poster: reelPoster,
    takeaways: [
      { num: "01", title: "Root", body: "The default voicing — grounded, obvious." },
      { num: "02", title: "First Inversion", body: "Third in the bass = lighter, forward motion." },
      { num: "03", title: "Second Inversion", body: "Fifth in the bass = suspended, unstable." },
    ],
  },
  {
    id: "loss-aversion",
    lesson: "Lesson 15",
    title: "Loss Aversion",
    summary: "Losing $10 hurts twice as much as finding $10.",
    curator: "@behav.notes",
    duration: "0:10",
    views: "9.2K",
    likes: "807",
    category: "Psychology",
    poster: reelPoster,
    takeaways: [
      { num: "01", title: "Kahneman", body: "The 2:1 ratio that shapes most decisions." },
      { num: "02", title: "Framing", body: "'Save' vs 'don't lose' completely changes choice." },
      { num: "03", title: "Sunk Cost", body: "We keep bad plans running to avoid the loss." },
    ],
  },
];

export function getReel(id: string) {
  return reels.find((r) => r.id === id);
}
