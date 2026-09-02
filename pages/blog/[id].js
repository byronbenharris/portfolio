import Link from 'next/link'
import Date from '@components/date'
import Header from '@components/header'
import ProvenanceDemo from '@components/provenance-demo'
import { getAllBlogIds, getBlogData } from '@lib/blog'
import styles from '@styles/layout.module.css'

export async function getStaticProps({ params }) {
  const blogData = await getBlogData(params.id)
  return {
    props: {
      blogData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllBlogIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ blogData }) {
  return (
    <div className={styles.postPage}>
      <Header customTitle={blogData.title} customDescription={blogData.description} />
      <header className={styles.postNav}>
        <Link href="/"><a>Ben Harris</a></Link>
        <Link href="/#notes"><a>All notes</a></Link>
      </header>
      <article className={styles.article}>
        <div className={styles.articleHeader}>
          <p>Note</p>
          <h1>{blogData.title}</h1>
          <div className={styles.postDate}>
            <Date dateString={blogData.date} />
          </div>
        </div>
        {blogData.hasInteractiveDemo && blogData.interactiveDemo === 'git-provenance' ? (
          <>
            <div className={styles.prose} dangerouslySetInnerHTML={{ __html: blogData.contentSections[0] }} />
            <ProvenanceDemo />
            <div className={`${styles.prose} ${styles.proseContinuation}`} dangerouslySetInnerHTML={{ __html: blogData.contentSections[1] }} />
          </>
        ) : (
          <div className={styles.prose} dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
        )}
      </article>
      <div className={styles.postFooter}>
        <Link href="/">
          <a>← Back home</a>
        </Link>
      </div>
    </div>
  )
}
