import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Facebook,
  Github,
  Linkedin,
  Send,
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
        <div className="portfolio-portrait-orbit">
          <div className="portfolio-portrait-frame">
            <img
              src={portrait}
              alt={`Portrait of ${portfolio.displayName}`}
              className="portfolio-portrait-image"
            />
          </div>
        </div>

        <p className="portfolio-hero-availability">{portfolio.availability}</p>
        <p className="portfolio-hero-greeting">
          Hey, I&apos;m <strong>{portfolio.displayName}</strong>
        </p>
        <h1 id="portfolio-hero-title" className="portfolio-hero-headline">
          I&apos;m a <span>Web Developer</span>
        </h1>
        <p className="portfolio-hero-role">{portfolio.role}</p>
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
      </motion.div>
    </section>
  );
}
