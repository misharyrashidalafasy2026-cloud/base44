import { Link } from "react-router-dom";
import { Mail, MapPin, Shield } from "lucide-react";
import { SITE, NAV_LINKS, GIVING_LINKS } from "@/lib/siteConfig";
import GeometricPattern from "@/components/GeometricPattern";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest text-ivory">
      <GeometricPattern className="absolute inset-0 h-full w-full text-accent" opacity={0.05} />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Mission */}
          <div className="lg:col-span-4">
            <div className="flex flex-col leading-none">
              <span className="font-heading text-xl font-semibold tracking-wide">BAITUL-EHSAN</span>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-accent">Relief Fund</span>
              <span className="font-arabic mt-1 text-sm text-ivory/70" dir="rtl">{SITE.nameArabic}</span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/70">
              An Islamic philanthropic institution dedicated to transforming generosity into dignified,
              accountable, and lasting humanitarian impact — rooted in faith, transparency, and human dignity.
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-ivory/70">
              <MapPin className="h-4 w-4 text-accent" /> {SITE.location}
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Navigation</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-ivory/70 transition-colors hover:text-ivory">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Giving */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Giving</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {GIVING_LINKS.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-ivory/70 transition-colors hover:text-ivory">{l.label}</Link>
                </li>
              ))}
              <li><Link to="/donate" className="text-ivory/70 transition-colors hover:text-ivory">Donate</Link></li>
              <li><Link to="/major-giving" className="text-ivory/70 transition-colors hover:text-ivory">Major Giving</Link></li>
            </ul>
          </div>

          {/* Resources + Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Resources</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/transparency" className="text-ivory/70 transition-colors hover:text-ivory">Transparency Center</Link></li>
              <li><Link to="/transparency" className="text-ivory/70 transition-colors hover:text-ivory">Donation Policy</Link></li>
              <li><Link to="/transparency" className="text-ivory/70 transition-colors hover:text-ivory">Privacy</Link></li>
              <li><Link to="/contact" className="text-ivory/70 transition-colors hover:text-ivory">Contact</Link></li>
            </ul>
            <div className="mt-6 space-y-2.5 text-sm">
              <a href={`mailto:${SITE.supportEmail}`} className="flex items-center gap-2 text-ivory/70 transition-colors hover:text-ivory">
                <Mail className="h-4 w-4 text-accent" /> {SITE.supportEmail}
              </a>
              <a href={`mailto:${SITE.alafasyEmail}`} className="flex items-center gap-2 text-ivory/70 transition-colors hover:text-ivory">
                <Mail className="h-4 w-4 text-accent" /> {SITE.alafasyEmail}
              </a>
            </div>
          </div>
        </div>

        {/* Security notice */}
        <div className="mt-12 flex items-start gap-3 rounded-lg border border-ivory/15 bg-ivory/5 p-4 text-xs text-ivory/70">
          <Shield className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>
            Baitul-Ehsan Relief Fund will never ask you to send your contribution to an unauthorized personal wallet
            or pay an agent directly. Always contribute through the official website and verify the cryptocurrency,
            network, and wallet address before sending funds. Never share your seed phrase, private key, or password.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Baitul-Ehsan Relief Fund. All rights reserved.</p>
          <p className="font-arabic text-sm text-ivory/60" dir="rtl">صندوق بيت الإحسان للإغاثة</p>
        </div>
      </div>
    </footer>
  );
}