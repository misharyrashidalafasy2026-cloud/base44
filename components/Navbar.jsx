import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Heart, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { SITE, NAV_LINKS, GIVING_LINKS } from "@/lib/siteConfig";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [givingOpen, setGivingOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.role === "admin";
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setGivingOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile menu is open so the page behind
  // doesn't scroll instead of the menu.
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 shadow-sm backdrop-blur-md" : "bg-background/80 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" aria-label="Baitul-Ehsan Relief Fund — Home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.slice(0, 2).map((l) => (
            <NavItem key={l.path} {...l} active={location.pathname === l.path} />
          ))}
          {/* Giving dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGivingOpen(true)}
            onMouseLeave={() => setGivingOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-accent">
              Giving <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {givingOpen && (
              <div className="absolute left-0 top-full min-w-[200px] rounded-lg border border-border bg-popover p-1.5 shadow-lg">
                {GIVING_LINKS.map((l) => (
                  <Link
                    key={l.path}
                    to={l.path}
                    className="block rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-accent"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {NAV_LINKS.slice(2).map((l) => (
            <NavItem key={l.path} {...l} active={location.pathname === l.path} />
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/my-giving">
              <User className="mr-1.5 h-4 w-4" /> My Giving
            </Link>
          </Button>
          {isAdmin && (
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/admin">
                <Shield className="mr-1.5 h-4 w-4" /> Admin
              </Link>
            </Button>
          )}
          <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-forest">
            <Link to="/donate">
              <Heart className="mr-1.5 h-4 w-4" /> Donate Now
            </Link>
          </Button>
          <button
            className="ml-1 inline-flex items-center justify-center rounded-md p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((l) => (
              <Link key={l.path} to={l.path} className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-secondary">
                {l.label}
              </Link>
            ))}
            <div className="mt-1 border-t border-border pt-2">
              <div className="px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Giving</div>
              {GIVING_LINKS.map((l) => (
                <Link key={l.path} to={l.path} className="block rounded-md px-3 py-2.5 text-sm text-foreground/80 hover:bg-secondary">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-2 flex gap-2 border-t border-border pt-3">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <Link to="/my-giving">My Giving</Link>
              </Button>
              <Button asChild size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-forest">
                <Link to="/donate">Donate Now</Link>
              </Button>
            </div>
            {isAdmin && (
              <Button asChild variant="outline" size="sm" className="mt-2 w-full">
                <Link to="/admin">
                  <Shield className="mr-1.5 h-4 w-4" /> Admin Dashboard
                </Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ label, path, active }) {
  return (
    <Link
      to={path}
      className={cn(
        "rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "text-accent" : "text-foreground/80 hover:text-accent"
      )}
    >
      {label}
    </Link>
  );
}