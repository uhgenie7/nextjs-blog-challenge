import type { ISimplePost } from '@src/types/post';
import Link from 'next/link';

const PreviewPost = ({ title, description, date, slug }: ISimplePost) => {
  return (
    <li>
      <Link href={`/posts/${encodeURIComponent(slug)}`}>
        <a>
          <div>
            <h3>{title}</h3>
            <p>{description}</p>
            <em>{date}</em>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PreviewPost;
