# Next.js로 마크다운 블로그 만들기

## 사이트

### [Blog](https://nextjs-blog-challenge.vercel.app/)

## 요구사항

<details>
<summary> 1.1.0 요구사항 </summary>
<div markdown="1">
  <aside>
  💡 1.1.0 요구사항
  </aside>

## **스타일**

- TailwindCSS 사용
- 다크모드 / 라이트모드를 오갈 수 있도록 한다
- 좌상단에 icon 을 두고 누르면 blog 의 theme 가 바뀐다
  - 새로고침을 해도 theme 는 유지된다

참조: 무료 svg 다운로드 https://www.iconpacks.net/

## **mdx 지원**

- .mdx 추가 지원
- 코드블럭 우상단에 copy 기능 추가
  </div>
  </details>

## Tree

```
├─ src
│  ├─ components // 컴포넌트 디자인 패턴은 presentational and container 패턴으로 고려 중...
│  │  ├─ Meta.tsx
│  │  └─ ui
│  ├─ pages
│  │  ├─ 404.tsx
│  │  ├─ index.tsx
│  │  ├─ posts
│  │  │  └─ [slug].tsx // 동적 라우팅
│  │  ├─ _app.tsx
│  │  └─ _document.tsx
│  ├─ types
│  │  └─ post.ts
│  └─ utils
│     ├─ getPosts.ts
│     └─ remarkHtml.ts // md -> remark 작업
└─ _posts
   ├─ hello-world.md
   └─ nextjs-blog.md
```

## 기능

- `_post` 루트 파일에 markdown 파일을 넣으면 빌드 시 파싱해서 html으로 렌더해줍니다.
- front-matter: title, date, description, content

### 메인화면

![main](https://user-images.githubusercontent.com/72803184/194814587-b3b1ddb2-b1f4-41dc-a17c-d3e14c9259df.PNG)

- AllPost

### 세부화면

![[slug]](https://user-images.githubusercontent.com/72803184/194814589-36a75587-6653-4739-b3ea-7b30942a76a9.PNG)

- 단일 post
- slug로 동적 라우팅
- 코드 하이라이팅

## 코드 설명

[블로그로 이동](https://nextjs-blog-challenge.vercel.app/posts/nextjs-blog)

- 해당 사이트를 이용하여 markdown 포스트를 하나 남겼습니다

## 라이브러리

| 라이브러리명 | 사이트                                       | 용도                                      |
| ------------ | -------------------------------------------- | ----------------------------------------- |
| remark       | https://github.com/remarkjs/remark/tree/main | 플러그인으로 마크다운을 변환하는 도구     |
| └remark-html | https://github.com/remarkjs/remark-html      | 구문 트리를 직렬화된 HTML로 변환          |
| gray-matter  | https://github.com/jonschlinkert/gray-matter | 문자열 또는 파일에서 front-matter을 parse |
| Prism        | https://prismjs.com/                         | 코드 하이라이터                           |
