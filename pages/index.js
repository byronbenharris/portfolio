import Link from 'next/link'
import Image from 'next/image'
import Date from '@components/date'
import Header from '@components/header'
import styles from '@styles/layout.module.css'
import utilStyles from '@styles/utils.module.css'
import homeStyles from '../styles/Home.module.css'


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
        <p></p>
        
      </header>

      <ul>
        <li><a href="#Work">Work</a></li>
        <li><a href="#Projects">Projects</a></li>
        <li><a href="#Blog">Blog</a></li>
        <li><a href="#Contact">Contact</a></li>
      </ul>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 id="Work" className={utilStyles.headingLg}>Work</h2>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 id="Projects" className={utilStyles.headingLg}>Projects</h2>
        <div className={homeStyles.grid}>

          <a href="" className={homeStyles.card}>
            <h2>Download</h2>
            <p></p>
          </a>

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
        <ul>
          <li><a href="https://twitter.com/byronbenharris">Twitter</a></li>
          <li><a href="https://github.com/byronbenharris">GitHub</a></li>
          <li><a href="https://linkedin.com/in/byronbenharris">LinkedIn</a></li>
        </ul>
      </section>
      
    </div>
  )
}
