import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
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
import { getReel, reels } from "@/lib/reels-data";

export const Route = createFileRoute("/reel/$id")({
  head: ({ params }) => {
    const reel = getReel(params.id);
    const title = reel ? `${reel.title} — ETIF` : "Reel — ETIF";
    const desc = reel?.summary ?? "A 10-second learning reel on ETIF.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "video.other" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  loader: ({ params }) => {
    const reel = getReel(params.id);
    if (!reel) throw notFound();
    return { reel };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-background text-foreground p-6">
      <div className="text-center">
        <p className="text-[10px] font-mono uppercase tracking-widest text-accent mb-2">
          404 / REEL
        </p>
        <h1 className="text-2xl font-bold mb-4">Reel not found</h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 h-10 px-4 bg-accent text-accent-foreground text-xs font-mono uppercase tracking-widest font-bold rounded-sm"
        >
          <ArrowLeft className="size-4" /> Back to feed
        </Link>
      </div>
    </div>
  ),
  component: ReelView,
});

function ReelView() {
  const { reel } = Route.useLoaderData();
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);

  const idx = reels.findIndex((r) => r.id === reel.id);
  const prev = reels[(idx - 1 + reels.length) % reels.length];
  const next = reels[(idx + 1) % reels.length];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent/30">
      {/* Header */}
      <nav className="h-16 border-b border-border px-4 md:px-6 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Feed
          </Link>
          <span className="hidden md:inline text-border">/</span>
          <span className="hidden md:inline text-[10px] font-mono uppercase tracking-widest text-muted-foreground truncate">
            {reel.category} · {reel.lesson}
          </span>
        </div>
        <span className="font-extrabold tracking-tighter text-lg">
          ETIF
          <span className="text-accent text-[10px] align-top ml-0.5 font-mono font-medium">
            LAB
          </span>
        </span>
      </nav>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="flex flex-col lg:flex-row h-auto lg:h-[min(820px,calc(100vh-8rem))] gap-px bg-border ring-1 ring-border rounded-2xl overflow-hidden shadow-2xl animate-enter max-w-full">
          {/* Reel Core */}
          <div className="relative aspect-[3/5] h-[min(820px,calc(100vh-8rem))] max-h-[820px] bg-black group shrink-0">
            <img
              src={reel.poster}
              alt={`${reel.title} — ${reel.summary}`}
              width={768}
              height={1280}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-5 left-5 flex flex-col gap-2 pointer-events-none max-w-[85%]">
              <div className="bg-accent text-accent-foreground px-2.5 py-1 text-[10px] font-mono font-bold tracking-tight uppercase rounded-sm animate-pulse-slow w-fit">
                {reel.lesson} · {reel.title}
              </div>
              <div className="bg-black/40 backdrop-blur-md px-2.5 py-1.5 text-[11px] font-mono text-white/90 border-l-2 border-accent w-fit">
                {reel.summary}
              </div>
            </div>

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

            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: "34%", boxShadow: "0 0 12px var(--accent)" }}
              />
            </div>
          </div>

          {/* Context Rail */}
          <aside className="w-full lg:w-[340px] bg-background flex flex-col">
            <div className="p-5 border-b border-border flex items-center gap-3">
              <div className="size-10 rounded-lg bg-muted grid place-items-center text-sm font-mono font-bold border border-border shrink-0">
                {reel.curator.replace("@", "").charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-0.5">
                  Curator
                </p>
                <p className="text-sm font-bold truncate tracking-tight">
                  {reel.curator}
                </p>
              </div>
              <button className="px-3 h-8 text-[10px] font-mono uppercase tracking-widest bg-accent text-accent-foreground font-bold rounded-sm hover:brightness-110 transition shrink-0">
                Follow
              </button>
            </div>

            <div className="grid grid-cols-4 border-b border-border">
              <MetricBtn
                active={liked}
                onClick={() => setLiked((v) => !v)}
                icon={
                  <Heart
                    className={`size-4 ${liked ? "fill-accent text-accent" : ""}`}
                  />
                }
                value={liked ? String(Number(reel.likes.replace(/[^0-9]/g, "")) + 1) : reel.likes}
                divider
              />
              <MetricBtn icon={<MessageSquare className="size-4" />} value="12" divider />
              <MetricBtn icon={<Flag className="size-4" />} value="Flag" divider />
              <MetricBtn value={reel.views} icon={<EyeGlyph />} label="views" />
            </div>

            <div className="flex-1 p-6 flex flex-col overflow-y-auto">
              <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-6">
                Key Takeaways
              </h3>
              <div className="space-y-6">
                {reel.takeaways.map((t) => (
                  <Takeaway key={t.num} {...t} />
                ))}
              </div>
            </div>

            <Link
              to="/reel/$id"
              params={{ id: next.id }}
              className="grid grid-cols-[1fr_auto] border-t border-border"
            >
              <div className="h-14 bg-accent text-accent-foreground font-bold text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-colors flex items-center justify-center">
                Next: {next.title} →
              </div>
              <div className="flex border-l border-border">
                <Link
                  to="/reel/$id"
                  params={{ id: prev.id }}
                  aria-label="Previous"
                  className="w-12 grid place-items-center hover:bg-muted transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChevronUp className="size-4" />
                </Link>
                <Link
                  to="/reel/$id"
                  params={{ id: next.id }}
                  aria-label="Next"
                  className="w-12 grid place-items-center border-l border-border hover:bg-muted transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChevronDown className="size-4" />
                </Link>
              </div>
            </Link>
          </aside>
        </div>
      </main>

      <footer className="px-8 py-4 flex flex-wrap gap-4 justify-between items-center border-t border-border">
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
          SYSTEM_ROOT // REEL / {reel.id.toUpperCase()}
        </span>
        <div className="flex gap-4 text-[10px] font-mono text-muted-foreground">
          <span>720P / {reel.duration}</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-accent animate-pulse-slow" />
            STREAMING_STABLE
          </span>
        </div>
      </footer>
    </div>
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

function Takeaway({ num, title, body }: { num: string; title: string; body: string }) {
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
