import Head from 'next/head'

export const siteTitle = 'Ben Harris — Notes and Projects'

export default function Header({ customTitle }) {
  return (
    <Head>
      <link 
        rel="icon" 
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤙</text></svg>"
      />
      <meta name="description" content="The personal website of Ben Harris: notes, projects, and things worth sharing." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {customTitle ? (
        <title>{customTitle}</title>
      ) : (
        <title>{siteTitle}</title>
      )}
    </Head>
  )
}
