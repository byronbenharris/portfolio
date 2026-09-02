import Link from 'next/link'
import Date from '@components/date'
import Header from '@components/header'
import styles from '@styles/home.module.css'

import { getSortedBlogData } from '@lib/blog'

const projects = [
  {
    title: 'Deep Speech Recognition',
    description: 'A neural net that learned to recognize ten spoken keywords with 92% accuracy.',
    tools: 'Python, TensorFlow',
    href: 'https://github.com/byronbenharris/keyword-spotting'
  },
  {
    title: 'EZ PowerPoint',
    description: 'A weekend experiment that turns a text file into a summarized slide deck.',
    tools: 'Python, Flask, NLP',
    href: 'https://github.com/gachouchani1999/ezppt'
  },
  {
    title: 'RL Trajectory Optimization',
    description: 'An attempt to teach an agent to find better paths through interplanetary space.',
    tools: 'Python, TensorFlow, OpenAI Gym',
    href: 'https://github.com/byronbenharris/reinforcement-learning-trajectory-optimization'
  },
  {
    title: 'Superconductivity Classification',
    description: 'Using chemical composition to predict whether a material is a superconductor.',
    tools: 'Python, TensorFlow',
    href: '/sc-report.pdf'
  },
  {
    title: 'PID Motor Control',
    description: 'A small physical system that notices interference and corrects for it.',
    tools: 'Arduino, SolidWorks, Processing',
    href: 'http://wiki.chssigma.com/index.php?title=Ben_and_Doug%27s_PID_Motor'
  },
  {
    title: 'A Robotic Hand',
    description: 'A humanoid hand with an opposable thumb and wrist, designed in high school.',
    tools: 'SolidWorks',
    href: 'http://wiki.chssigma.com/index.php?title=Ben_Harris%27_Robotic_Hand'
  }
]

export async function getStaticProps() {
  return { props: { allBlogData: getSortedBlogData() } }
}

function Arrow() {
  return <span className={styles.arrow} aria-hidden="true">↗</span>
}

export default function Home({ allBlogData }) {
  return (
    <div className={styles.page}>
      <Header />

      <header className={styles.header}>
        <a className={styles.name} href="#top">Ben Harris</a>
        <nav aria-label="Main navigation">
          <a href="#notes">Notes</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main id="top">
        <section className={styles.intro}>
          <p className={styles.overline}>Hello, internet.</p>
          <h1>I&apos;m Ben. This is where I put things I&apos;ve made and things I&apos;ve been thinking about.</h1>
          <div className={styles.introNote}>
            <span aria-hidden="true">✦</span>
            <p>I&apos;m interested in software, science, and the messy process of turning an idea into something real. This site is a work in progress—just like everything else.</p>
          </div>
        </section>

        <section className={styles.section} id="notes">
          <div className={styles.sectionLabel}>
            <h2>Notes</h2>
            <p>Thoughts, unfinished and otherwise.</p>
          </div>

          <div className={styles.notes}>
            {allBlogData.map(({ id, date, title }) => (
              <Link href={`/blog/${id}`} key={id}>
                <a className={styles.note}>
                  <div>
                    <h3>{title}</h3>
                    <p>Read note <span aria-hidden="true">→</span></p>
                  </div>
                  <time><Date dateString={date} /></time>
                </a>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} id="projects">
          <div className={styles.sectionLabel}>
            <h2>Projects</h2>
            <p>Some things I&apos;ve enjoyed making.</p>
          </div>

          <div className={styles.projects}>
            {projects.map((project, index) => (
              <a className={styles.project} href={project.href} target="_blank" rel="noreferrer" key={project.title}>
                <span className={styles.projectNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.projectCopy}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <small>{project.tools}</small>
                </div>
                <Arrow />
              </a>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.about}`} id="about">
          <div className={styles.sectionLabel}>
            <h2>About</h2>
            <p>A little context.</p>
          </div>

          <div className={styles.aboutCopy}>
            <p className={styles.aboutLead}>I&apos;m a software developer and a generally curious person. I like learning how things work, following ideas further than is strictly necessary, and building tools that feel useful.</p>
            <p>I studied computer science and physics at Rice University, followed by a master&apos;s in computer science. Over the years I&apos;ve worked on web products, machine learning, hardware, and plenty of odd experiments in between.</p>
            <p>When I&apos;m not making something, I&apos;m probably reading, going down a research rabbit hole, or thinking about the next thing I want to try.</p>
            <div className={styles.aboutLinks}>
              <a href="https://github.com/byronbenharris" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
              <a href="https://linkedin.com/in/byronbenharris" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
              <a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <Arrow /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Made by Ben, with care.</p>
        <p>Last tended in {new globalThis.Date().getFullYear()}.</p>
      </footer>
    </div>
  )
}
