import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Code2,
  Facebook,
  Github,
  Linkedin,
  Send,
  Terminal,
  type LucideIcon,
} from 'lucide-react';
import portrait from '@assets/36d3f276ffceff26cf3643a9803cf5d2_0_1793552029709.webp';
import { portfolio } from '../data/portfolio';
import './portfolio-hero.css';

const socialIcons: Record<string, LucideIcon> = {
  GitHub: Github,
  Facebook,
  Telegram: Send,
  LinkedIn: Linkedin,
};

type PortfolioHeroProps = {
  typed: string;
  reduceMotion: boolean | null;
};

export function PortfolioHero({ typed, reduceMotion }: PortfolioHeroProps) {
  return (
    <section className="portfolio-hero" aria-labelledby="portfolio-hero-title">
      <motion.div
        className="portfolio-hero-inner"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <div className="portfolio-hero-mobile">
          <div className="portfolio-portrait-orbit">
            <div className="portfolio-portrait-frame">
              <img
                src={portrait}
                alt={`Portrait of ${portfolio.name}`}
                className="portfolio-portrait-image"
              />
            </div>
          </div>

          <p className="portfolio-hero-availability">{portfolio.availability}</p>
          <p className="portfolio-hero-greeting">
            Hey, I&apos;m <strong>{portfolio.name}</strong>
          </p>
          <h1 id="portfolio-hero-title" className="portfolio-hero-headline">
            I&apos;m a <span>Full Stack Developer</span>
          </h1>
          <p className="portfolio-hero-typewriter" aria-live="polite">
            {typed}
            <span className="portfolio-hero-caret" aria-hidden="true" />
          </p>
          <p className="portfolio-hero-intro">{portfolio.intro}</p>

          <div className="portfolio-hero-actions">
            <a href="#work" className="portfolio-hero-primary" data-testid="link-explore-work">
              Explore My Work
              <ArrowDownRight size={15} aria-hidden="true" />
            </a>
            <a href="#contact" className="portfolio-hero-secondary" data-testid="link-contact-me">
              Contact Me
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>

          <nav className="portfolio-hero-socials" aria-label="Social links">
            {portfolio.socials.map(({ label, href }) => {
              const Icon = socialIcons[label];
              if (!href || !Icon) return null;
              return (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  data-testid={`link-hero-social-${label.toLowerCase()}`}
                >
                  <Icon aria-hidden="true" />
                </a>
              );
            })}
          </nav>

          <a href="#about" className="portfolio-hero-about" data-testid="link-scroll-about">
            <span>A LITTLE ABOUT ME</span>
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>

        <div className="portfolio-hero-desktop">
          <div className="portfolio-hero-desktop-copy">
            <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.23em] text-[#8d9aa9]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#58d6a0] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#58d6a0]" />
              </span>
              {portfolio.availability}
            </div>
            <p className="mb-4 font-mono text-[11px] tracking-[.24em] text-[#62cff8]">HELLO, I&apos;M</p>
            <h1 className="font-display text-[clamp(4.3rem,11vw,9rem)] font-semibold leading-[.84] tracking-[-.09em]">
              <span className="block text-white">{portfolio.name}<span className="text-[#51c8ff]">.</span></span>
            </h1>
            <p className="mt-6 font-display text-base font-medium tracking-[-.02em] text-white/75 md:text-xl">{portfolio.role}</p>
            <div className="mt-7 min-h-[32px] font-mono text-sm text-[#a9b3bf] md:text-base" aria-live="polite">
              <span className="text-[#57caff]">&gt; </span>{typed}<span className="caret ml-1 inline-block h-4 w-[1px] translate-y-[3px] bg-[#56caff]" />
            </div>
            <p className="mt-4 max-w-[470px] text-[15px] leading-7 text-[#9aa6b4]">{portfolio.intro}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#work" className="group inline-flex items-center gap-3 rounded-full border border-[#58caff]/40 bg-[#102638] px-6 py-3.5 text-xs font-bold tracking-[.08em] text-[#bbebff] transition hover:border-[#58caff] hover:bg-[#143a52]" data-testid="link-explore-work-desktop">
                Explore My Work <ArrowDownRight size={15} className="transition group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
              <a href="#contact" className="group inline-flex items-center gap-2 px-4 py-3.5 text-xs font-bold tracking-[.08em] text-white/70 transition hover:text-[#74d9ff]" data-testid="link-contact-me-desktop">
                Contact Me <ArrowUpRight size={14} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
            <div className="mt-14 flex items-center gap-5">
              <span className="font-mono text-[9px] tracking-[.22em] text-white/35">A LITTLE ABOUT ME</span>
              <span className="h-px w-16 bg-white/15" />
              <a href="#about" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-[#4bcaff] hover:text-[#4bcaff]" aria-label="Scroll to about" data-testid="link-scroll-about-desktop">
                <ArrowDown size={15} />
              </a>
            </div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-[430px] lg:ml-auto lg:mr-5"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(40,173,241,.18),transparent_70%)] blur-2xl" />
            <div className="pointer-events-none absolute -right-14 -top-14 z-0 h-[300px] w-[300px] opacity-80 sm:-right-20 sm:-top-20 sm:h-[380px] sm:w-[380px]" aria-hidden="true">
              <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
                <defs>
                  <linearGradient id="wire-desktop" x1="55" y1="42" x2="330" y2="340" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#5AD7FF" stopOpacity=".85" />
                    <stop offset="1" stopColor="#4A8EFF" stopOpacity=".1" />
                  </linearGradient>
                  <radialGradient id="core-desktop">
                    <stop stopColor="#51C8FF" stopOpacity=".26" />
                    <stop offset="1" stopColor="#51C8FF" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="208" cy="199" r="154" stroke="url(#wire-desktop)" strokeOpacity=".34" strokeDasharray="3 8" />
                <circle cx="208" cy="199" r="120" stroke="url(#wire-desktop)" strokeOpacity=".22" />
                <path d="M201 78 284 126v96l-83 48-83-48v-96l83-48Z" fill="url(#core-desktop)" stroke="url(#wire-desktop)" strokeWidth="1.4" />
                <path d="m118 126 83 49 83-49M201 175v95M158 151v95m86-95v95" stroke="url(#wire-desktop)" strokeWidth="1" strokeOpacity=".75" />
                <path d="m201 78 0 97m83-49-83 49-83-49" stroke="url(#wire-desktop)" strokeOpacity=".55" />
                <circle cx="201" cy="175" r="4" fill="#7AE4FF" />
                <circle cx="284" cy="126" r="3" fill="#7AE4FF" />
                <circle cx="118" cy="222" r="3" fill="#7AE4FF" />
                <path d="M200 22v24m0 286v24M22 200h24m286 0h24" stroke="#69D5FF" strokeOpacity=".5" />
              </svg>
            </div>
            <div className="relative z-10 aspect-[.88] overflow-hidden rounded-[46%_46%_14px_14px] border border-white/10 bg-[#183d59]">
              <img src={portrait} alt={`Portrait of ${portfolio.name}`} className="h-full w-full object-cover object-[center_39%]" />
            </div>
            <div className="absolute -left-7 top-[18%] hidden -rotate-90 font-mono text-[9px] tracking-[.28em] text-white/40 sm:block">CREATIVE DEVELOPMENT / 001</div>
            <div className="absolute -right-4 top-10 flex items-center gap-2 rounded-full border border-white/10 bg-[#111722]/90 px-4 py-2.5 font-mono text-[9px] tracking-widest text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4acaff]" /> FULL STACK
            </div>
            <div className="absolute -bottom-8 -left-8 hidden h-24 w-24 items-center justify-center rounded-full border border-[#55caff]/20 bg-[#10202b]/80 text-center font-mono text-[8px] leading-4 tracking-[.12em] text-[#91dfff] backdrop-blur sm:flex">
              GOOD IDEAS<br />DESERVE<br />GOOD DETAILS
            </div>
            <div className="absolute -left-6 top-[34%] z-20 flex items-center gap-2 rounded-full border border-[#69d5ff]/20 bg-[#0d1721]/90 px-3 py-2 font-mono text-[9px] text-[#c1edff] shadow-xl backdrop-blur sm:-left-12">
              <Braces size={13} className="text-[#61d2ff]" /> REACT
            </div>
            <div className="absolute -right-2 top-[58%] z-20 flex items-center gap-2 rounded-full border border-[#69d5ff]/20 bg-[#0d1721]/90 px-3 py-2 font-mono text-[9px] text-[#c1edff] shadow-xl backdrop-blur sm:-right-7">
              <Code2 size={13} className="text-[#61d2ff]" /> TS
            </div>
            <div className="absolute bottom-[21%] left-2 z-20 flex items-center gap-2 rounded-full border border-[#69d5ff]/20 bg-[#0d1721]/90 px-3 py-2 font-mono text-[9px] text-[#c1edff] shadow-xl backdrop-blur">
              <Terminal size={13} className="text-[#61d2ff]" /> CSS
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div className="portfolio-hero-progress">
        <span className="font-mono text-[9px] tracking-widest text-white/35">01 — 06</span>
        <span className="line-draw h-px flex-1 opacity-60" />
        <span className="font-mono text-[9px] tracking-widest text-white/35">A DIGITAL INTRODUCTION</span>
      </div>
    </section>
  );
}
