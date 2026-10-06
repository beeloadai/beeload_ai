import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowUpRight,
  ChevronDown,
  CircleArrowUp,
  ExternalLink,
  Github,
  Linkedin,
  Menu,
  MoveUpRight,
  Quote,
  X,
} from 'lucide-react';

type Pillar = { label: string; title: string; description: string };
type Publication = { date: string; type: string; title: string; excerpt: string };

const languages = [
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'es', label: 'ES' },
  { code: 'ru', label: 'RU' },
  { code: 'zh', label: 'ZH' },
] as const;

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`logo ${compact ? 'logo--compact' : ''}`} href="#top" aria-label="Beeload home">
      <img className="logo-image" src="/assets/images/1791265721230.png" alt="" aria-hidden="true" />
      {!compact && <span className="logo-word">beeload<span>.</span></span>}
    </a>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const pillars = t('pillars', { returnObjects: true }) as Pillar[];
  const publications = t('publicationsData', { returnObjects: true }) as Publication[];
  const activeLanguage = languages.find((language) => language.code === i18n.language) ?? languages[0];
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell" id="top">
      <div className="utility-bar"><span>{t('utility')}</span><span className="utility-status"><i /> {t('systems')} <span className="utility-separator">/</span> 2026.10</span></div>

      <header className="site-header">
        <Logo />
        <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`} aria-label="Main navigation">
          {Object.entries(t('nav', { returnObjects: true }) as Record<string, string>).map(([key, label]) => (
            <a key={key} href={`#${key}`} onClick={closeMenu}>{label}</a>
          ))}
          <a className="mobile-contact" href="mailto:ceo@beeload.it" onClick={closeMenu}>{t('contact')} <ArrowUpRight size={15} /></a>
        </nav>
        <div className="header-actions">
          <label className="language-picker" aria-label={t('language')}>
            <span>{activeLanguage.label}</span><ChevronDown size={13} />
            <select value={activeLanguage.code} onChange={(event) => i18n.changeLanguage(event.target.value)} aria-label={t('language')}>
              {languages.map((language) => <option value={language.code} key={language.code}>{language.label}</option>)}
            </select>
          </label>
          <a className="button button--small header-contact" href="mailto:ceo@beeload.it">{t('contact')} <ArrowUpRight size={15} /></a>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </header>

      <main>
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> Beeload <span className="eyebrow-slash">//</span> {t('heroTag')}</div>
            <h1>{t('heroTitle')}</h1>
            <p className="hero-description">{t('heroSubtitle')}</p>
            <div className="hero-actions"><a className="button" href="#research">{t('explore')} <ArrowUpRight size={16} /></a><a className="text-link" href="#company">{t('about')} <CircleArrowUp size={17} /></a></div>
          </div>
          <div className="hero-aside">
            <div className="hero-aside-label">01 <span>{t('featured')}</span></div>
            <a className="feature-card" href="#publications">
              <div className="feature-visual"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="visual-core"><img src="/assets/images/1791265721230.png" alt="" aria-hidden="true" /></div><span className="visual-caption">AGI / 01</span></div>
              <div className="feature-info"><div className="card-kicker">{t('researchPaper')} <span>08.14.26</span></div><h2>Autonomous Agent Frameworks &amp; AGI Trajectories</h2><span className="card-link">{t('readPaper')} <ArrowUpRight size={16} /></span></div>
            </a>
          </div>
        </section>

        <div className="signal-row section-wrap"><span>01 — 04</span><div className="signal-line"><i /></div><span>{t('selectedSignals')}</span><span className="signal-year">{t('established')}</span></div>

        <section className="pillars section-wrap" id="research">
          <div className="section-intro"><span className="section-number">01</span><div><p className="section-label">{t('whatWeDo')}</p><h2>{t('fourDirections')}<br /><span>{t('sharedHorizon')}</span></h2></div><p className="section-note">{t('pillarsIntro')}</p></div>
          <div className="pillar-grid">{pillars.map((pillar, index) => <button className={`pillar-card ${activePillar === index ? 'pillar-card--active' : ''}`} key={pillar.title} onMouseEnter={() => setActivePillar(index)} onFocus={() => setActivePillar(index)}><div className="pillar-top"><span>0{index + 1}</span><ArrowUpRight size={18} /></div><div><span className="pillar-label">{pillar.label}</span><h3>{pillar.title}</h3><p>{pillar.description}</p></div><div className="pillar-progress"><i /></div></button>)}</div>
        </section>

        <section className="research-feed section-wrap" id="publications">
          <div className="feed-heading"><div><p className="section-label">{t('fromLab')}</p><h2>{t('latestResearch')}<br /><span>{t('publications')}</span></h2></div><a className="text-link" href="#publications">{t('viewAll')} <ArrowUpRight size={17} /></a></div>
          <div className="publication-list">{publications.map((publication, index) => <a className="publication-row" href="#publications" key={publication.title}><span className="publication-index">0{index + 1}</span><span className="publication-date">{publication.date}</span><span className="publication-type">{publication.type}</span><div className="publication-content"><h3>{publication.title}</h3><p>{publication.excerpt}</p></div><span className="publication-arrow"><MoveUpRight size={18} /></span></a>)}</div>
        </section>

        <section className="statement-section" id="disclosure"><div className="section-wrap statement-inner"><Quote size={31} className="quote-mark" /><blockquote>{t('disclosureQuote')}</blockquote><p>{t('disclosureText')}</p><div className="statement-signature"><span className="signature-line" /> {t('disclosurePrinciples')}</div></div></section>

        <section className="company section-wrap" id="company"><div className="company-heading"><span className="section-number">02</span><div><p className="section-label">{t('lab')}</p><h2>{t('institutionalTitle')}<br /><span>{t('institutionalEmphasis')}</span></h2></div></div><div className="company-grid"><div className="company-copy"><p className="lead">{t('institutionalLead')}</p><p>{t('institutionalBody')}</p><a className="text-link" href="mailto:ceo@beeload.it">{t('contact')} <ArrowUpRight size={17} /></a></div><div className="institutional-panel"><span className="panel-index">BEELOAD / 2026</span><div className="institutional-orbit"><div className="institutional-core"><img src="/assets/images/1791265721230.png" alt="" aria-hidden="true" /></div></div><span className="panel-caption">RESEARCH / SAFETY / SCALE</span></div></div></section>

        <section className="contact-band section-wrap" id="development"><div><span className="section-label">{t('contactQuestion')}</span><h2>{t('letsExplore')}</h2></div><a className="button button--light" href="mailto:ceo@beeload.it">{t('contactLab')} <ArrowUpRight size={16} /></a></section>
      </main>

      <footer className="site-footer section-wrap"><div className="footer-top"><Logo compact /><p>{t('footerText')}</p><div className="footer-socials"><a href="https://www.linkedin.com" aria-label="LinkedIn"><Linkedin size={16} /></a><a href="https://x.com" aria-label="X"><X size={16} /></a><a href="https://www.threads.net" aria-label="Threads"><span className="threads-icon">@</span></a><a href="https://github.com" aria-label="GitHub"><Github size={16} /></a><a href="mailto:ceo@beeload.it" aria-label="Email"><ExternalLink size={16} /></a></div></div><div className="footer-bottom"><span>{t('copyright')}</span><span>{t('footerNote')}</span><div className="footer-languages">{languages.map((language) => <button key={language.code} className={activeLanguage.code === language.code ? 'active' : ''} onClick={() => i18n.changeLanguage(language.code)}>{language.label}</button>)}</div><a href="#top">{t('backTop')} <ChevronDown size={14} className="back-top-icon" /></a></div></footer>
    </div>
  );
}

export default App;
