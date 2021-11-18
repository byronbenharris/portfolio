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
        
      </header>

      <ul>
        <li><a href="#Background">Background</a></li>
        <li><a href="#Projects">Projects</a></li>
        <li><a href="#Blog">Blog</a></li>
        <li><a href="#Contact">Contact</a></li>
      </ul>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 id="Background" className={utilStyles.headingLg}>Background</h2>
        <div className={utilStyles.headingMd}>
          <p><b>Enterprise Engineer Intern @ Facebook</b></p>
          <p>Austin, TX | June 2020 - August 2020</p>
          <p>Created new quick-select option for commonly used attachments in the invoice resolution tool’s email feature. Synced files changes from Google Drive shared folder to internal database via recurring PHP Script. Displayed categorized options via dropdown and attached data to email upon selection in React frontend. 1 of 3 interns chosen to present their project at quarterly enterprise engineering meeting attended by 200+ employees.</p>
        </div>
        <div className={utilStyles.headingMd}>
          <p><b>Software Engineer Intern @ Babylon Micro-Farms</b></p>
          <p>Charlottesville, VA | June 2019 - August 2019</p>
          <p>Implemented 150+ tests on a Django Rest Framework API (raising code coverage from 3% to 70%). Researched data generation methods for Django testing; built robust, interconnected factories with the Factory Boy package to instantiate model instances; and developed BASH scripts for virtual environment management.</p>
        </div>
        <div className={utilStyles.headingMd}>
          <p><b>Master's from Rice University</b></p>
          <p>Houston, TX | August 2021 - December 2022</p>
          <p></p>
        </div>
        <div className={utilStyles.headingMd}>
          <p><b>Bachelor's from Rice University</b></p>
          <p>Houston, TX | August 2017 - May 2021</p>
          <p>Majored in Computer Science and barely managed to minor in Physics.</p>
        </div>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 id="Projects" className={utilStyles.headingLg}>Projects</h2>
        <div className={homeStyles.grid}>

          <div className={homeStyles.project}>
            <Image
              priority
              src="/profile.jpeg"
              className={utilStyles.projectImage}
              height={144}
              width={144}
              alt="Ben Harris"
            />
            <h2>Keyword Recognition</h2>
            <p></p>
            <a href=''><button class={buttonStyles.button21} role="button">GitHub</button></a>
          </div>

          <div className={homeStyles.project}>
            <Image
              priority
              src="/projects/ez-ppt.png"
              className={utilStyles.projectImage}
              height={144}
              width={144}
              alt="Ben Harris"
            />
            <h2>EZ PowerPoint</h2>
            <p></p>
            <a href=''><button class={buttonStyles.button21} role="button">GitHub</button></a>
            <a href=''><button class={buttonStyles.button21} role="button">DevPost</button></a>
          </div>

          <div className={homeStyles.project}>
            <Image
              priority
              src="/profile.jpeg"
              className={utilStyles.projectImage}
              height={144}
              width={144}
              alt="Ben Harris"
            />
            <h2>RL Trajectory Optimization</h2>
            <p></p>
            <a href=''><button class={buttonStyles.button21} role="button">GitHub</button></a>
          </div>

          <div className={homeStyles.project}>
            <Image
              priority
              src="/profile.jpeg"
              className={utilStyles.projectImage}
              height={144}
              width={144}
              alt="Ben Harris"
            />
            <h2>Superconductivity Classification</h2>
            <p></p>
            <a href=''><button class={buttonStyles.button21} role="button">GitHub</button></a>
            <a href=''><button class={buttonStyles.button21} role="button">Report</button></a>
          </div>

          <div className={homeStyles.project}>
            <Image
              priority
              src="/profile.jpeg"
              className={utilStyles.projectImage}
              height={144}
              width={144}
              alt="Ben Harris"
            />
            <h2>Personal Website</h2>
            <p>You're looking at it!</p>
            <p><i>AWS, JavaScript, React, Next.js</i></p>
            <a href=''><button class={buttonStyles.button21} role="button">GitHub</button></a>
          </div>

          <div className={homeStyles.project}>
            <Image
              priority
              src="/profile.jpeg"
              className={utilStyles.projectImage}
              height={144}
              width={144}
              alt="Ben Harris"
            />
            <h2>PID Motor Control</h2>
            <p></p>
            <a href=''><button class={buttonStyles.button21} role="button">Docs</button></a>
          </div>

          <div className={homeStyles.project}>
            <Image
              priority
              src="/profile.jpeg"
              className={utilStyles.projectImage}
              height={144}
              width={144}
              alt="Ben Harris"
            />
            <h2>3D Printed Airplane</h2>
            <p></p>
            <a href=''><button class={buttonStyles.button21} role="button">Docs</button></a>
          </div>

          <div className={homeStyles.project}>
            <Image
              priority
              src="/profile.jpeg"
              className={homeStyles.projectImage}
              height={144}
              width={144}
              alt="Ben Harris"
            />
            <h2>Robotic Hand</h2>
            <p></p>
            <a href=''><button class={buttonStyles.button21} role="button">Docs</button></a>
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
        Hit me up! I'm always down to collaborate and meet interesting people.
        <ul>
          <li><a href="https://twitter.com/byronbenharris">Twitter</a></li>
          <li><a href="https://github.com/byronbenharris">GitHub</a></li>
          <li><a href="https://linkedin.com/in/byronbenharris">LinkedIn</a></li>
        </ul>
      </section>
      
    </div>
  )
}
