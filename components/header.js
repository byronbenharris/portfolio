import Head from 'next/head'

export const siteTitle = 'Ben Harris — Notes and Projects'
const siteDescription = 'The personal website of Ben Harris: notes, projects, and things worth sharing.'

export default function Header({ customTitle, customDescription }) {
  const title = customTitle ? `${customTitle} — Ben Harris` : siteTitle
  const description = customDescription || siteDescription

  return (
    <Head>
      <link 
        rel="icon" 
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤙</text></svg>"
      />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={customTitle ? 'article' : 'website'} />
      <meta name="twitter:card" content="summary" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
    </Head>
  )
}
