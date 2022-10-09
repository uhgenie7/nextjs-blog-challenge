import type { IPreviewPost } from '@src/types/post';
import Link from 'next/link';

const PreviewPost = ({ title, description, date, slug }: IPreviewPost) => {
  return (
    <li className="mb-3">
      <Link href={`/posts/${encodeURIComponent(slug)}`}>
        <a>
          <div>
            <h3 className="mt-0 text-4xl font-normal leading-normal text-pink-800">
              {title}
            </h3>
            <p className="mt-0 font-normal leading-normal text-pink-800">
              {description}
            </p>
            <em>{date}</em>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default PreviewPost;
