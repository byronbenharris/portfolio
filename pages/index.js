import Link from 'next/link'
import Image from 'next/image'
import Date from '@components/date'
import Header from '@components/header'
import styles from '@styles/layout.module.css'
import utilStyles from '@styles/utils.module.css'
import homeStyles from '@styles/Home.module.css'
import buttonStyles from '@styles/Button.module.css'


import { getSortedBlogData } from '@lib/blog'

export async function getStaticProps() {
  const allBlogData = getSortedBlogData()
  return {
    props: {
      allBlogData
    }
  }
}

export default function Home({ allBlogData }) {
  return (
    <div className={styles.container}>

      <Header/>

      <header className={styles.header}>
        <Image
          priority
          src="/profile.jpeg"
          className={utilStyles.borderCircle}
          height={144}
          width={144}
          alt="Ben Harris"
        />
        <h1 className={utilStyles.heading2Xl}>Ben Harris</h1>
        <p>Heyo, thanks for visiting my site!</p> 
        <p>I'm a software developer and aspiring entrepreneur. I'm currently getting a Master's in Computer Science at Rice University. Lately, I've gotten really interested in Web3 so HMU if you're into that too.</p>
      </header>

      <ul>
        <li><a href="#Background">Background</a></li>
        <li><a href="#Projects">Projects</a></li>
        <li><a href="#Blog">Blog</a></li>
        <li><a href="#Contact">Contact</a></li>
      </ul>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 id="Background" className={utilStyles.headingLg}>Background</h2>
        <div className={utilStyles.backgroundItem}>
          <p>For a formal writeup, check out my <a href='/resume.pdf' target="_blank">resume.</a></p>
        </div>
        <div className={utilStyles.backgroundItem}>
          <p>-- Work --</p>
        </div>
        <div className={utilStyles.backgroundItem}>
          <p><b>Enterprise Engineer Intern @ Facebook</b></p>
          <p>Austin, TX | June 2020 - August 2020</p>
          <p className={utilStyles.backgroundDescription}>Created new quick-select option for commonly used attachments in the invoice resolution tool’s email feature. Synced files changes from Google Drive shared folder to internal database via recurring PHP Script. Displayed categorized options via dropdown and attached data to email upon selection in React frontend. 1 of 3 interns chosen to present their project at quarterly enterprise engineering meeting attended by 200+ employees.</p>
        </div>
        <div className={utilStyles.backgroundItem}>
          <p><b>Software Engineer Intern @ Babylon Micro-Farms</b></p>
          <p>Charlottesville, VA | June 2019 - August 2019</p>
          <p className={utilStyles.backgroundDescription}>Implemented 150+ tests on a Django Rest Framework API (raising code coverage from 3% to 70%). Researched data generation methods for Django testing; built robust, interconnected factories with the Factory Boy package to instantiate model instances; and developed BASH scripts for virtual environment management.</p>
        </div>
        <div className={utilStyles.backgroundItem}>
          <p>-- Education --</p>
        </div>
        <div className={utilStyles.backgroundItem}>
          <p><b>Master's from Rice University</b></p>
          <p>Houston, TX | August 2021 - May 2021</p>
          <p className={utilStyles.backgroundDescription}>I'm sticking around for another year to get a Master's in Computer Science.</p>
        </div>
        <div className={utilStyles.backgroundItem}>
          <p><b>Bachelor's from Rice University</b></p>
          <p>Houston, TX | August 2017 - May 2021</p>
          <p className={utilStyles.backgroundDescription}>Majored in Computer Science and minored in Physics.</p>
        </div>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 id="Projects" className={utilStyles.headingLg}>Projects</h2>
        <div className={homeStyles.grid}>

          <div className={homeStyles.project}>
            <h2>Deep Speech Recognition</h2>
            <p><i>Python, TensorFlow</i></p>
            <p></p>
            <a href='https://github.com/byronbenharris/keyword-spotting' target="_blank">
              <button class={buttonStyles.button21} role="button">GitHub</button>
            </a>
          </div>

          <div className={homeStyles.project}>
            <h2>EZ PowerPoint</h2>
            <p><i>Python, Flask, JavaScript, HTML, CSS</i></p>
            <p></p>
            <a href='http://github.com/gachouchani1999/ezppt' target="_blank">
              <button class={buttonStyles.button21} role="button">GitHub</button>
            </a>
            <a href='http://devpost.com/software/ez-powerpoint' target="_blank">
              <button class={buttonStyles.button21} role="button">DevPost</button>
            </a>
          </div>

          <div className={homeStyles.project}>
            <h2>RL Trajectory Optimization</h2>
            <p><i>Python, Keras, OpenAI Gym</i></p>
            <p></p>
            <a href='http://github.com/byronbenharris/reinforcement-learning-trajectory-optimization' target="_blank">
              <button class={buttonStyles.button21} role="button">GitHub</button>
            </a>
          </div>

          <div className={homeStyles.project}>
            <h2>Superconductivity Classification</h2>
            <p><i>Python</i></p>
            <p></p>
            <a href='/sc-report.pdf' target="_blank">
              <button class={buttonStyles.button21} role="button">Report</button>
            </a>
          </div>

          <div className={homeStyles.project}>
            <h2>Personal Website</h2>
            <p><i>AWS, JavaScript, React, Next.js</i></p>
            <p>Just a simple site to display my projects and thoughts. You're looking at it rn!</p>
            <a href='' target="_blank">
              <button class={buttonStyles.button21} role="button">GitHub</button>
            </a>
          </div>

          <div className={homeStyles.project}>
            <h2>PID Motor Control</h2>
            <p><i>SolidWorks</i></p>
            <p></p>
            <a href='http://wiki.chssigma.com/index.php?title=Ben_and_Doug%27s_PID_Motor' target="_blank">
              <button class={buttonStyles.button21} role="button">Docs</button>
            </a>
          </div>

          <div className={homeStyles.project}>
            <h2>3D Printed Airplane</h2>
            <p><i>SolidWorks</i></p>
            <p></p>
            <a href='http://wiki.chssigma.com/index.php?title=BACON_Aerospace_Engineering:_3D-Printed_Airplane' target="_blank">
              <button class={buttonStyles.button21} role="button">Docs</button>
            </a>
          </div>

          <div className={homeStyles.project}>
            <h2>Robotic Hand</h2>
            <p><i>SolidWorks</i></p>
            <p></p>
            <a href='http://wiki.chssigma.com/index.php?title=Ben_Harris%27_Robotic_Hand' target="_blank">
              <button class={buttonStyles.button21} role="button">Docs</button>
            </a>
          </div>
        </div>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 id="Blog" className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
            {allBlogData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
                <Link href={`/blog/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
            </li>
            ))}
        </ul>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 id="Contact" className={utilStyles.headingLg}>Contact</h2>
        <p>Hit me up! I'm always down to collaborate and meet interesting people.</p>
        <ul>
          <li><a href="https://twitter.com/byronbenharris">Twitter</a></li>
          <li><a href="https://github.com/byronbenharris">GitHub</a></li>
          <li><a href="https://linkedin.com/in/byronbenharris">LinkedIn</a></li>
        </ul>
      </section>
      
    </div>
  )
}
