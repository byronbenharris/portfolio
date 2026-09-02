import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const blogDirectory = path.join(process.cwd(), 'content/blog')

export function getSortedBlogData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(blogDirectory)
  const allBlogData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(blogDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allBlogData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  })
}

export function getAllBlogIds() {
  const fileNames = fs.readdirSync(blogDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getBlogData(id) {
  const fullPath = path.join(blogDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  const demoMarker = '<!-- interactive-demo -->'
  const contentSections = await Promise.all(
    matterResult.content.split(demoMarker).map(async section => {
      const processedContent = await remark()
        .use(html)
        .process(section)
      return processedContent.toString()
    })
  )

  // Interactive posts can place a rich demo between Markdown sections.
  return {
    id,
    contentHtml: contentSections.join(''),
    contentSections,
    hasInteractiveDemo: matterResult.content.includes(demoMarker),
    ...matterResult.data
  }
}
