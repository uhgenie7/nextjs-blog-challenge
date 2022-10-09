import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';

const remarkHtml = async (markdown: string) => {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .process(markdown);
  return result.toString();
};

export default remarkHtml;
