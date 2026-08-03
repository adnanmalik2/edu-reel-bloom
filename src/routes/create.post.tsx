import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  UploadCloud,
  ArrowLeft,
  Check,
  Clock,
  Film,
  Sparkles,
  Link2,
  Library,
  Ban,
  X,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { SiteNav } from "@/components/site-nav";
import { categoryGroups } from "@/lib/categories";

export const Route = createFileRoute("/create/post")({
  head: () => ({
    meta: [
      { title: "Create a post — ETIF Lab" },
      {
        name: "description",
        content:
          "Upload a 10-second learning clip, add a caption, pick a category and attach a call to action.",
      },
      { property: "og:title", content: "Create a post — ETIF Lab" },
      {
        property: "og:description",
        content: "Share a 10-second lesson with the ETIF Lab community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreatePost,
});

const MIN = 9.8;
const MAX = 10.2;

function CreatePost() {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);

  function accept(f: File) {
    if (!f.type.startsWith("video/")) {
      setError("That file isn't a video. Upload an MP4, MOV or WebM clip.");
      return;
    }
    setError(null);
    setDuration(null);
    setFile(f);
  }

  function reset() {
    setFile(null);
    setUrl(null);
    setDuration(null);
    setError(null);
  }

  return (
    <div className="min-h-screen text-foreground">
      <SiteNav active="Create" />
      {!file ? (
        <UploadStage onFile={accept} error={error} />
      ) : (
        <ComposerStage
          url={url}
          duration={duration}
          onDuration={setDuration}
          onBack={reset}
          fileName={file.name}
        />
      )}
    </div>
  );
}

/* ---------------- Step 1 — upload ---------------- */

function UploadStage({
  onFile,
  error,
}: {
  onFile: (f: File) => void;
  error: string | null;
}) {
  const [drag, setDrag] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  return (
    <main className="px-4 md:px-8 py-10 max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-2">
          NEW POST / STEP 1 OF 2
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
          Teach something in <span className="text-accent">ten seconds.</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-lg">
          One idea per clip. Clips must run between {MIN}s and {MAX}s — that
          constraint is what keeps the feed sharp.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
        <button
          type="button"
          onClick={() => input.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            const f = e.dataTransfer.files?.[0];
            if (f) onFile(f);
          }}
          className={`w-full relative overflow-hidden rounded-2xl border-2 border-dashed p-10 md:p-16 text-center transition-all group ${
            drag
              ? "border-accent bg-accent/10 scale-[1.01]"
              : "border-border bg-card/60 hover:border-accent/60 hover:bg-card"
          }`}
        >
          <span
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 0%, var(--bg-glow-a), transparent 70%)",
            }}
          />
          <span className="relative block">
            <span className="mx-auto mb-6 grid size-20 place-items-center rounded-2xl bg-accent/15 text-accent ring-1 ring-accent/30 group-hover:scale-105 transition-transform">
              <UploadCloud className="size-9" />
            </span>
            <span className="block text-xl md:text-2xl font-extrabold tracking-tight">
              Drag your clip here
            </span>
            <span className="block text-sm text-muted-foreground mt-1">
              or click to browse your files
            </span>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <Clock className="size-3" />
              10-second videos only ({MIN}s–{MAX}s)
            </span>
            <span className="mt-4 block text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
              MP4 · MOV · WEBM · max 100MB · vertical 3:5
            </span>
          </span>
          <input
            ref={input}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
              e.currentTarget.value = "";
            }}
          />
        </button>

        <aside className="rounded-2xl border border-border bg-card/60 p-5 space-y-5">
          <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            What performs here
          </p>
          {[
            {
              icon: Sparkles,
              title: "Lead with the payoff",
              body: "Say the insight in the first second — no intros.",
            },
            {
              icon: Film,
              title: "Shoot vertical",
              body: "3:5 fills the player. Anything else gets letterboxed.",
            },
            {
              icon: Check,
              title: "One idea only",
              body: "Split multi-part topics into separate clips.",
            },
          ].map((t) => (
            <div key={t.title} className="flex gap-3">
              <span className="size-8 shrink-0 grid place-items-center rounded-md bg-accent/15 text-accent">
                <t.icon className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">{t.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {t.body}
                </p>
              </div>
            </div>
          ))}
          <div className="pt-4 border-t border-border">
            <Link
              to="/create/list"
              className="flex items-center justify-between text-xs font-medium hover:text-accent transition-colors"
            >
              Grouping existing clips? Create a list
              <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </aside>
      </div>

      {error && (
        <p className="mt-4 text-xs font-mono text-destructive">{error}</p>
      )}
    </main>
  );
}

/* ---------------- Step 2 — composer ---------------- */

type Cta = "none" | "library" | "custom";

