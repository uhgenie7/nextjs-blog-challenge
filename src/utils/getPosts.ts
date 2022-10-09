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

export function getPostBySlug(fileName: string, frontMatters: string[]) {
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

export function getAllPostsData(frontMatters: string[]) {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((fileName) => getPostBySlug(fileName, frontMatters));
  return posts;
}
