---
title: 'nextjs-blog'
date: '2022-10-11'
description: 'nextjs blog 제작기'
---

## 마크다운 코드 예시

```md
---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Next.js has two forms of pre-rendering:
**Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**.
  The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.
```

- 각 마크다운 파일의 상단에 '---'에 갇혀있는 title 및 date와 같은 요소를 `YAML Front Matter`라고 하며 [gray-matter](https://github.com/jonschlinkert/gray-matter) 와 같은 라이브러리를 사용하여 구문 분석할 수 있다.

## 만들어둔 md 파일 시스템(fs) 읽기

- 먼저 파일 시스템을 읽기 위한 유틸리티 함수를 생성한다.

### [getPosts](https://github.com/uhgenie7/nextjs-blog-challenge/blob/main/src/utils/getPosts.ts)

```js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
```

- [fs](https://nodejs.org/api/fs.html#fsreaddirsyncpath-options) 파일 시스템에서 파일을 읽을 수 있게 해주는 Node.js 모듈.
- [path](https://nodejs.org/api/path.html#pathjoinpaths) 파일 경로를 조작할 수 있게 해주는 Node.js 모듈.
- [gray-matter](https://www.npmjs.com/package/gray-matter) 각 마크다운 파일의 메타데이터를 구문 분석할 수 있는 라이브러리.

```js
// src/utils/getPosts.ts

const postsRootDirectory = path.join(process.cwd(), '_posts');

/**
 * rootDirectory에 있는 모든 _posts 파일을 읽어들이는 함수.
 */
export function getAllPostSlugs() {
  return fs.readdirSync(postsRootDirectory);
}

/**
 * _post로부터 단일 slug를 뽑아내는 함수.
 */
export function getPostBySlug(fileName: string, frontMatters: string[]) {
  const postBySlug: IFrontMatters = {};

  const title = fileName.replace(/\.md$/, '');
  // 확장자명인 ".md"을 버리고 title만 가져온다.

  const fullPath = path.join(postsRootDirectory, `${title}.md`);
  const encodingMdContents = fs.readFileSync(fullPath, 'utf8');
  // 마크다운 파일을 문자열로 읽는다.

  const { data, content } = matter(encodingMdContents);
  // gray-matter 라이브러리를 이용해 메타데이터를 파싱한다.

  // ...

  return postBySlug;
}

/**
 * 모든 _post를 읽는 함수.
 * 메인 화면의 postlist에 쓰인다.
 * _post를 읽어서 반복문을 돌리며 날짜순으로 정렬한다.
 */
export function getAllPostsData(frontMatters: string[]) {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((fileName) => getPostBySlug(fileName, frontMatters))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
```

- 이제 이것을 메인화면인 `pages/index.tsx`에 추가한다.

## All posts 렌더링 하기

### [index](https://github.com/uhgenie7/nextjs-blog-challenge/blob/main/src/pages/index.tsx)

```js
export const getStaticProps = async () => {
  const allPosts = getAllPostsData(['title', 'description', 'date', 'slug']);

  return {
    props: { allPosts },
  };
};
```

- front-matter 중, 'title', 'description', 'date', 'slug' 이 정도만 필요하여 네 가지를 가져왔다.
- `getStaticProps`로 사전 렌더링하여 allPosts 이름으로 props를 넘겨준다.

```js
const Home = ({ allPosts }: IAllPosts) => {
  // 넘겨준 props는 컴포넌트가 받을 수 있다.
  return (
    <Layout>
      <Head>
        <title>Next.js Blog Challenge</title>
      </Head>
      <Container>
        <Posts allPosts={allPosts} />
      </Container>
    </Layout>
  );
};
```

- getStaticProps는 'pages' 단에서만 사용 가능하다.
  이 제한의 이유 중 하나는 페이지가 렌더링되기 전에 React에 필요한 모든 데이터가 있어야 하기 때문이다.
- 즉, 컴포넌트단에서는 이런 식으로 쓸 수 없다.

## 단일 post 렌더링 하기

### [[slug].tsx](https://github.com/uhgenie7/nextjs-blog-challenge/blob/main/src/pages/posts/%5Bslug%5D.tsx)

1. \_posts 내의 각 post의 경로는 동적 라우팅으로 처리한다.
2. 각 md파일은 고유한 slug를 갖고 있으므로 slug로 동적 라우팅을 만든다.
3. `[` `]` 안에 파일명을 적으면 간단하게 동적 라우팅을 사용할 수 있다. `ex) [slug].tsx`
4. 동적 라우팅을 갖고 있고, `getStaticProps`를 사용하는 페이지는 `getStaticPaths`를 반드시 이용해서 정적으로 생성할 경로 목록을 정의해야 한다.

```js
export async function getStaticProps({ params }) {
  // params.slug를 사용하여 블로그 게시물에 필요한 데이터를 가져온다
}

export async function getStaticPaths() {
  // slug에 대해 가능한 값 목록을 반환.
}
```

```js
export async function getStaticProps({ params }: IParams) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content']);
  // params.slug는 파일 이름에서 왔다.

  return {
    props: {
      postData: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPostsData(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug, // 고유한 값을 반환
        },
      };
    }),
    fallback: false,
  };
}
```

- `posts`를 반복문을 돌릴 때 객체 배열 이어야 함.
- 각 객체에는 키가 있어야 하고 params 키가 있는 객체를 포함 해야 함.
- 파일 이름에 [slug]를 사용하기 때문
- 이렇게 하지 않으면 `getStaticPaths`에서 error를 뱉는다.

## 마크다운 렌더링하기

`remark` 라이브러리를 사용하여 마크다운을 HTML 문자열로 변환해주어야 한다.

### [remarkHtml](https://github.com/uhgenie7/nextjs-blog-challenge/blob/main/src/utils/remarkHtml.ts)

```js
// src/utils/remarkHtml.ts

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
```

'content'를 받아와 Html으로 변환하여 'content'만 바꿔치기 해줄 것이다.

```js
//src/pages/posts/[slug].tsx

export async function getStaticProps({ params }: IParams) {
  const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'content']);
  const contentHtml = await remarkHtml(post.content || ''); // <- 여기

  return {
    props: {
      postData: {
        ...post,
        contentHtml, // <- 여기
      },
    },
  };
}
```

```js
//src/pages/posts/[slug].tsx

const PostDetail = ({ postData }: IPost) => {
  return (
    <Layout>
      <article className="prose m-auto my-4 sm:my-16 lg:prose-xl">
        <h2 className="mt-0 mb-2 text-5xl font-normal leading-normal text-rose-800">
          {postData.title}
        </h2>
        <em>{postData.date}</em>
        <br />
        <Post>{postData.contentHtml}</Post>
        // 여기에 넣어서 Post 컴포넌트가 children으로 받게 했다
      </article>
    </Layout>
  );
};
```

```js
// components/Post.tsx

const Post = ({ children: content }: { children: string }) => {
  useEffect(() => {
    // 코드 하이라이팅
    const highlight = async () => {
      await Prism.highlightAll();
    };
    highlight();
  }, [content]);

  return (
    <div
      className="prose m-auto my-4 sm:my-16 lg:prose-xl"
      dangerouslySetInnerHTML={{ __html: content }} // <-- 여기
    />
  );
};
```
