import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_TOKEN,
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2024-01-29', // use current date (YYYY-MM-DD) to target the latest API version
    token: 'skyJAnqCQ8O835r1W67cNJi3LYQNBTGcy1lUxYXeMLv1iPWwVKdgxpElHERqdESRT6oJWUW5GtWqgf0ApfiYnnG1C1yhsiUfsgnLc9r46QJARJ6p6yrCI1YGfgBXJKQQHhI8RYznQ3sDKQp4uXog9Ei7mcL6PapoihHJFsnkSmm9IN03CeF4' // Only if you want to update content with the client
  })

  const builder = imageUrlBuilder(client);

  export const urlFor = (source) => builder.image(source);