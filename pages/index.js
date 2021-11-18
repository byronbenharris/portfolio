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
      </header>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>About</h2>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Work</h2>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Projects</h2>
        <div className={homeStyles.grid}>

          <a href="" className={homeStyles.card}>
            <h2>Download</h2>
            <p></p>
          </a>

          <Link href="/docs">
            <a className={homeStyles.card}>
              <h2>Documentation</h2>
              <p></p>
            </a>
          </Link>

          <Link href="/list">
            <a className={homeStyles.card}>
              <h2>Explore</h2>
              <p></p>
            </a>
          </Link>

          <Link href="/upload">
            <a className={homeStyles.card}>
              <h2>Upload</h2>
              <p></p>
            </a>
          </Link>
        </div>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
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
        <h2 className={utilStyles.headingLg}>Contact</h2>
      </section>
      
    </div>
  )
}
