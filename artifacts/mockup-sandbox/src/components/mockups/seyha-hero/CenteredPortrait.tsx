import {
  ArrowDownRight,
  ArrowUpRight,
  Facebook,
  Github,
  Linkedin,
  Send,
} from "lucide-react";
import "./_group.css";

const portfolio = {
  role: "Frontend Developer / Creative Developer",
  availability: "Available for thoughtful collaborations",
  intro:
    "I build digital experiences where considered design meets clear, purposeful code.",
  socials: [
    { label: "GitHub", href: "https://github.com/seyha29", Icon: Github },
    { label: "Facebook", href: "https://www.facebook.com/share/1DhkUhdrsE/", Icon: Facebook },
    { label: "Telegram", href: "https://t.me/thanseyha11", Icon: Send },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/thanseyha?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      Icon: Linkedin,
    },
  ],
};

export function CenteredPortrait() {
  return (
    <main className="seyha-centered-hero relative">
      <div className="seyha-centered-brand" aria-label="SEYHA developer portfolio">
        SEYHA <span className="font-mono font-normal tracking-normal text-white/40">/ DEV</span>
      </div>
      <section className="seyha-centered-inner">
        <div className="seyha-portrait-orbit">
          <div className="seyha-portrait-frame">
            <img
              src="/__mockup/images/seyha-profile.webp"
              alt="Portrait of Than Seyha"
            />
          </div>
        </div>
        <p className="seyha-centered-availability">{portfolio.availability}</p>
        <p className="seyha-centered-greeting">
          Hey, I&apos;m <strong>Than Seyha</strong>
        </p>
        <h1 className="seyha-centered-headline">
          I&apos;m a <span>Web Developer</span>
        </h1>
        <p className="seyha-centered-role">{portfolio.role}</p>
        <p className="seyha-centered-intro">{portfolio.intro}</p>

        <div className="seyha-centered-actions">
          <a className="seyha-centered-primary" href="#work">
            Explore My Work <ArrowDownRight size={15} />
          </a>
          <a className="seyha-centered-secondary" href="#contact">
            Contact Me <ArrowUpRight size={14} />
          </a>
        </div>

        <nav className="seyha-centered-socials" aria-label="Social links">
          {portfolio.socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
}
