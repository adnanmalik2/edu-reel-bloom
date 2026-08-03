import { Link } from "@tanstack/react-router";
import { LayoutGrid, Search, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ProfileMenu } from "@/components/profile-menu";
import { CreateMenu } from "@/components/create-menu";

export function SiteNav({ active }: { active?: string }) {
  return (
    <nav className="h-16 border-b border-border px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-8 min-w-0">
        <Link to="/" className="font-extrabold tracking-tighter text-xl">
          ETIF
          <span className="text-accent text-[10px] align-top ml-0.5 font-mono font-medium">
            LAB
          </span>
        </Link>
        <div className="hidden md:flex gap-6 text-xs font-medium text-muted-foreground uppercase tracking-widest">
          <Link to="/" className="hover:text-foreground transition-colors">
            Discover
          </Link>
          <span className="hover:text-foreground transition-colors">Following</span>
          {active && (
            <span className="text-foreground border-b-2 border-accent pb-[22px]">
              {active}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1 mr-3 pr-3 border-r border-border">
          <IconBtn><LayoutGrid className="size-4" /></IconBtn>
          <IconBtn><Search className="size-4" /></IconBtn>
          <IconBtn><Bell className="size-4" /></IconBtn>
          <CreateMenu />
          <ThemeToggle />
        </div>
        <ProfileMenu initial="F" />
      </div>
    </nav>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="size-9 grid place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
      {children}
    </button>
  );
}
