import type { ISimplePost } from '@src/types/post';

const SimplePost = ({ title, description, date }: ISimplePost) => {
  return (
    <li>
      <h3>{title}</h3>
      <p>{description}</p>
      <em>{date}</em>
    </li>
  );
};

export default SimplePost;
