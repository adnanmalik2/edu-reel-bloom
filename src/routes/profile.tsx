import { createFileRoute, Link } from "@tanstack/react-router";
import {
  LayoutGrid,
  Search,
  Bell,
  Plus,
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
  Pencil,
  BarChart3,
  Play,
  Heart,
  Users,
  Eye,
  ArrowLeft,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileMenu } from "@/components/profile-menu";
import { profile } from "@/lib/profile-data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: `${profile.name} — ETIF Profile` },
      {
        name: "description",
        content: `${profile.name} (@${profile.username}) on ETIF — 10-second learning reels curated from ${profile.location}.`,
      },
      { property: "og:title", content: `${profile.name} — ETIF Profile` },
      {
        property: "og:description",
        content: `${profile.bio} — Explore reels by @${profile.username}.`,
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function iconFor(kind: string) {
  if (kind === "linkedin") return Linkedin;
  if (kind === "instagram") return Instagram;
  return Youtube;
}

function ProfilePage() {
  return (
    <div className="min-h-screen text-foreground selection:bg-accent/30">
      {/* Header */}
      <nav className="h-16 border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-8 min-w-0">
          <Link to="/" className="font-extrabold tracking-tighter text-xl">
            ETIF
            <span className="text-accent text-[10px] align-top ml-0.5 font-mono font-medium">
              LAB
            </span>
          </Link>
          <Link
            to="/"
            className="hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Back to Feed
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 mr-3 pr-3 border-r border-border">
            <IconBtn><LayoutGrid className="size-4" /></IconBtn>
            <IconBtn><Search className="size-4" /></IconBtn>
            <IconBtn><Bell className="size-4" /></IconBtn>
            <IconBtn><Plus className="size-4" /></IconBtn>
            <ThemeToggle />
          </div>
          <ProfileMenu initial="F" />
        </div>
      </nav>

      {/* Profile hero */}
      <header className="px-4 md:px-8 pt-10 pb-8 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-4">
            PROFILE / CURATOR
          </p>
          <div className="grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-start">
            {/* Avatar */}
            <div className="relative">
              <div className="size-28 md:size-32 rounded-2xl bg-gradient-to-br from-accent to-accent/50 grid place-items-center text-4xl font-extrabold text-accent-foreground ring-1 ring-border shadow-[var(--shadow-accent)]">
                {profile.initials}
              </div>
              <span className="absolute -bottom-1 -right-1 size-4 rounded-full bg-emerald-500 ring-2 ring-background" />
            </div>

            {/* Identity */}
            <div className="min-w-0">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter">
                {profile.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm">
                <span className="font-mono text-accent">@{profile.username}</span>
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="size-3.5" /> {profile.location}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-md leading-relaxed">
                {profile.bio}
              </p>

              {/* Stats */}
              <div className="flex gap-6 mt-5">
                <Stat label="Followers" value={profile.followers} icon={Users} />
                <Stat label="Following" value={profile.following} icon={Users} />
                <Stat label="Views" value={profile.totalViews} icon={Eye} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 w-full md:w-56">
              <a
                href={profile.links[0].href}
                target="_blank"
                rel="noreferrer"
                className="h-11 flex items-center justify-center gap-2 rounded-md bg-accent text-accent-foreground text-xs font-mono uppercase tracking-widest font-bold hover:brightness-110 transition"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
              <div className="grid grid-cols-2 gap-2">
                <button className="h-10 flex items-center justify-center gap-1.5 rounded-md border border-border hover:border-accent hover:text-accent text-[10px] font-mono uppercase tracking-widest transition">
                  <Pencil className="size-3.5" /> Edit
                </button>
                <button className="h-10 flex items-center justify-center gap-1.5 rounded-md border border-border hover:border-accent hover:text-accent text-[10px] font-mono uppercase tracking-widest transition">
                  <BarChart3 className="size-3.5" /> Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 md:px-8 py-10 max-w-5xl mx-auto space-y-12">
        {/* Featured */}
        <section>
          <SectionHeader label="Featured" count="01" />
          <Link
            to="/reel/$id"
            params={{ id: profile.featured.id }}
            className="group relative block aspect-video md:aspect-[16/7] rounded-xl overflow-hidden ring-1 ring-border hover:ring-accent transition-all"
          >
            <img
              src={profile.featured.poster}
              alt={profile.featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/50" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-accent text-accent-foreground px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-sm">
                Featured
              </span>
              <span className="bg-black/60 backdrop-blur-md text-white/90 px-2 py-0.5 text-[10px] font-mono rounded-sm">
                {profile.featured.duration}
              </span>
            </div>
            <div className="absolute inset-0 grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="size-16 rounded-full bg-accent/90 grid place-items-center shadow-[0_0_40px_var(--accent)]">
                <Play className="size-6 text-accent-foreground ml-0.5" fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5">
              <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">
                {profile.featured.title}
              </h3>
              <p className="text-white/70 text-xs font-mono mt-1">
                {profile.featured.views} views
              </p>
            </div>
          </Link>
        </section>

        {/* Links */}
        <section>
          <SectionHeader label="Links" count={String(profile.links.length).padStart(2, "0")} />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {profile.links.map((l) => {
              const Icon = iconFor(l.kind);
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group h-14 flex items-center gap-3 px-4 rounded-lg border border-border bg-card/40 hover:border-accent hover:bg-card transition-all"
                >
                  <span className="size-9 rounded-md bg-muted grid place-items-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="size-4" />
                  </span>
                  <span className="text-sm font-medium">{l.label}</span>
                  <span className="ml-auto text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                    Open →
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Videos */}
        <section>
          <SectionHeader label="Videos" count={String(profile.videos.length).padStart(2, "0")} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {profile.videos.map((v) => (
              <Link
                key={v.id}
                to="/reel/$id"
                params={{ id: v.id }}
                className="group relative block aspect-[3/5] overflow-hidden rounded-lg bg-muted ring-1 ring-border hover:ring-accent transition-all hover:-translate-y-1"
              >
                <img
                  src={v.poster}
                  alt={v.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/40" />
                <div className="absolute top-2 left-2 right-2 flex justify-between">
                  <span className="bg-accent text-accent-foreground px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase rounded-sm">
                    {v.category}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-white/90 px-1.5 py-0.5 text-[9px] font-mono rounded-sm">
                    {v.duration}
                  </span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-3">
                  <h3 className="text-white text-sm font-bold tracking-tight leading-tight">
                    {v.title}
                  </h3>
                  <div className="flex items-center justify-between mt-1.5 text-[10px] font-mono text-white/70">
                    <span>{v.views}</span>
                    <span className="flex items-center gap-1">
                      <Heart className="size-3" /> {v.likes}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-4 md:px-8 py-4 flex flex-wrap gap-4 justify-between items-center border-t border-border">
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
          PROFILE // @{profile.username}
        </span>
        <span className="text-[10px] font-mono tracking-widest text-muted-foreground">
          {profile.videos.length} REELS PUBLISHED
        </span>
      </footer>
    </div>
  );
}

function SectionHeader({ label, count }: { label: string; count: string }) {
  return (
    <div className="flex items-end justify-between mb-4 border-b border-border pb-3">
      <h2 className="text-xl md:text-2xl font-extrabold tracking-tighter">
        {label}
      </h2>
      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {count} items
      </span>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="text-[10px] font-mono uppercase tracking-widest">
          {label}
        </span>
      </div>
      <div className="text-lg font-bold tracking-tight mt-0.5">{value}</div>
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
