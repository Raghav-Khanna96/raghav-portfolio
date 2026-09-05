import { ArrowUpRight, ArrowDown, Plus, BadgeCheck, MoveUpRight } from 'lucide-react';
import Assembly from './assembly';
import Motion from './motion';

const profile = 'https://www.linkedin.com/in/raghav-khanna-52456a360/';
const email = 'mailto:khannaraghav2020@gmail.com';
const statement = 'I like the moment an idea stops being a sketch and starts becoming something you can hold.';

export default function Home() {
  return <>
    <Motion/>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="reading-progress" aria-hidden="true"/>
    <header className="site-header">
      <a href="#main" className="brand" aria-label="Raghav Khanna home"><span className="brand-symbol">rk<span>.</span></span><span>RAGHAV KHANNA<br/><span>MECHANICAL DESIGN</span></span></a>
      <span className="header-coordinate mono">CHENNAI, IN · 2026</span>
      <a className="header-contact" href={email}>Let’s talk <ArrowUpRight size={17}/></a>
    </header>
    <nav className="nav-dock" aria-label="Portfolio navigation">
      <a className="is-current" data-section="main" href="#main">Index</a>
      <a data-section="work" href="#work">Work</a>
      <a data-section="credentials" href="#credentials">Credentials</a>
      <a data-section="about" href="#about">About</a>
      <a data-section="contact" className="dock-contact" href="#contact" aria-label="Contact Raghav"><ArrowUpRight size={18}/></a>
    </nav>
    <main>
      <section id="main" className="hero" aria-labelledby="hero-title">
        <div className="hero-index mono"><span>INDEPENDENT MIND. ENGINEERING IN PROGRESS.</span><span>PORTFOLIO / 001</span></div>
        <h1 id="hero-title"><span className="name-mask"><span>Raghav</span></span><span className="name-mask"><span>Khanna<span className="accent">.</span></span></span></h1>
        <div className="hero-art"><Assembly/></div>
        <div className="hero-intro"><p>Mechanical engineering student.<br/>CAD designer.<br/><span>Obsessive about the details.</span></p><a className="circle-link" href="#work"><span className="circle-icon"><ArrowDown size={18}/></span>Discover my work</a></div>
        <div className="hero-foot mono"><span>VIT CHENNAI · B.TECH 2024—28</span><span className="availability"><i/> AVAILABLE FOR INTERNSHIPS</span><span className="hero-scroll">SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section id="work" className="work-section dark-surface">
        <div className="section-kicker mono"><span><i/> 01 / SELECTED WORK</span><span>MECHANICAL DESIGN · SOLIDWORKS</span></div>
        <div className="work-opening">
          <h2 data-reveal>Human effort.<br/><span>Mechanical<br/>support.</span></h2>
          <div className="work-intro" data-reveal><p>A wearable concept for the people doing the heavy lifting.</p><p>Back &amp; Upper-Body Assistive Exoskeleton — developed with my team for Grab the CAD.</p><div className="award-line"><span>3<span>rd</span></span><p>PLACE<br/><span>National CAD Hackathon</span></p></div></div>
        </div>
        <div className="exo-title" aria-hidden="true" data-reveal><span>EXO</span><span className="exo-dash">—</span><span>SKELETON</span></div>
        <div className="project-register" data-reveal>
          <p className="mono">THE DESIGN INTENT</p>
          <div><span className="mono">01</span><h3>Redistribute<br/>the load.</h3><p>Explore mechanical support during repetitive lifting and overhead tasks.</p></div>
          <div><span className="mono">02</span><h3>Keep movement<br/>natural.</h3><p>Work toward a lightweight, wearable system with freedom of movement.</p></div>
          <div><span className="mono">03</span><h3>Put people<br/>first.</h3><p>Address back and shoulder strain as a central design challenge.</p></div>
        </div>
        <details className="project-details">
          <summary><span>Inside the project <span className="mono">/ CONCEPT · PROCESS · TEAM</span></span><Plus size={24}/></summary>
          <div className="case-grid"><div><p className="mono">CONTEXT</p><p>Repetitive lifting and overhead work place demands on industrial workers’ backs and shoulders. We explored a wearable mechanical support concept for this problem.</p></div><div><p className="mono">PROCESS</p><p>We developed part models and assemblies in SOLIDWORKS, balancing design constraints and collaboration within the hackathon deadline.</p></div><div><p className="mono">OUTCOME</p><p>Our team secured 3rd place at Grab the CAD. The exoskeleton remains a design concept; reduced strain and improved ergonomics are design goals.</p></div><div><p className="mono">TEAM</p><p>Raghav Khanna<br/>Pranjal Tripathi<br/>Jadhav Om Ramchandra</p></div></div>
        </details>
      </section>

      <section id="credentials" className="credentials-section page-shell">
        <div className="section-kicker mono"><span><i/> 02 / CREDENTIALS</span><span>DASSAULT SYSTÈMES</span></div>
        <div className="credential-heading"><h2 data-reveal>Certified.<br/><span>Still curious.</span></h2><p data-reveal>Building a stronger foundation in<br/>design, manufacturing and sustainability.</p></div>
        <article className="cswa-row" data-reveal><div className="credential-number mono">01 / CAD DESIGN</div><div className="cswa-title"><h3>CSWA<span className="accent">.</span></h3><p>Certified SOLIDWORKS Associate</p></div><BadgeCheck className="credential-seal" size={94} strokeWidth={.7}/><div className="cswa-note"><span className="small-tag">NEW ADDITION</span><p>Part modeling.<br/>Assemblies.<br/>Design fundamentals.</p></div></article>
        <article className="credential-row" data-reveal><span className="credential-number mono">02 / MANUFACTURING</span><div><h3>Additive Manufacturing</h3><p>SOLIDWORKS Associate</p></div><div className="credential-meta mono"><span>JUL 2026</span><span>C-DUKCHMWY29</span></div><BadgeCheck size={25} strokeWidth={1.2}/></article>
        <article className="credential-row" data-reveal><span className="credential-number mono">03 / SUSTAINABILITY</span><div><h3>Sustainability</h3><p>SOLIDWORKS Associate</p></div><div className="credential-meta mono"><span>JUL 2026</span><span>C-XGALH587DV</span></div><BadgeCheck size={25} strokeWidth={1.2}/></article>
      </section>

      <section id="about" className="about-section page-shell">
        <div className="section-kicker mono"><span><i/> 03 / THE PERSON</span><span>A WORK IN PROGRESS, BY DESIGN.</span></div>
        <h2 className="ink-statement" data-ink aria-label={statement}>{statement.split(' ').map((word,i)=><span key={i} data-ink-word aria-hidden="true">{word} </span>)}</h2>
        <div className="about-grid"><div className="about-label" data-reveal><span className="large-asterisk" aria-hidden="true">✳</span><p>Curiosity is<br/>part of the process.</p></div><div className="about-copy" data-reveal><p>I’m a Mechanical Engineering undergraduate at VIT Chennai. I’m developing my practice through CAD, team projects and hands-on design challenges.</p><p>My interests span product design, manufacturing, automotive and mechanical R&amp;D. I’m looking for an internship where I can contribute to real engineering projects and learn from the people building them.</p><a className="text-link" href={profile} target="_blank" rel="noopener noreferrer">Meet me on LinkedIn <ArrowUpRight size={18}/></a></div><div className="journey" data-reveal><article><span className="mono">2024 — 2028</span><h3>B.Tech, Mechanical Engineering</h3><p>VIT Chennai</p></article><article><span className="mono">SEP 2025 — PRESENT</span><h3>CAD Club Member</h3><p>VIT Chennai</p></article><article><span className="mono">JUL 2026 — PRESENT</span><h3>Campus Ambassador</h3><p>E-Cell, IIT Bombay</p></article></div></div>
        <div className="toolbox" data-reveal><span className="mono">TOOLS OF THE TRADE</span><div>{['SOLIDWORKS','Fusion 360','Visualize','Flow Simulation','3D Printing'].map((tool,i)=><span key={tool}><small>0{i+1}</small>{tool}</span>)}</div></div>
      </section>

      <section id="hackathons" className="hackathon-section page-shell">
        <div className="section-kicker mono"><span><i/> 04 / OUTSIDE THE CLASSROOM</span><span>IDEAS UNDER PRESSURE</span></div>
        <div className="hackathon-heading"><h2 data-reveal>Less time.<br/><span>More possibility.</span></h2><div data-reveal><span className="hack-plus">+3</span><p>More hackathons recently,<br/>including Into the Gemma by GDG.</p></div></div>
        <div className="event-list"><article data-reveal><span className="mono">01</span><div><h3>Grab the CAD</h3><p>Assistive exoskeleton concept · Team collaboration</p></div><span className="event-result">3RD PLACE <ArrowUpRight size={16}/></span></article><article data-reveal><span className="mono">02</span><div><h3>NEURALDAO</h3><p>24 hours · Team Hustlers · VIT Chennai<br/><span>18–19 September 2025</span></p></div><span className="event-result">PARTICIPANT</span></article><article data-reveal><span className="mono">03</span><div><h3>Into the Gemma</h3><p>GDG · Hackathon</p></div><span className="event-result">PARTICIPANT</span></article></div>
        <p className="event-note">Selected hackathons. More opportunities to collaborate, work through constraints and turn ideas into solutions.</p>
      </section>

      <section id="contact" className="contact-section dark-surface">
        <div className="section-kicker mono"><span><i/> 05 / WHAT’S NEXT?</span><span>OPEN TO INTERNSHIPS &amp; COLLABORATIONS</span></div>
        <a className="contact-title" href={email}><h2>Something<br/>in mind<span>?</span></h2><span className="contact-arrow"><MoveUpRight strokeWidth={1}/></span></a>
        <div className="contact-bottom"><p>Let’s talk about it.</p><a href={email}>khannaraghav2020@gmail.com <ArrowUpRight size={20}/></a><a href={profile} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={17}/></a></div>
        <footer><span className="mono">© 2026 RAGHAV KHANNA</span><span className="mono">DESIGNED WITH INTENT.</span><a href="#main" className="mono">BACK TO TOP ↑</a></footer>
      </section>
    </main>
  </>;
}


