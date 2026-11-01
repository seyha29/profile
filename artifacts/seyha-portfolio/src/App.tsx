import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight,
  AtSign, Braces, Check, Code2, ExternalLink, Github, Globe2, Menu, Moon,
  MousePointer2, Send, Sparkles, Sun, Terminal, X,
} from 'lucide-react';
import portrait from '@assets/36d3f276ffceff26cf3643a9803cf5d2_0_1793552029709.webp';
import { portfolio } from './data/portfolio';

const navItems = [
  ['About', '#about'], ['Work', '#work'], ['Journey', '#journey'],
  ['GitHub', '#github'], ['Services', '#services'], ['Contact', '#contact'],
];

function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [typed, setTyped] = useState('');
  const [scrollTop, setScrollTop] = useState(false);
  const [cursor, setCursor] = useState({ x: -30, y: -30, hovering: false });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [formFeedback, setFormFeedback] = useState('');
  const [formError, setFormError] = useState('');
  const reduceMotion = useReducedMotion();
  const projectDialog = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), reduceMotion ? 0 : 350);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    const lines = portfolio.typewriterLines;
    if (reduceMotion) {
      setTyped(lines[0]);
      return;
    }
    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = 0;
    const tick = () => {
      const current = lines[lineIndex];
      if (!deleting) {
        charIndex += 1;
        setTyped(current.slice(0, charIndex));
        if (charIndex >= current.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1450);
          return;
        }
      } else {
        charIndex -= 1;
        setTyped(current.slice(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          lineIndex = (lineIndex + 1) % lines.length;
        }
      }
      timer = window.setTimeout(tick, deleting ? 30 : 62);
    };
    timer = window.setTimeout(tick, 450);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  useEffect(() => {
    const handleScroll = () => setScrollTop(window.scrollY > 520);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((el) => observer.observe(el));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [introVisible]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => setCursor((old) => ({ ...old, x: event.clientX, y: event.clientY }));
    const onHover = (event: MouseEvent) => setCursor((old) => ({ ...old, hovering: Boolean((event.target as HTMLElement).closest('a,button,[role="button"]')) }));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onHover);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onHover);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light-mode', lightMode);
  }, [lightMode]);

  useEffect(() => {
    if (activeProject === null) return;
    projectDialog.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeProject]);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormFeedback('');
    const { name, email, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError('Please complete each field before continuing.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('That email address does not look quite right.');
      return;
    }
    setFormError('');
    setFormFeedback('Your note is ready, but no sending service is connected here. Please use the email link when one is configured.');
  };

  const githubUrl = portfolio.githubUsername ? `https://github.com/${portfolio.githubUsername}` : '';
  const currentProject = activeProject === null ? null : portfolio.projects[activeProject];

  return (
    <div className="site-noise min-h-[100dvh] overflow-hidden">
      <AnimatePresence>
        {introVisible && (
          <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0d1018]" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .18 }}>
            <div className="w-[min(340px,78vw)]">
              <div className="mb-5 flex items-center justify-between font-mono text-[11px] tracking-[.22em] text-[#8e9baa]">
                <span>SEYHA / PORTFOLIO</span><span>LOADING</span>
              </div>
              <div className="h-px w-full bg-white/10"><div className="intro-bar h-px w-full bg-[#4acaff]" /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="cursor-ring hidden lg:block" style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="grid-glow absolute inset-0" />
        <div className="hero-orb absolute -right-40 top-24 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(0,142,225,.18),transparent_68%)] blur-2xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[.07] bg-[#0d1018]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 md:px-10" aria-label="Main navigation">
          <a href="#home" className="group flex items-center gap-3" data-testid="link-home">
            <span className="grid h-9 w-9 place-items-center border border-[#3abefa]/40 bg-[#153148]/50 font-display text-sm font-bold text-[#65d5ff]">S.</span>
            <span className="font-display text-sm font-bold tracking-[.23em]">SEYHA<span className="ml-2 font-mono text-[10px] font-normal tracking-normal text-white/40">/ DEV</span></span>
          </a>
          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, href], i) => <a key={label} href={href} className="group relative py-2 text-[11px] font-semibold tracking-[.13em] text-white/55 transition hover:text-white" data-testid={`link-nav-${label.toLowerCase()}`}><span className="mr-1 font-mono text-[9px] text-[#51c7f4]/65">0{i + 1}</span> {label}<span className="absolute bottom-0 left-0 h-px w-0 bg-[#58caff] transition-all group-hover:w-full" /></a>)}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setLightMode(!lightMode)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white/70 transition hover:border-[#55cfff]/50 hover:text-[#69d5ff]" aria-label={lightMode ? 'Switch to dark theme' : 'Switch to light theme'} data-testid="button-theme-toggle">{lightMode ? <Moon size={16} /> : <Sun size={16} />}</button>
            <a href="#contact" className="hidden items-center gap-2 rounded-full bg-[#48c6fa] px-5 py-2.5 text-[11px] font-extrabold tracking-[.08em] text-[#06111a] transition hover:bg-[#8cddff] sm:flex" data-testid="link-header-contact">LET'S TALK <ArrowUpRight size={14} /></a>
            <button className="grid h-10 w-10 place-items-center text-white lg:hidden" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} data-testid="button-mobile-menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </nav>
        <AnimatePresence>
          {menuOpen && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="border-t border-white/10 bg-[#0d1018] px-5 py-4 lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              {navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm text-white/70 hover:bg-white/[.06] hover:text-white" data-testid={`link-mobile-${label.toLowerCase()}`}>{label}<ArrowUpRight size={13} className="ml-2 inline text-[#53caff]" /></a>)}
            </div>
          </motion.div>}
        </AnimatePresence>
      </header>

      <main id="home">
        <section className="relative mx-auto flex min-h-[780px] max-w-[1320px] items-center px-5 pb-20 pt-32 md:min-h-[850px] md:px-10">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .15 }}>
              <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.23em] text-[#8d9aa9]">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#58d6a0] opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#58d6a0]" /></span>
                {portfolio.location}
              </div>
              <p className="mb-4 font-mono text-[11px] tracking-[.24em] text-[#62cff8]">HELLO, I'M</p>
              <h1 className="font-display text-[clamp(4.3rem,11vw,9rem)] font-semibold leading-[.84] tracking-[-.09em]">
                <span className="block text-white">{portfolio.name}<span className="text-[#51c8ff]">.</span></span>
              </h1>
              <p className="mt-6 font-display text-base font-medium tracking-[-.02em] text-white/75 md:text-xl">{portfolio.role}</p>
              <div className="mt-7 min-h-[32px] font-mono text-sm text-[#a9b3bf] md:text-base" aria-live="polite">
                <span className="text-[#57caff]">&gt; </span>{typed}<span className="caret ml-1 inline-block h-4 w-[1px] translate-y-[3px] bg-[#56caff]" />
              </div>
              <p className="mt-4 max-w-[470px] text-[15px] leading-7 text-[#9aa6b4]">{portfolio.intro}</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#work" className="group inline-flex items-center gap-3 rounded-full border border-[#58caff]/40 bg-[#102638] px-6 py-3.5 text-xs font-bold tracking-[.08em] text-[#bbebff] transition hover:border-[#58caff] hover:bg-[#143a52]" data-testid="link-explore-work">Explore My Work <ArrowDownRight size={15} className="transition group-hover:translate-x-1 group-hover:translate-y-1" /></a>
                <a href="#contact" className="group inline-flex items-center gap-2 px-4 py-3.5 text-xs font-bold tracking-[.08em] text-white/70 transition hover:text-[#74d9ff]" data-testid="link-contact-me">Contact Me <ArrowUpRight size={14} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
              </div>
              <div className="mt-14 flex items-center gap-5">
                <span className="font-mono text-[9px] tracking-[.22em] text-white/35">A LITTLE ABOUT ME</span>
                <span className="h-px w-16 bg-white/15" />
                <a href="#about" className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/60 transition hover:border-[#4bcaff] hover:text-[#4bcaff]" aria-label="Scroll to about" data-testid="link-scroll-about"><ArrowDown size={15} /></a>
              </div>
            </motion.div>
            <motion.div className="relative mx-auto w-full max-w-[430px] lg:ml-auto lg:mr-5" initial={reduceMotion ? false : { opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: .3 }}>
              <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(40,173,241,.18),transparent_70%)] blur-2xl" />
              <div className="pointer-events-none absolute -right-14 -top-14 z-0 h-[300px] w-[300px] opacity-80 sm:-right-20 sm:-top-20 sm:h-[380px] sm:w-[380px]" aria-hidden="true">
                <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
                  <defs><linearGradient id="wire" x1="55" y1="42" x2="330" y2="340" gradientUnits="userSpaceOnUse"><stop stopColor="#5AD7FF" stopOpacity=".85" /><stop offset="1" stopColor="#4A8EFF" stopOpacity=".1" /></linearGradient><radialGradient id="core"><stop stopColor="#51C8FF" stopOpacity=".26" /><stop offset="1" stopColor="#51C8FF" stopOpacity="0" /></radialGradient></defs>
                  <circle cx="208" cy="199" r="154" stroke="url(#wire)" strokeOpacity=".34" strokeDasharray="3 8" />
                  <circle cx="208" cy="199" r="120" stroke="url(#wire)" strokeOpacity=".22" />
                  <path d="M201 78 284 126v96l-83 48-83-48v-96l83-48Z" fill="url(#core)" stroke="url(#wire)" strokeWidth="1.4" />
                  <path d="m118 126 83 49 83-49M201 175v95M158 151v95m86-95v95" stroke="url(#wire)" strokeWidth="1" strokeOpacity=".75" />
                  <path d="m201 78 0 97m83-49-83 49-83-49" stroke="url(#wire)" strokeOpacity=".55" />
                  <circle cx="201" cy="175" r="4" fill="#7AE4FF" /><circle cx="284" cy="126" r="3" fill="#7AE4FF" /><circle cx="118" cy="222" r="3" fill="#7AE4FF" />
                  <path d="M200 22v24m0 286v24M22 200h24m286 0h24" stroke="#69D5FF" strokeOpacity=".5" />
                </svg>
              </div>
              <div className="relative z-10 aspect-[.88] overflow-hidden rounded-[46%_46%_14px_14px] border border-white/10 bg-[#183d59]">
                <img src={portrait} alt="Portrait of SEYHA" className="h-full w-full object-cover object-[center_39%] mix-blend-luminosity opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1018]/70 via-transparent to-[#126c9d]/10" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(22,170,238,.13),transparent_38%,rgba(5,13,24,.22))]" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div><span className="font-mono text-[9px] tracking-[.2em] text-[#8fdfff]">THE PERSON BEHIND THE PIXELS</span><p className="mt-1 font-display text-2xl font-semibold">SEYHA</p></div>
                  <div className="grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/20 backdrop-blur"><MousePointer2 size={17} className="text-[#8ddfff]" /></div>
                </div>
              </div>
              <div className="absolute -left-7 top-[18%] hidden -rotate-90 font-mono text-[9px] tracking-[.28em] text-white/40 sm:block">CREATIVE DEVELOPMENT / 001</div>
              <div className="absolute -right-4 top-10 flex items-center gap-2 rounded-full border border-white/10 bg-[#111722]/90 px-4 py-2.5 font-mono text-[9px] tracking-widest text-white/70 backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-[#4acaff]" /> FRONTEND / CREATIVE</div>
              <div className="absolute -bottom-8 -left-8 hidden h-24 w-24 items-center justify-center rounded-full border border-[#55caff]/20 bg-[#10202b]/80 text-center font-mono text-[8px] leading-4 tracking-[.12em] text-[#91dfff] backdrop-blur sm:flex">GOOD IDEAS<br />DESERVE<br />GOOD DETAILS</div>
              <div className="absolute -left-6 top-[34%] z-20 flex items-center gap-2 rounded-full border border-[#69d5ff]/20 bg-[#0d1721]/90 px-3 py-2 font-mono text-[9px] text-[#c1edff] shadow-xl backdrop-blur sm:-left-12"><Braces size={13} className="text-[#61d2ff]" /> REACT</div>
              <div className="absolute -right-2 top-[58%] z-20 flex items-center gap-2 rounded-full border border-[#69d5ff]/20 bg-[#0d1721]/90 px-3 py-2 font-mono text-[9px] text-[#c1edff] shadow-xl backdrop-blur sm:-right-7"><Code2 size={13} className="text-[#61d2ff]" /> TS</div>
              <div className="absolute bottom-[21%] left-2 z-20 flex items-center gap-2 rounded-full border border-[#69d5ff]/20 bg-[#0d1721]/90 px-3 py-2 font-mono text-[9px] text-[#c1edff] shadow-xl backdrop-blur"><Terminal size={13} className="text-[#61d2ff]" /> CSS</div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 left-5 right-5 flex items-center gap-4 md:left-10 md:right-10"><span className="font-mono text-[9px] tracking-widest text-white/35">01 — 06</span><span className="line-draw h-px flex-1 opacity-60" /><span className="font-mono text-[9px] tracking-widest text-white/35">A DIGITAL INTRODUCTION</span></div>
        </section>

        <section id="about" className="scroll-mt-24 border-y border-white/[.07] bg-[#11151e]/60">
          <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
            <div className="reveal grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
              <SectionLabel number="01" label="A BIT ABOUT ME" />
              <div>
                <h2 className="font-display text-3xl font-medium leading-tight tracking-[-.045em] text-white md:text-5xl">Curious by nature.<br /><span className="text-[#53caff]">Intentional by design.</span></h2>
                <div className="mt-8 grid gap-9 md:grid-cols-[1fr_.7fr]">
                  <p className="max-w-[580px] text-sm leading-7 text-[#a2adba] md:text-[15px]">{portfolio.about}</p>
                  <div className="border-l border-white/10 pl-6">
                    <span className="font-mono text-[9px] tracking-[.2em] text-[#5dcaef]">WHAT I BRING</span>
                    <p className="mt-3 text-sm leading-6 text-white/65">A balance of visual curiosity and practical thinking — from the first sketch to the tiny interaction that makes a page feel finished.</p>
                  </div>
                </div>
                <div className="mt-12 grid grid-cols-2 border-y border-white/10 py-7">
                  <div className="pr-5"><p className="font-display text-xl font-semibold text-white md:text-2xl">{portfolio.experienceYears}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[.15em] text-white/40">years of experience</p></div>
                  <div className="border-l border-white/10 pl-6 md:pl-10"><p className="font-display text-xl font-semibold text-white md:text-2xl">{portfolio.projectCount}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[.15em] text-white/40">projects completed</p></div>
                </div>
                <p className="mt-3 font-mono text-[9px] leading-4 tracking-wide text-white/30">{portfolio.statsPlaceholderNote}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="reveal grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
            <SectionLabel number="02" label="TOOLS & CRAFT" />
            <div>
              <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <h2 className="font-display text-3xl font-medium tracking-[-.045em] text-white md:text-5xl">A growing toolkit<span className="text-[#53caff]">.</span></h2>
                <p className="max-w-[300px] text-xs leading-6 text-white/45">Tools are just tools. What matters is choosing the right one for the feeling and the job.</p>
              </div>
              <div className="divide-y divide-white/[.08] border-y border-white/[.08]">
                {portfolio.skills.map((group, i) => <div key={group.category} className="grid gap-4 py-6 md:grid-cols-[170px_1fr] md:gap-8">
                  <div className="flex items-center gap-3"><span className="font-mono text-[9px] text-[#55c8f2]">0{i + 1}</span><span className="text-xs font-semibold text-white/75">{group.category}</span></div>
                  <div className="flex flex-wrap gap-2">{group.items.map((skill) => <span key={skill} className="skill-chip rounded-full border border-white/10 bg-white/[.025] px-3.5 py-2 font-mono text-[10px] text-white/60">{skill}</span>)}</div>
                </div>)}
              </div>
              <p className="mt-4 font-mono text-[9px] tracking-wider text-white/30">NO SCORES, NO BADGES — JUST THE TOOLS I REACH FOR.</p>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 border-y border-white/[.07] bg-[#10141c]">
          <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
            <div className="reveal mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div><SectionLabel number="03" label="SELECTED EXPERIMENTS" /><h2 className="mt-7 font-display text-4xl font-medium tracking-[-.05em] text-white md:text-6xl">Ideas in <span className="text-[#53caff]">motion.</span></h2></div>
              <p className="max-w-[330px] text-sm leading-6 text-white/50">A few editable concept projects — a starting point for the work still to come.</p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {portfolio.projects.map((project, index) => <motion.article key={project.number} className="group text-left" whileHover={reduceMotion ? undefined : { y: -6 }} transition={{ duration: .25 }} data-testid={`card-project-${project.number}`}>
                <div className={`relative aspect-[1.18] overflow-hidden rounded-sm border border-white/10 bg-[#17202b] ${project.accent}`}>
                  <ProjectArtwork accent={project.accent} number={project.number} />
                  <div className="absolute left-5 top-5 font-mono text-[9px] tracking-[.18em] text-white/65">{project.type.toUpperCase()}</div>
                  <div className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/20 text-white/80 transition group-hover:bg-[#4acaff] group-hover:text-[#07111a]" aria-hidden="true"><ArrowUpRight size={16} /></div>
                  <div className="absolute bottom-5 left-5 font-mono text-[9px] tracking-widest text-white/55">{project.year} / CONCEPT 0{index + 1}</div>
                </div>
                <div className="flex items-start justify-between gap-4 py-5">
                  <div><p className="font-display text-2xl font-semibold tracking-[-.04em] text-white">{project.title}</p><p className="mt-2 max-w-[280px] text-xs leading-5 text-white/50">{project.description}</p></div>
                  <span className="mt-1 font-mono text-[9px] text-[#54cbf4]">{project.number}</span>
                </div>
                <div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="font-mono text-[9px] text-white/35">{tag}<span className="ml-2 text-[#4fc9f4]/60">/</span></span>)}</div>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  {project.demo ? <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-[#55caff]/25 px-3 py-2 font-mono text-[9px] tracking-wide text-[#9be3ff] transition hover:bg-[#16354a]" data-testid={`link-project-live-${project.number}`}>LIVE DEMO <ExternalLink size={11} /></a> : <span className="rounded-full border border-white/10 px-3 py-2 font-mono text-[9px] text-white/35">LIVE DEMO / ADD LINK</span>}
                  {project.source ? <a href={project.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-2 font-mono text-[9px] tracking-wide text-white/60 transition hover:border-[#55caff]/40 hover:text-white" data-testid={`link-project-github-${project.number}`}><Github size={11} /> GITHUB</a> : <span className="rounded-full border border-white/10 px-3 py-2 font-mono text-[9px] text-white/35">GITHUB / ADD LINK</span>}
                  <button type="button" onClick={() => setActiveProject(index)} className="ml-auto inline-flex items-center gap-1.5 px-2 py-2 font-mono text-[9px] tracking-wide text-white/60 transition hover:text-[#75d9ff]" data-testid={`button-project-details-${project.number}`}>VIEW DETAILS <ArrowUpRight size={12} /></button>
                </div>
              </motion.article>)}
            </div>
            <p className="mt-10 border-l border-[#49c9f6]/50 pl-4 font-mono text-[9px] leading-5 tracking-wide text-white/40">SAMPLE CONCEPTS — EDIT TITLES, DETAILS, TAGS AND LINKS IN <span className="text-[#71d6fb]">src/data/portfolio.ts</span>.</p>
          </div>
        </section>

        <section id="journey" className="scroll-mt-24 mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="reveal grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
            <SectionLabel number="04" label="THE JOURNEY SO FAR" />
            <div>
              <div className="mb-11 flex items-end justify-between gap-4"><h2 className="font-display text-3xl font-medium tracking-[-.045em] text-white md:text-5xl">Learning, always<span className="text-[#53caff]">.</span></h2><span className="hidden font-mono text-[9px] tracking-[.16em] text-white/35 sm:block">A WORK IN PROGRESS</span></div>
              <div className="relative">
                <div className="absolute bottom-4 left-[7px] top-3 w-px bg-gradient-to-b from-[#4ecaff]/70 via-white/15 to-transparent" />
                <div className="space-y-8">
                  {portfolio.timeline.map((item, i) => <div key={`${item.kind}-${i}`} className="relative grid gap-3 pl-9 md:grid-cols-[130px_1fr] md:gap-8">
                    <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border border-[#52caff]/60 bg-[#10151e] before:absolute before:inset-[4px] before:rounded-full before:bg-[#54ccf8]" />
                    <span className="font-mono text-[10px] tracking-wide text-[#7b8998]">{item.period}</span>
                    <div className="border-b border-white/[.08] pb-7"><div className="flex flex-wrap items-center gap-3"><h3 className="font-display text-xl font-semibold text-white">{item.title}</h3><span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[8px] tracking-widest text-[#59c9ef]">{item.kind}</span></div><p className="mt-1 text-sm text-white/65">{item.organization}</p><p className="mt-3 max-w-[500px] text-xs leading-6 text-white/40">{item.detail}</p></div>
                  </div>)}
                </div>
              </div>
              <p className="mt-6 font-mono text-[9px] tracking-wide text-white/30">EDITABLE TIMELINE PLACEHOLDERS — REPLACE WITH YOUR OWN MILESTONES.</p>
            </div>
          </div>
        </section>

        <section id="github" className="scroll-mt-24 border-y border-white/[.07] bg-[#11151e]/65">
          <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
            <div className="reveal grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
              <SectionLabel number="05" label="OPEN SOURCE / GITHUB" />
              <div>
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div><div className="mb-5 flex items-center gap-3 text-[#64d1f6]"><Github size={19} /><span className="font-mono text-[9px] tracking-[.2em]">A WINDOW INTO THE WORK</span></div><h2 className="font-display text-3xl font-medium tracking-[-.05em] text-white md:text-5xl">Built in the open<span className="text-[#53caff]">.</span></h2></div>
                  {githubUrl && <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-4 py-2.5 font-mono text-[10px] text-white/70 transition hover:border-[#55caff] hover:text-[#55caff]" data-testid="link-github-profile">VISIT PROFILE <ExternalLink size={12} /></a>}
                </div>
                <div className="mt-9 grid gap-4 border border-dashed border-[#58caff]/25 bg-[#0b1822]/65 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
                  <div><p className="font-mono text-[9px] tracking-[.2em] text-[#65cbed]">{portfolio.githubUsername ? 'CONFIGURED PROFILE' : 'PROFILE PLACEHOLDER'}</p>
                    {portfolio.githubUsername ? <a href={githubUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 font-display text-lg text-white hover:text-[#54caff]" data-testid="link-github-profile">@{portfolio.githubUsername}<ArrowUpRight size={15} /></a> : <p className="mt-2 font-display text-lg text-white/70" data-testid="text-github-username-placeholder">@{portfolio.githubUsernamePlaceholder}</p>}
                    <p className="mt-2 max-w-[520px] text-xs leading-6 text-white/45">No GitHub API is connected. Repository and contribution data stay empty until a real data source is configured.</p>
                  </div>
                  {githubUrl && <a href={githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 justify-self-start rounded-full border border-white/15 px-4 py-2.5 font-mono text-[9px] text-white/65 hover:border-[#55caff] hover:text-[#55caff]" data-testid="link-github-open">OPEN PROFILE <ExternalLink size={12} /></a>}
                </div>
                <div className="mt-9 grid gap-9 xl:grid-cols-[.9fr_1.1fr]">
                  <div>
                    <div className="mb-4 flex items-center justify-between"><h3 className="font-display text-sm font-semibold text-white">Repositories</h3><span className="font-mono text-[9px] tracking-widest text-white/35">NO REPO DATA</span></div>
                    <div className="grid gap-3">
                      {[1, 2].map((slot) => <div key={slot} className="flex min-h-[92px] items-center gap-4 border border-white/10 bg-[#0c121a]/70 p-4" data-testid={`github-empty-repository-${slot}`}>
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-[#62cbed]"><Code2 size={15} /></div>
                        <div><p className="font-mono text-[9px] tracking-widest text-white/55">REPOSITORY SLOT {String(slot).padStart(2, '0')}</p><p className="mt-1 text-[11px] text-white/35">Real repository details will appear after GitHub data is configured.</p></div>
                      </div>)}
                    </div>
                  </div>
                  <div>
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h3 className="font-display text-sm font-semibold text-white">Contribution activity</h3><span className="font-mono text-[9px] tracking-widest text-white/35">EMPTY / NO ACTIVITY DATA</span></div>
                    <div className="border border-white/10 bg-[#0c121a]/70 p-4 sm:p-5">
                      <div className="grid grid-cols-12 gap-1.5 sm:grid-cols-[repeat(16,minmax(0,1fr))] sm:gap-2" aria-label="Empty contribution activity visualization. Real activity will appear after GitHub is configured." data-testid="github-empty-activity">
                        {Array.from({ length: 48 }, (_, cell) => <span key={cell} className="aspect-square rounded-[2px] border border-white/[.035] bg-white/[.035]" />)}
                      </div>
                      <p className="mt-4 text-[11px] leading-5 text-white/40">Real activity will appear after a GitHub username and data source are configured. No contribution history is represented here.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-24 mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
          <div className="reveal grid gap-12 lg:grid-cols-[.55fr_1.45fr]">
            <SectionLabel number="06" label="WAYS TO WORK TOGETHER" />
            <div>
              <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><h2 className="font-display text-3xl font-medium tracking-[-.05em] text-white md:text-5xl">Good work, together<span className="text-[#53caff]">.</span></h2><Sparkles size={20} className="hidden text-[#5bcef6] sm:block" /></div>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {portfolio.services.map((service) => <div key={service.number} className="group grid gap-3 py-6 transition md:grid-cols-[70px_1fr_1fr_28px] md:items-center">
                  <span className="font-mono text-[10px] text-[#57c7ed]">{service.number}</span><h3 className="font-display text-xl font-medium text-white transition group-hover:text-[#83dcff]">{service.title}</h3><p className="text-xs leading-6 text-white/45">{service.description}</p><ArrowRight size={15} className="hidden text-white/30 transition group-hover:translate-x-1 group-hover:text-[#54caff] md:block" />
                </div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 border-t border-white/[.07] bg-[#10151d]">
          <div className="mx-auto max-w-[1320px] px-5 py-28 md:px-10 md:py-36">
            <div className="reveal grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
              <div><SectionLabel number="07" label="START A CONVERSATION" /><h2 className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-[-.055em] text-white md:text-6xl">Have a good<br />one in mind<span className="text-[#53caff]">?</span></h2>
                <p className="mt-6 max-w-[390px] text-sm leading-7 text-white/50">Have a project, an idea, or a question? Leave a note. The form is ready for a real sending service when one is connected.</p>
                <div className="mt-10 space-y-4">
                  {portfolio.email ? <a href={`mailto:${portfolio.email}`} className="flex items-center gap-3 text-sm text-[#89dcfb] hover:text-white" data-testid="link-email"><AtSign size={16} />{portfolio.email}<ArrowUpRight size={13} /></a> : <p className="flex items-center gap-3 text-xs text-white/45"><AtSign size={16} className="text-[#56c8f1]" />Email address not configured yet</p>}
                  <div className="flex flex-wrap gap-4 pt-3">
                    {portfolio.socials.map((social) => social.href ? <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[9px] tracking-widest text-white/45 transition hover:text-[#61d1f5]" data-testid={`link-social-${social.label.toLowerCase()}`}>{social.label.toUpperCase()} <ArrowUpRight size={11} /></a> : <span key={social.label} className="font-mono text-[9px] tracking-widest text-white/25">{social.label.toUpperCase()} / ADD LINK</span>)}
                  </div>
                </div>
              </div>
              <form onSubmit={submitContact} noValidate className="border border-white/10 bg-[#0d121a] p-5 sm:p-8" data-testid="form-contact">
                <div className="mb-7 flex items-center justify-between"><span className="font-mono text-[9px] tracking-[.2em] text-[#60ccef]">YOUR NOTE</span><span className="font-mono text-[9px] text-white/30">ALL FIELDS REQUIRED</span></div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block"><span className="mb-2 block font-mono text-[9px] tracking-widest text-white/45">YOUR NAME</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#58caff]" placeholder="Name" data-testid="input-contact-name" /></label>
                  <label className="block"><span className="mb-2 block font-mono text-[9px] tracking-widest text-white/45">EMAIL ADDRESS</span><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" autoComplete="email" className="w-full border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#58caff]" placeholder="you@example.com" data-testid="input-contact-email" /></label>
                </div>
                <label className="mt-7 block"><span className="mb-2 block font-mono text-[9px] tracking-widest text-white/45">WHAT'S ON YOUR MIND?</span><textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={4} className="w-full resize-y border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-[#58caff]" placeholder="A little context goes a long way..." data-testid="input-contact-message" /></label>
                {formError && <p role="alert" className="mt-5 text-xs text-[#ff9b91]" data-testid="status-contact-error">{formError}</p>}
                {formFeedback && <p role="status" className="mt-5 border border-[#58caff]/20 bg-[#10202b] p-3 text-xs leading-5 text-[#a9e8ff]" data-testid="status-contact-feedback"><Check size={14} className="mr-2 inline" />{formFeedback}</p>}
                <div className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><button type="submit" className="inline-flex items-center gap-3 rounded-full bg-[#4ac8fa] px-6 py-3.5 text-xs font-extrabold tracking-wider text-[#07111a] transition hover:bg-[#97e1ff]" data-testid="button-contact-submit">PREPARE MESSAGE <Send size={14} /></button><span className="max-w-[200px] font-mono text-[9px] leading-4 text-white/30">No message will be sent from this demo form.</span></div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[.07]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-5 px-5 py-7 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <a href="#home" className="font-display text-xs font-bold tracking-[.2em] text-white/80" data-testid="link-footer-home">SEYHA<span className="ml-2 font-mono font-normal tracking-normal text-white/30">/ MAKING THE WEB FEEL</span></a>
          <p className="font-mono text-[9px] tracking-wider text-white/30">DESIGNED TO FEEL. BUILT TO WORK. © {new Date().getFullYear()}</p>
          <a href="#home" className="flex items-center gap-2 font-mono text-[9px] tracking-widest text-white/50 transition hover:text-[#5bd0f7]" data-testid="link-back-top">BACK TO TOP <ArrowUp size={13} /></a>
        </div>
      </footer>

      <AnimatePresence>
        {scrollTop && <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })} className="fixed bottom-6 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-[#56caff]/30 bg-[#111b25]/90 text-[#7cddff] shadow-lg backdrop-blur md:bottom-8 md:right-8" aria-label="Back to top" data-testid="button-back-top"><ArrowUp size={17} /></motion.button>}
      </AnimatePresence>

      <AnimatePresence>
        {currentProject && <motion.div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveProject(null); }}>
          <motion.div ref={projectDialog} role="dialog" aria-modal="true" aria-labelledby="project-title" tabIndex={-1} initial={reduceMotion ? false : { opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} className="max-h-[90vh] w-full max-w-[640px] overflow-y-auto border border-white/15 bg-[#111721] shadow-2xl">
            <div className={`relative h-52 ${currentProject.accent}`}><ProjectArtwork accent={currentProject.accent} number={currentProject.number} /><button onClick={() => setActiveProject(null)} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/40 text-white" aria-label="Close project details" data-testid="button-close-project"><X size={17} /></button><span className="absolute bottom-4 left-5 font-mono text-[9px] tracking-[.2em] text-white/65">{currentProject.type.toUpperCase()} / SAMPLE PROJECT</span></div>
            <div className="p-6 sm:p-9"><div className="flex items-start justify-between gap-4"><div><span className="font-mono text-[9px] tracking-widest text-[#5bcaf1]">PROJECT {currentProject.number}</span><h2 id="project-title" className="mt-2 font-display text-3xl font-semibold text-white">{currentProject.title}</h2></div><button onClick={() => setActiveProject((activeProject! + portfolio.projects.length - 1) % portfolio.projects.length)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-white/60 hover:border-[#55caff] hover:text-white" aria-label="Previous project" data-testid="button-previous-project"><ArrowLeft size={15} /></button><button onClick={() => setActiveProject((activeProject! + 1) % portfolio.projects.length)} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-white/60 hover:border-[#55caff] hover:text-white" aria-label="Next project" data-testid="button-next-project"><ArrowRight size={15} /></button></div>
              <p className="mt-5 text-sm leading-7 text-white/60">{currentProject.detail}</p><div className="mt-6 flex flex-wrap gap-2">{currentProject.tags.map((tag) => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] text-white/50">{tag}</span>)}</div>
              <div className="mt-8 flex flex-wrap gap-3">
                {currentProject.demo ? <a href={currentProject.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#4ac8fa] px-5 py-3 text-[10px] font-bold tracking-wider text-[#07111a]" data-testid="link-project-demo">LIVE DEMO <Globe2 size={13} /></a> : <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 font-mono text-[9px] tracking-wider text-white/35">DEMO LINK / ADD URL</span>}
                {currentProject.source ? <a href={currentProject.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-[10px] font-bold tracking-wider text-white/70 hover:border-[#56caff]" data-testid="link-project-source">SOURCE <Github size={13} /></a> : <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 font-mono text-[9px] tracking-wider text-white/35">SOURCE / ADD URL</span>}
              </div>
            </div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return <div className="flex items-center gap-3"><span className="font-mono text-[10px] text-[#56c9f3]">{number}</span><span className="h-px w-8 bg-[#56c9f3]/50" /><span className="font-mono text-[9px] tracking-[.2em] text-white/45">{label}</span></div>;
}

function ProjectArtwork({ accent, number }: { accent: string; number: string }) {
  const bg = accent === 'blue' ? 'from-[#173c5b] via-[#15506b] to-[#14263a]' : accent === 'cyan' ? 'from-[#0d3d49] via-[#17637a] to-[#172c3a]' : 'from-[#194342] via-[#2a6561] to-[#1e3037]';
  return <div aria-hidden="true" className={`absolute inset-0 overflow-hidden bg-gradient-to-br ${bg}`}>
    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(209,238,255,.14) 1px, transparent 1px),linear-gradient(90deg,rgba(209,238,255,.14) 1px,transparent 1px)', backgroundSize: '34px 34px' }} />
    <div className="absolute left-[20%] top-[23%] h-[55%] w-[65%] rotate-[-8deg] border border-white/15 bg-[#07141f]/35 shadow-2xl backdrop-blur-sm transition-transform duration-700 group-hover:rotate-[-4deg] group-hover:scale-[1.03]">
      <div className="flex h-7 items-center gap-1 border-b border-white/10 px-3"><i className="h-1.5 w-1.5 rounded-full bg-[#ff7d69]/70" /><i className="h-1.5 w-1.5 rounded-full bg-[#f3cc71]/70" /><i className="h-1.5 w-1.5 rounded-full bg-[#62d4a1]/70" /><span className="ml-2 font-mono text-[7px] text-white/35">seyha.studio / {number}</span></div>
      <div className="p-4"><div className="h-[5px] w-[44%] bg-[#77d9ff]/65" /><div className="mt-3 h-[3px] w-[70%] bg-white/25" /><div className="mt-1.5 h-[3px] w-[57%] bg-white/15" /><div className="mt-4 flex gap-2"><div className="h-12 flex-1 bg-white/[.08]" /><div className="h-12 flex-1 bg-[#4cc7f6]/20" /></div></div>
    </div>
    <span className="absolute bottom-2 right-5 font-display text-[108px] font-bold leading-none tracking-[-.1em] text-white/[.075]">{number}</span>
    <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full border border-white/10" /><div className="absolute -right-3 -top-7 h-32 w-32 rounded-full border border-white/[.08]" />
  </div>;
}

export default App;
