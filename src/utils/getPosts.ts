import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface IFrontMatters {
  [key: string]: string;
}

const postsRootDirectory = path.join(process.cwd(), '_posts');

export function getAllPostSlugs() {
  return fs.readdirSync(postsRootDirectory);
}

export function getPostBySlug(fileName: string) {
  const frontMatters = ['title', 'date', 'slug', 'content'];
  const postBySlug: IFrontMatters = {};

  const title = fileName.replace(/\.md$/, '');
  const fullPath = path.join(postsRootDirectory, `${title}.md`);

  const encodingMdContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(encodingMdContents);

  frontMatters.forEach((frontMatters) => {
    if (frontMatters === 'slug' || frontMatters === 'title') {
      postBySlug[frontMatters] = title;
    }

    if (frontMatters === 'content') {
      postBySlug[frontMatters] = content;
    }

    if (typeof data[frontMatters] !== 'undefined') {
      postBySlug[frontMatters] = data[frontMatters];
    }
  });

  return postBySlug;
}

export function getAllPostsData() {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((fileName) => getPostBySlug(fileName))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
