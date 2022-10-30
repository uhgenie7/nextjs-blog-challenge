import fs from 'fs';
import path from 'path';
import { ICreatePost } from '@src/types/post';

const postsRootDirectory = path.join(process.cwd(), '_posts');

export async function createPost({
  title,
  date,
  description,
  content,
}: ICreatePost) {
  const fullPath = path.join(postsRootDirectory, `${title}.md`);
  const data = `---
  title: '${title}'
  slug: '${title}'
  date: '${date}'
  description: '${description}'
  ---

  ${content}
`;

  fs.writeFileSync(fullPath, data);
}
