import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Video, ListVideo } from "lucide-react";

const items = [
  {
    label: "Create post",
    desc: "Upload a 10-second learning clip",
    icon: Video,
    to: "/create/post" as const,
  },
  {
    label: "Create list",
    desc: "Group reels into a learning path",
    icon: ListVideo,
    to: "/create/list" as const,
  },
];

export function CreateMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Create"
        aria-expanded={open}
        className={`size-9 grid place-items-center rounded-md transition-colors ${
          open
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        }`}
      >
        <Plus className="size-4" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] overflow-hidden z-50 animate-fade-up">
          <div className="px-3 py-2.5 border-b border-border">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Create
            </p>
          </div>
          <div className="p-1.5">
            {items.map((it) => (
              <Link
                key={it.label}
                to={it.to}
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 px-2.5 py-2.5 rounded-md hover:bg-muted transition-colors"
              >
                <span className="size-8 shrink-0 grid place-items-center rounded-md bg-accent/15 text-accent">
                  <it.icon className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold">{it.label}</span>
                  <span className="block text-xs text-muted-foreground leading-snug">
                    {it.desc}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
