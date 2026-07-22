import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutGrid,
  Search,
  Bell,
  Plus,
  Heart,
  MessageSquare,
  Flag,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import reelPoster from "@/assets/reel-poster.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ETIF — Learn in 10-second reels" },
      {
        name: "description",
        content:
          "ETIF is a short-form learning platform. Watch 10-second lessons from expert creators and level up between scrolls.",
      },
      { property: "og:title", content: "ETIF — Learn in 10-second reels" },
      {
        property: "og:description",
        content:
          "Short-form learning reels. 10 seconds. One idea. Endless curiosity.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent/30">
      {/* Header */}
      <nav className="h-16 border-b border-border px-6 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-8 min-w-0">
          <span className="font-extrabold tracking-tighter text-xl">
            ETIF
            <span className="text-accent text-[10px] align-top ml-0.5 font-mono font-medium">
              LAB
            </span>
          </span>
          <div className="hidden md:flex gap-6 text-xs font-medium text-muted-foreground uppercase tracking-widest">
            <a href="#" className="hover:text-foreground transition-colors">
              Discover
            </a>
            <a href="#" className="text-foreground border-b-2 border-accent pb-[22px]">
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

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[min(820px,calc(100vh-8rem))] gap-px bg-border ring-1 ring-border rounded-2xl overflow-hidden shadow-2xl animate-enter max-w-full">
          {/* Reel Core */}
          <div className="relative aspect-[3/5] h-[min(820px,calc(100vh-8rem))] max-h-[820px] bg-black group shrink-0">
            <img
              src={reelPoster}
              alt="Aerial view of clouds over mountain peaks — Atmospheric Depth lesson"
              width={768}
              height={1280}
              className="w-full h-full object-cover"
            />

            {/* Learning signal */}
            <div className="absolute top-5 left-5 flex flex-col gap-2 pointer-events-none max-w-[85%]">
              <div className="bg-accent text-accent-foreground px-2.5 py-1 text-[10px] font-mono font-bold tracking-tight uppercase rounded-sm animate-pulse-slow w-fit">
                Lesson 04 · Atmospheric Depth
              </div>
              <div className="bg-black/40 backdrop-blur-md px-2.5 py-1.5 text-[11px] font-mono text-white/90 border-l-2 border-accent w-fit">
                Visual perspective in large-scale landscapes.
              </div>
            </div>

            {/* Playback controls (center on hover) */}
            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause" : "Play"}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="size-16 rounded-full bg-black/50 backdrop-blur-md border border-white/15 grid place-items-center">
                {playing ? (
                  <Pause className="size-6 text-white" />
                ) : (
                  <Play className="size-6 text-white ml-0.5" />
                )}
              </div>
            </button>

            {/* Sound toggle */}
            <button
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute" : "Mute"}
              className="absolute bottom-6 right-5 size-10 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 grid place-items-center hover:bg-black/70 transition active:scale-95"
            >
              {muted ? (
                <VolumeX className="size-4 text-white" />
              ) : (
                <Volume2 className="size-4 text-white" />
              )}
            </button>

            {/* Progress */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: "34%", boxShadow: "0 0 12px var(--accent)" }}
              />
            </div>
          </div>

          {/* Context Rail */}
          <aside className="w-full lg:w-[340px] bg-background flex flex-col">
            {/* Author */}
            <div className="p-5 border-b border-border flex items-center gap-3">
              <div className="size-10 rounded-lg bg-muted grid place-items-center text-sm font-mono font-bold border border-border shrink-0">
                Q
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">
                  Curator
                </p>
                <p className="text-sm font-bold truncate tracking-tight">
                  @qadsa
                </p>
              </div>
              <button className="px-3 h-8 text-[10px] font-mono uppercase tracking-widest bg-accent text-accent-foreground font-bold rounded-sm hover:brightness-110 transition shrink-0">
                Follow
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-4 border-b border-border">
              <MetricBtn
                active={liked}
                onClick={() => setLiked((v) => !v)}
                icon={
                  <Heart
                    className={`size-4 ${liked ? "fill-accent text-accent" : ""}`}
                  />
                }
                value={liked ? "4" : "3"}
                divider
              />
              <MetricBtn
                icon={<MessageSquare className="size-4" />}
                value="2"
                divider
              />
              <MetricBtn icon={<Flag className="size-4" />} value="Flag" divider />
              <MetricBtn value="2" icon={<EyeGlyph />} label="views" />
            </div>

            {/* Learning breakdown */}
            <div className="flex-1 p-6 flex flex-col overflow-y-auto">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Key Takeaways
              </h3>
              <div className="space-y-6">
                <Takeaway
                  num="01"
                  title="Light Refraction"
                  body="How particle density changes perceived color at altitude."
                />
                <Takeaway
                  num="02"
                  title="Scale Anchors"
                  body="Using focal peaks to give the viewer orientation."
                />
                <Takeaway
                  num="03"
                  title="Aerial Perspective"
                  body="Distant objects lose contrast — cool blues push depth backward."
                />
              </div>

              <div className="mt-auto pt-6">
                <div className="bg-accent/10 border border-accent/25 rounded p-4">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-mono text-accent tracking-widest">
                      ARCHIVE_014
                    </span>
                    <span className="text-[10px] font-mono text-accent/70">
                      2 VIEWS
                    </span>
                  </div>
                  <div className="h-1 bg-accent/20 rounded-full overflow-hidden">
                    <div className="w-[8%] h-full bg-accent rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Action footer */}
            <div className="grid grid-cols-[1fr_auto] border-t border-border">
              <button className="h-14 bg-accent text-accent-foreground font-bold text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-colors">
                Next Lesson →
              </button>
              <div className="flex border-l border-border">
                <button
                  aria-label="Previous"
                  className="w-12 grid place-items-center hover:bg-muted transition-colors"
                >
                  <ChevronUp className="size-4" />
                </button>
                <button
                  aria-label="Next"
                  className="w-12 grid place-items-center border-l border-border hover:bg-muted transition-colors"
                >
                  <ChevronDown className="size-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer breadcrumb */}
      <footer className="px-8 py-4 flex flex-wrap gap-4 justify-between items-center border-t border-border">
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
          SYSTEM_ROOT // LEARNING_REEL_v03
        </span>
        <div className="flex gap-4 text-[10px] font-mono text-muted-foreground">
          <span>720P / 10S</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-slow" />
            STREAMING_STABLE
          </span>
        </div>
      </footer>
    </div>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="size-9 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
      {children}
    </button>
  );
}

function MetricBtn({
  icon,
  value,
  label,
  divider,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  value: string;
  label?: string;
  divider?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-20 flex flex-col items-center justify-center gap-1.5 transition-all hover:bg-muted hover:text-accent ${
        divider ? "border-r border-border" : ""
      } ${active ? "text-accent" : "text-foreground"}`}
    >
      <span className="opacity-80">{icon}</span>
      <span className="font-mono text-xs font-medium">
        {value}
        {label ? (
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground ml-1">
            {label}
          </span>
        ) : null}
      </span>
    </button>
  );
}

function Takeaway({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="group cursor-default">
      <div className="flex items-center gap-3 mb-1.5">
        <span className="text-accent font-mono text-xs">{num}</span>
        <h4 className="text-xs font-bold uppercase tracking-wide">{title}</h4>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed pl-7 group-hover:text-foreground/80 transition-colors">
        {body}
      </p>
    </div>
  );
}

function EyeGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
