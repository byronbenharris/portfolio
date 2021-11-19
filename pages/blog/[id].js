import Link from 'next/link'
import Date from '@components/date'
import Header from '@components/header'
import { getAllBlogIds, getBlogData } from '@lib/blog'
import styles from '@styles/layout.module.css'
import utilStyles from '@styles/utils.module.css'

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
    <div className={styles.container}>
      <Header customTitle={blogData.title} />
      <article>
        <h1 className={utilStyles.headingXl}>{blogData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={blogData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
      </article>
      <div className={styles.backToHome}>
        <Link href="/">
          <a>← Back to Home</a>
        </Link>
      </div>
    </div>
  )
}