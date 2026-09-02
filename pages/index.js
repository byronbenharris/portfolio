import Link from 'next/link'
import Image from 'next/image'
import Date from '@components/date'
import Header from '@components/header'
import styles from '@styles/home.module.css'

import { getSortedBlogData } from '@lib/blog'

const projects = [
  {
    number: '01', title: 'Deep Speech Recognition',
    description: 'A neural network trained to recognize ten spoken keywords with 92% accuracy.',
    stack: ['Python', 'TensorFlow'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/byronbenharris/keyword-spotting' }], tone: 'blue'
  },
  {
    number: '02', title: 'EZ PowerPoint',
    description: 'A web app that turns long-form text into concise, ready-to-present slide decks.',
    stack: ['Flask', 'NLP', 'JavaScript'],
    links: [
      { label: 'GitHub', href: 'https://github.com/gachouchani1999/ezppt' },
      { label: 'DevPost', href: 'https://devpost.com/software/ez-powerpoint' }
    ], tone: 'coral'
  },
  {
    number: '03', title: 'RL Trajectory Optimization',
    description: 'An experimental reinforcement-learning approach to interplanetary flight paths.',
    stack: ['Python', 'OpenAI Gym', 'TensorFlow'],
    links: [{ label: 'View on GitHub', href: 'https://github.com/byronbenharris/reinforcement-learning-trajectory-optimization' }], tone: 'yellow'
  },
  {
    number: '04', title: 'Superconductivity Classification',
    description: 'A chemical-composition model that classifies superconductors at 96% accuracy.',
    stack: ['Python', 'TensorFlow'],
    links: [{ label: 'Read the report', href: '/sc-report.pdf' }], tone: 'mint'
  }
]

const experiments = [
  { title: 'Personal Website', type: 'Next.js / React', href: 'https://github.com/byronbenharris/portfolio' },
  { title: 'PID Motor Control', type: 'Arduino / SolidWorks', href: 'http://wiki.chssigma.com/index.php?title=Ben_and_Doug%27s_PID_Motor' },
  { title: '3D Printed Airplane', type: 'SolidWorks', href: 'http://wiki.chssigma.com/index.php?title=BACON_Aerospace_Engineering:_3D-Printed_Airplane' },
  { title: 'Robotic Hand', type: 'SolidWorks', href: 'http://wiki.chssigma.com/index.php?title=Ben_Harris%27_Robotic_Hand' }
]

export async function getStaticProps() {
  return { props: { allBlogData: getSortedBlogData() } }
}

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" /></svg>
}

