import Link from 'next/link'
import Date from '@components/date'
import Header from '@components/header'
import styles from '@styles/home.module.css'

import { getSortedBlogData } from '@lib/blog'

const projects = [
  {
    title: 'Bridge News',
    description: 'A search engine that organizes claims, evidence, and counterclaims so it is easier to see where information comes from.',
    tools: 'Python, Django, PostgreSQL, LLMs',
    href: 'https://brdg.news',
    current: true
  },
  {
    title: 'RL Trajectory Optimization',
    description: 'An experiment in using reinforcement learning to find efficient paths through interplanetary space.',
    tools: 'Python, TensorFlow, OpenAI Gym',
    href: 'https://github.com/byronbenharris/reinforcement-learning-trajectory-optimization'
  },
  {
    title: 'Bowser',
    description: 'A tiny web browser I wrote in Rust to better understand how browsers work.',
    tools: 'Rust',
    href: 'https://github.com/byronbenharris/bowser'
  },
  {
    title: 'Superconductivity Classification',
    description: 'A model that predicts whether a material will be superconducting from its chemical composition.',
    tools: 'Python, TensorFlow',
    href: '/sc-report.pdf'
  },
  {
    title: 'Deep Speech Recognition',
    description: 'A neural network trained to recognize ten spoken keywords with 92% accuracy.',
    tools: 'Python, TensorFlow',
    href: 'https://github.com/byronbenharris/keyword-spotting'
  },
  {
    title: 'PID Motor Control',
    description: 'A motor-control system that detects physical interference and corrects for it.',
    tools: 'Arduino, SolidWorks, Processing',
    href: 'http://wiki.chssigma.com/index.php?title=Ben_and_Doug%27s_PID_Motor'
  },
  {
    title: 'A Robotic Hand',
    description: 'A humanoid hand with an opposable thumb and articulated wrist, designed in high school.',
    tools: 'SolidWorks',
    href: 'http://wiki.chssigma.com/index.php?title=Ben_Harris%27_Robotic_Hand'
  },
  {
    title: '3D-Printed Airplane',
    description: 'A 3D-printable model based on a small styrofoam airplane.',
    tools: 'SolidWorks',
    href: 'http://wiki.chssigma.com/index.php?title=BACON_Aerospace_Engineering:_3D-Printed_Airplane'
  }
]

export async function getStaticProps() {
  return { props: { allBlogData: getSortedBlogData() } }
}

function Arrow() {
  return <span className={styles.arrow} aria-hidden="true">↗</span>
}

function ProjectList({ items }) {
  return (
    <div className={styles.projects}>
      {items.map((project) => {
        const content = (
          <>
            <div className={styles.projectCopy}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>{project.tools}</small>
            </div>
            {project.href && <Arrow />}
          </>
        )

        return project.href ? (
          <a className={styles.project} href={project.href} target="_blank" rel="noreferrer" key={project.title}>{content}</a>
        ) : (
          <div className={styles.project} key={project.title}>{content}</div>
        )
      })}
    </div>
  )
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
          <h1>I&apos;m Ben. This is where I share things I&apos;ve made and ideas I&apos;ve been thinking through.</h1>
          <p className={styles.introNote}>I&apos;m interested in software, science, and what it takes to turn an idea into something real.</p>
        </section>

        <section className={styles.section} id="notes">
          <div className={styles.sectionLabel}>
            <h2>Notes</h2>
          </div>

          <div className={styles.notes}>
            {allBlogData.map(({ id, date, title }) => (
              <Link href={`/blog/${id}`} key={id}>
                <a className={styles.note}>
                  <div>
                    <h3>{title}</h3>
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
          </div>

          <div className={styles.projectGroups}>
            <div className={styles.projectGroup}>
              <p className={styles.projectGroupLabel}>Active</p>
              <ProjectList items={projects.filter((project) => project.current)} />
            </div>
            <div className={styles.projectGroup}>
              <p className={styles.projectGroupLabel}>Archived</p>
              <ProjectList items={projects.filter((project) => !project.current)} />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.about}`} id="about">
          <div className={styles.sectionLabel}>
            <h2>About</h2>
          </div>

          <div className={styles.aboutCopy}>
            <p className={styles.aboutLead}>I&apos;m a software developer and a curious person. I like understanding how things work, following ideas further than necessary, and building tools I find useful.</p>
            <p>I studied computer science and physics at Rice University, then completed a master&apos;s in computer science. I&apos;ve worked across web software, machine learning, hardware, and plenty of odd experiments in between.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Made by Ben.</p>
        <div className={styles.footerLinks}>
          <a href="https://github.com/byronbenharris" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          <a href="https://linkedin.com/in/byronbenharris" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <Arrow /></a>
        </div>
        <p>{new globalThis.Date().getFullYear()}</p>
      </footer>
    </div>
  )
}
