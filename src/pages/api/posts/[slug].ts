import { NextApiRequest, NextApiResponse } from 'next';
import { getPostBySlug } from '@src/utils/getPosts';
import remarkHtml from '@src/utils/remarkHtml';
/**
 *
 * https://github.com/vercel/next.js/tree/canary/examples/api-routes
 *
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug?.toString() || '';
  const post = getPostBySlug(slug);
  const contentHtml = await remarkHtml(post.content || '');

  res.status(200).json({ ...post, contentHtml });
}