function ComposerStage({
  url,
  duration,
  onDuration,
  onBack,
  fileName,
}: {
  url: string | null;
  duration: number | null;
  onDuration: (d: number) => void;
  onBack: () => void;
  fileName: string;
}) {
  const [caption, setCaption] = useState("");
  const [group, setGroup] = useState<string | null>(null);
  const [sub, setSub] = useState<string | null>(null);
  const [cta, setCta] = useState<Cta>("none");
  const [ctaUrl, setCtaUrl] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");

  const valid = duration !== null && duration >= MIN && duration <= MAX;
  const canShare = Boolean(sub) && valid;
  const activeGroup = categoryGroups.find((g) => g.group === group);

  return (
    <main className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Replace clip
        </button>
        <div className="hidden sm:block text-[10px] font-mono uppercase tracking-[0.25em] text-accent">
          NEW POST / STEP 2 OF 2
        </div>
        <button
          disabled={!canShare}
          onClick={() =>
            toast.success("Post shared", {
              description: `${group} => ${sub} · ${duration?.toFixed(1)}s`,
            })
          }
          className="h-10 px-6 rounded-md text-xs font-mono font-bold uppercase tracking-widest bg-accent text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[var(--shadow-accent)] transition-shadow"
        >
          Share
        </button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-6 items-start">
        {/* Preview */}
        <div className="lg:sticky lg:top-24 space-y-3">
          <div className="relative aspect-[3/5] overflow-hidden rounded-2xl bg-muted ring-1 ring-border">
            {url && (
              <video
                src={url}
                controls
                playsInline
                className="absolute inset-0 size-full object-cover"
                onLoadedMetadata={(e) =>
                  onDuration(e.currentTarget.duration || 0)
                }
              />
            )}
            <span className="pointer-events-none absolute top-2 left-2 rounded-sm bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-[9px] font-mono text-white/90">
              3:5 PREVIEW
            </span>
          </div>
          <div
            className={`flex items-center justify-between rounded-md px-3 py-2 text-[10px] font-mono uppercase tracking-widest ring-1 ${
              duration === null
                ? "bg-muted text-muted-foreground ring-border"
                : valid
                  ? "bg-accent/15 text-foreground ring-accent/40"
                  : "bg-destructive/10 text-destructive ring-destructive/30"
            }`}
          >
            <span className="truncate">{fileName}</span>
            <span className="flex items-center gap-1.5 shrink-0">
              {duration === null ? (
                "reading…"
              ) : valid ? (
                <>
                  <Check className="size-3" />
                  {duration.toFixed(1)}s
                </>
              ) : (
                <>
                  <X className="size-3" />
                  {duration.toFixed(1)}s
                </>
              )}
            </span>
          </div>
          {duration !== null && !valid && (
            <p className="text-xs text-destructive">
              Clips must be between {MIN}s and {MAX}s. Trim and re-upload.
            </p>
          )}
        </div>

        {/* Form */}
        <div className="space-y-6">
          <Panel title="Caption" hint={`${caption.length}/100`}>
            <textarea
              value={caption}
              maxLength={100}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              placeholder="Write the one-line takeaway…"
              className="w-full resize-none rounded-md bg-background border border-border px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Add #hashtags to help learners discover your clip.
            </p>
          </Panel>

          <Panel
            title="Category"
            hint={sub ? `${group} => ${sub}` : "Required"}
          >
            <p className="text-xs text-muted-foreground mb-3">
              Pick a topic, then the specific track.
            </p>
            <div className="flex flex-wrap gap-2">
              {categoryGroups.map((g) => (
                <button
                  key={g.group}
                  onClick={() => {
                    setGroup(g.group);
                    setSub(null);
                  }}
                  className={`h-8 px-3 rounded-full text-xs font-medium border transition-colors ${
                    group === g.group
                      ? "bg-accent text-accent-foreground border-accent"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                  }`}
                >
                  {g.group}
                </button>
              ))}
            </div>
            {activeGroup && (
              <div className="mt-4 pt-4 border-t border-border animate-fade-up">
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  {activeGroup.group} =&gt;
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeGroup.items.map((i) => (
                    <button
                      key={i}
                      onClick={() => setSub(i)}
                      className={`h-8 px-3 rounded-md text-xs font-medium border transition-colors ${
                        sub === i
                          ? "bg-foreground text-background border-foreground"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Panel>

          <Panel title="Call to action" hint="Optional">
            <p className="text-xs text-muted-foreground mb-3">
              Drive viewers to one link from this video.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { key: "none", label: "None", icon: Ban },
                  { key: "library", label: "From library", icon: Library },
                  { key: "custom", label: "Custom URL", icon: Link2 },
                ] as const
              ).map((o) => (
                <button
                  key={o.key}
                  onClick={() => setCta(o.key)}
                  className={`h-16 rounded-md border flex flex-col items-center justify-center gap-1.5 text-xs font-medium transition-colors ${
                    cta === o.key
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                  }`}
                >
                  <o.icon className="size-4" />
                  {o.label}
                </button>
              ))}
            </div>
            {cta === "custom" && (
              <div className="mt-4 grid sm:grid-cols-2 gap-3 animate-fade-up">
                <input
                  value={ctaLabel}
                  onChange={(e) => setCtaLabel(e.target.value)}
                  maxLength={30}
                  placeholder="Button label"
                  className="h-10 rounded-md bg-background border border-border px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition"
                />
                <input
                  value={ctaUrl}
                  onChange={(e) => setCtaUrl(e.target.value)}
                  placeholder="https://…"
                  className="h-10 rounded-md bg-background border border-border px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition"
                />
              </div>
            )}
            {cta === "library" && (
              <p className="mt-4 text-xs text-muted-foreground animate-fade-up">
                Linked libraries appear here once connected from your profile.
              </p>
            )}
          </Panel>

          {!canShare && (
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              {sub ? "Fix clip length to share" : "Select a category to share"}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function Panel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card/60 p-5">
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <h2 className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          {title}
        </h2>
        {hint && (
          <span className="text-[10px] font-mono text-muted-foreground truncate">
            {hint}
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