function ExternalLink({ href, children, className = '' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ArrowIcon /></a>
}

export default function Home({ allBlogData }) {
  return (
    <div className={styles.site}>
      <Header />

      <nav className={styles.nav} aria-label="Main navigation">
        <a className={styles.wordmark} href="#top" aria-label="Ben Harris, home">
          <span>BH</span><span className={styles.wordmarkText}>Ben Harris<br />Builds things</span>
        </a>
        <div className={styles.navLinks}>
          <a href="#work">Work</a><a href="#about">About</a><a href="#notes">Notes</a>
        </div>
        <a className={styles.navCta} href="#contact">Let&apos;s talk <span>↓</span></a>
      </nav>

      <main>
        <section className={styles.hero} id="top">
          <div className={styles.heroCopy}>
            <div className={styles.eyebrow}><span /> Software engineer &amp; product builder</div>
            <h1>I make ambitious ideas <em>work.</em></h1>
            <p className={styles.heroIntro}>I&apos;m Ben—a developer with an appetite for useful software, strange experiments, and the space where technical depth meets good product thinking.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#work">Explore my work <ArrowIcon /></a>
              <a className={styles.textLink} href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <span>↗</span></a>
            </div>
          </div>
          <div className={styles.portraitWrap}>
            <div className={styles.portraitFrame}>
              <Image priority src="/profile.jpeg" layout="fill" objectFit="cover" alt="Ben Harris standing beneath the brick arches at Rice University" />
            </div>
            <div className={styles.photoTag}>Based in the U.S. <span>●</span> Open to interesting problems</div>
            <span className={styles.spark}>✳</span>
          </div>
        </section>

        <div className={styles.marquee} aria-hidden="true"><div>ENGINEERING <span>✦</span> PRODUCTS <span>✦</span> MACHINE LEARNING <span>✦</span> EXPERIMENTS <span>✦</span> ENGINEERING <span>✦</span> PRODUCTS <span>✦</span></div></div>

        <section className={styles.work} id="work">
          <div className={styles.sectionHeading}>
            <div><span className={styles.sectionNumber}>01</span><p>Selected work</p></div>
            <h2>A few things I&apos;ve<br /><em>made real.</em></h2>
            <p>Projects across machine learning, product engineering, and scientific computing.</p>
          </div>
          <div className={styles.projectGrid}>
            {projects.map((project) => (
              <article className={`${styles.projectCard} ${styles[project.tone]}`} key={project.title}>
                <div className={styles.cardTop}><span>{project.number}</span><div className={styles.projectGlyph} aria-hidden="true"><i /><i /><i /></div></div>
                <div className={styles.cardBody}>
                  <div className={styles.tags}>{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <h3>{project.title}</h3><p>{project.description}</p>
                  <div className={styles.cardLinks}>{project.links.map((link) => <ExternalLink href={link.href} key={link.label}>{link.label}</ExternalLink>)}</div>
                </div>
              </article>
            ))}
          </div>
          <div className={styles.archive}>
            <h3>More experiments</h3>
            {experiments.map((item, index) => (
              <ExternalLink href={item.href} className={styles.archiveRow} key={item.title}>
                <span className={styles.archiveIndex}>0{index + 5}</span><strong>{item.title}</strong><span>{item.type}</span>
              </ExternalLink>
            ))}
          </div>
        </section>

        <section className={styles.about} id="about">
          <div className={styles.aboutIntro}>
            <span className={styles.sectionNumber}>02</span><p className={styles.kicker}>About / background</p>
            <h2>Curious by default.<br /><em>Practical on purpose.</em></h2>
          </div>
          <div className={styles.aboutCopy}>
            <p className={styles.lede}>I like learning quickly, getting close to the problem, and turning ambiguity into something people can actually use.</p>
            <p>My background spans full-stack engineering, applied machine learning, and hardware projects. I studied Computer Science and Physics at Rice, then stayed for a Master&apos;s in Computer Science.</p>
            <ExternalLink href="/resume.pdf" className={styles.inlineLink}>Download my résumé</ExternalLink>
          </div>
          <div className={styles.timeline}>
            <div className={styles.timelineRow}><span>2020</span><strong>Enterprise Engineer Intern</strong><p>Facebook · Austin, TX</p></div>
            <div className={styles.timelineRow}><span>2019</span><strong>Software Engineer Intern</strong><p>Babylon Micro-Farms · Charlottesville, VA</p></div>
            <div className={styles.timelineRow}><span>Rice</span><strong>M.S. Computer Science</strong><p>B.S. Computer Science · Physics minor</p></div>
          </div>
        </section>

        <section className={styles.notes} id="notes">
          <div className={styles.sectionHeading}>
            <div><span className={styles.sectionNumber}>03</span><p>Field notes</p></div>
            <h2>Thinking<br /><em>out loud.</em></h2>
            <p>Occasional writing about things I&apos;m learning, building, or trying to understand.</p>
          </div>
          <div className={styles.noteList}>
            {allBlogData.map(({ id, date, title }, index) => (
              <Link href={`/blog/${id}`} key={id}><a className={styles.noteRow}>
                <span>0{index + 1}</span><strong>{title}</strong><time><Date dateString={date} /></time><ArrowIcon />
              </a></Link>
            ))}
          </div>
        </section>

        <section className={styles.contact} id="contact">
          <p>Have an idea, a hard problem, or just a good story?</p>
          <h2>Let&apos;s make something<br /><em>worth talking about.</em></h2>
          <a href="https://linkedin.com/in/byronbenharris" target="_blank" rel="noreferrer">Start a conversation <ArrowIcon /></a><span className={styles.contactStar}>✳</span>
        </section>
      </main>

      <footer className={styles.footer}>
        <div><strong>Ben Harris</strong><span>Engineer / builder / relentlessly curious</span></div>
        <div className={styles.socials}>
          <a href="https://github.com/byronbenharris" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://linkedin.com/in/byronbenharris" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href="https://twitter.com/byronbenharris" target="_blank" rel="noreferrer">Twitter ↗</a>
        </div>
        <span>© {new globalThis.Date().getFullYear()} · Built with intention</span>
      </footer>
    </div>
  )
}
