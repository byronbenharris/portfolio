import Link from 'next/link'
import Heading from '../components/heading'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Heading/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Digital Copyright Project
        </h1>

        <p className={styles.description}>
          Welcome to the Digital Copyright Project
        </p>

        <div className={styles.grid}>

          <a href="" className={styles.card}>
            <h2>Download</h2>
            <p></p>
          </a>

          <Link href="/docs">
            <a className={styles.card}>
              <h2>Documentation</h2>
              <p></p>
            </a>
          </Link>

          <Link href="/list">
            <a className={styles.card}>
              <h2>Explore</h2>
              <p></p>
            </a>
          </Link>

          <Link href="/upload">
            <a className={styles.card}>
              <h2>Upload</h2>
              <p></p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}
