

// import fs from 'fs'
// import path from 'path'
// import matter from 'gray-matter'
// import remark from 'remark'
// import html from 'remark-html'

// const projectDirectory = path.join(process.cwd(), 'content/blog')

// const processCSV = (str, delim=',') => {
//   const headers = str.slice(0,str.indexOf('\n')).split(delim);
//   const rows = str.slice(str.indexOf('\n')+1).split('\n');

//   const newArray = rows.map( row => {
//     const values = row.split(delim);
//     const eachObject = headers.reduce((obj, header, i) => {
//       obj[header] = values[i];
//       return obj;
//     }, {})
//     return eachObject;
//   })
// }

// const submit = () => {
//   const file = csvFile;
//   const reader = new FileReader();

//   reader.onload = function(e) {
//     const text = e.target.result;
//     console.log(text);
//     processCSV(text)
//   }

//   reader.readAsText(file);
// }

// export async function getProjectData(id) {
//   const fullPath = path.join(projectDirectory, `${id}.md`)
//   const fileContents = fs.readFileSync(fullPath, 'utf8')

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents)

//   // Use remark to convert markdown into HTML string
//   const processedContent = await remark()
//     .use(html)
//     .process(matterResult.content)
//   const contentHtml = processedContent.toString()

//   // Combine the data with the id and contentHtml
//   return {
//     id,
//     contentHtml,
//     ...matterResult.data
//   }
// }