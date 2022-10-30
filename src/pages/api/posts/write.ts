import { createPost } from '@src/utils/createPost';
import { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content, description, slug } = req.body;

  try {
    await createPost({
      title,
      content,
      description,
      date: format(new Date(), 'yyyy-MM-dd'),
    });
    res.status(200).json({ message: '제출 성공' });
  } catch (error) {
    res.status(500).json({ error: `제출 실패 ${error}` });
  }
}
