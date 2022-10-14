import { NextApiRequest, NextApiResponse } from 'next';
import { getAllPostsData } from '@src/utils/getPosts';

/**
 *
 * https://github.com/vercel/next.js/tree/canary/examples/api-routes
 *
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allPosts = getAllPostsData();
  res.status(200).json(allPosts);
}
