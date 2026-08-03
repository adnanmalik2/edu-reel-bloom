import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ListVideo, Lock, Globe } from "lucide-react";
import { toast } from "sonner";
import { SiteNav } from "@/components/site-nav";
import { categoryGroups } from "@/lib/categories";
import { reels } from "@/lib/reels-data";

export const Route = createFileRoute("/create/list")({
  head: () => ({
    meta: [
      { title: "Create a list — ETIF Lab" },
      {
        name: "description",
        content:
          "Group 10-second clips into an ordered learning path with a title, category and visibility.",
      },
      { property: "og:title", content: "Create a list — ETIF Lab" },
      {
        property: "og:description",
        content: "Build a learning path from short clips on ETIF Lab.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CreateList,
});

function CreateList() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [group, setGroup] = useState<string | null>(null);
  const [sub, setSub] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [picked, setPicked] = useState<string[]>([]);

  const activeGroup = categoryGroups.find((g) => g.group === group);
  const canSave = title.trim().length > 0 && picked.length > 0;

  return (
    <div className="min-h-screen text-foreground">
      <SiteNav active="Create" />
      <main className="px-4 md:px-8 py-10 max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-8">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-2">
              NEW LIST
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter">
              Build a <span className="text-accent">learning path.</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-lg">
              Group clips in the order they should be watched.
            </p>
          </div>
          <button
            disabled={!canSave}
            onClick={() =>
              toast.success("List created", {
                description: `${title} · ${picked.length} clips`,
              })
            }
            className="h-10 px-6 rounded-md text-xs font-mono font-bold uppercase tracking-widest bg-accent text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[var(--shadow-accent)] transition-shadow"
          >
            Create list
          </button>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,380px)_1fr] gap-6 items-start">
          <div className="lg:sticky lg:top-24 space-y-6">
            <section className="rounded-2xl border border-border bg-card/60 p-5 space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Title
                </label>
                <input
                  value={title}
                  maxLength={60}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Web security basics"
                  className="mt-2 w-full h-10 rounded-md bg-background border border-border px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Description
                </label>
                <textarea
                  value={desc}
                  maxLength={140}
                  rows={3}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="What will someone learn from this path?"
                  className="mt-2 w-full resize-none rounded-md bg-background border border-border px-3 py-2.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/25 transition"
                />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Visibility
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { key: "public", label: "Public", icon: Globe },
                      { key: "private", label: "Private", icon: Lock },
                    ] as const
                  ).map((v) => (
                    <button
                      key={v.key}
                      onClick={() => setVisibility(v.key)}
                      className={`h-10 rounded-md border flex items-center justify-center gap-2 text-xs font-medium transition-colors ${
                        visibility === v.key
                          ? "border-accent bg-accent/10 text-foreground"
                          : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
                      }`}
                    >
                      <v.icon className="size-3.5" />
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card/60 p-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                Category {sub && <span className="text-accent">· {group} =&gt; {sub}</span>}
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
                <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2 animate-fade-up">
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
              )}
            </section>
          </div>

          <section className="rounded-2xl border border-border bg-card/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Select clips
              </p>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                <ListVideo className="size-3.5" />
                {picked.length} selected
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {reels.map((r) => {
                const on = picked.includes(r.id);
                const order = picked.indexOf(r.id) + 1;
                return (
                  <button
                    key={r.id}
                    onClick={() =>
                      setPicked((p) =>
                        p.includes(r.id)
                          ? p.filter((x) => x !== r.id)
                          : [...p, r.id],
                      )
                    }
                    className={`group relative block aspect-[3/5] overflow-hidden rounded-lg bg-muted ring-1 text-left transition-all ${
                      on
                        ? "ring-2 ring-accent"
                        : "ring-border hover:ring-foreground"
                    }`}
                  >
                    <img
                      src={r.poster}
                      alt={r.title}
                      className="absolute inset-0 size-full object-cover"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
                    <span
                      className={`absolute top-2 right-2 size-6 rounded-full grid place-items-center text-[10px] font-bold transition-colors ${
                        on
                          ? "bg-accent text-accent-foreground"
                          : "bg-black/50 text-white/70"
                      }`}
                    >
                      {on ? order : <Check className="size-3" />}
                    </span>
                    <span className="absolute bottom-0 inset-x-0 p-2">
                      <span className="block text-xs font-bold text-white leading-tight line-clamp-2">
                        {r.title}
                      </span>
                      <span className="block text-[10px] font-mono text-white/70 mt-1">
                        {r.category}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
