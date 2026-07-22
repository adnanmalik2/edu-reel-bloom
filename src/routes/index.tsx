import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutGrid,
  Search,
  Bell,
  Plus,
  Play,
  Flame,
  Sparkles,
  Clock,
  Heart,
} from "lucide-react";
import { reels } from "@/lib/reels-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ETIF — 10-second learning reels" },
      {
        name: "description",
        content:
          "Browse hundreds of 10-second learning reels. Tap any tile to open the full lesson viewer.",
      },
      { property: "og:title", content: "ETIF — 10-second learning reels" },
      {
        property: "og:description",
        content:
          "A feed of bite-size lessons. Tap a tile to open the vertical reel viewer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Feed,
});

const categories = [
  { label: "For You", icon: Sparkles, active: true },
  { label: "Trending", icon: Flame },
  { label: "New", icon: Clock },
  { label: "Liked", icon: Heart },
];

function Feed() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      {/* Header */}
      <nav className="h-16 border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-8 min-w-0">
          <span className="font-extrabold tracking-tighter text-xl">
            ETIF
            <span className="text-accent text-[10px] align-top ml-0.5 font-mono font-medium">
              LAB
            </span>
          </span>
          <div className="hidden md:flex gap-6 text-xs font-medium text-muted-foreground uppercase tracking-widest">
            <span className="text-foreground border-b-2 border-accent pb-[22px]">
              Discover
            </span>
            <a href="#" className="hover:text-foreground transition-colors">
              Following
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Library
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 mr-3 pr-3 border-r border-border">
            <IconBtn><LayoutGrid className="size-4" /></IconBtn>
            <IconBtn><Search className="size-4" /></IconBtn>
            <IconBtn><Bell className="size-4" /></IconBtn>
            <IconBtn><Plus className="size-4" /></IconBtn>
          </div>
          <div className="size-9 rounded-full bg-muted grid place-items-center text-xs font-bold ring-1 ring-border">
            F
          </div>
        </div>
      </nav>

      {/* Hero strip */}
      <header className="px-4 md:px-8 pt-8 pb-6 border-b border-border">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-2">
              LEARNING FEED / v03
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
              Ten seconds. <span className="text-accent">One idea.</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              Tap a reel to open the full lesson viewer with key takeaways.
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => (
              <button
                key={c.label}
                className={`h-9 px-4 rounded-sm text-xs font-mono uppercase tracking-widest border flex items-center gap-2 transition-colors ${
                  c.active
                    ? "bg-accent text-accent-foreground border-accent font-bold"
                    : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:border-foreground"
                }`}
              >
                <c.icon className="size-3.5" />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="px-4 md:px-8 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {reels.map((r, i) => (
            <ReelCard key={r.id} reel={r} featured={i === 0} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-4 flex flex-wrap gap-4 justify-between items-center border-t border-border">
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
          SYSTEM_ROOT // FEED_v03
        </span>
        <div className="flex gap-4 text-[10px] font-mono text-muted-foreground">
          <span>{reels.length} REELS LOADED</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-slow" />
            STREAMING_STABLE
          </span>
        </div>
      </footer>
    </div>
  );
}

function ReelCard({
  reel,
  featured,
}: {
  reel: (typeof reels)[number];
  featured?: boolean;
}) {
  return (
    <Link
      to="/reel/$id"
      params={{ id: reel.id }}
      className={`group relative block aspect-[3/5] overflow-hidden rounded-lg bg-muted ring-1 ring-border hover:ring-accent transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] ${
        featured ? "sm:col-span-2 sm:row-span-2 sm:aspect-auto" : ""
      }`}
    >
      <img
        src={reel.poster}
        alt={reel.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />

      {/* Top row: category + duration */}
      <div className="absolute top-2 left-2 right-2 flex items-start justify-between gap-2">
        <span className="bg-accent text-accent-foreground px-1.5 py-0.5 text-[9px] font-mono font-bold tracking-tight uppercase rounded-sm">
          {reel.category}
        </span>
        <span className="bg-black/60 backdrop-blur-md text-white/90 px-1.5 py-0.5 text-[9px] font-mono rounded-sm">
          {reel.duration}
        </span>
      </div>

      {/* Play glyph on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="size-12 rounded-full bg-accent/90 backdrop-blur-md grid place-items-center shadow-[0_0_30px_var(--accent)]">
          <Play className="size-5 text-accent-foreground ml-0.5" fill="currentColor" />
        </div>
      </div>

      {/* Bottom: title + curator */}
      <div className="absolute bottom-0 inset-x-0 p-3">
        <p className="text-[9px] font-mono uppercase tracking-widest text-accent mb-1">
          {reel.lesson}
        </p>
        <h3 className={`font-bold tracking-tight text-white leading-tight ${featured ? "text-lg md:text-xl" : "text-sm"}`}>
          {reel.title}
        </h3>
        <div className="flex items-center justify-between mt-2 text-[10px] font-mono text-white/70">
          <span className="truncate">{reel.curator}</span>
          <span className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1">
              <Heart className="size-3" />
              {reel.likes}
            </span>
            <span>{reel.views}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="size-9 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
      {children}
    </button>
  );
}
