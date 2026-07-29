import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  User,
  Pencil,
  BarChart3,
  Link2,
  ShieldCheck,
  LogOut,
} from "lucide-react";

const items = [
  { label: "My Profile", icon: User, to: "/profile" as const },
  { label: "Edit Profile", icon: Pencil, to: "/profile" as const },
  { label: "Analytics", icon: BarChart3, to: "/profile" as const },
  { label: "Link Libraries", icon: Link2, to: "/profile" as const },
  { label: "Admin", icon: ShieldCheck, to: "/profile" as const },
];

export function ProfileMenu({ initial = "F" }: { initial?: string }) {
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
        aria-label="Open profile menu"
        className="size-9 rounded-full bg-muted grid place-items-center text-xs font-bold ring-1 ring-border hover:ring-accent transition-colors"
      >
        {initial}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-[0_20px_50px_-15px_rgba(0,0,0,0.4)] overflow-hidden z-50 animate-fade-up">
          <div className="px-3 py-3 border-b border-border">
            <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Signed in as
            </p>
            <p className="text-sm font-bold mt-0.5">@fjaveid</p>
          </div>
          <div className="py-1">
            {items.map((it) => (
              <Link
                key={it.label}
                to={it.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-sm hover:bg-muted transition-colors"
              >
                <it.icon className="size-4 text-muted-foreground" />
                {it.label}
              </Link>
            ))}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm border-t border-border hover:bg-muted transition-colors text-left"
          >
            <LogOut className="size-4 text-muted-foreground" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
