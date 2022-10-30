import { useRef, FormEvent } from 'react';
import Layout from '@src/components/ui/Layout';
import { useRouter } from 'next/router';

const Write = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current && titleRef.current.value;
    const content = contentRef.current && contentRef.current.value;
    const description = descriptionRef.current && descriptionRef.current.value;

    if (title && content && description) {
      fetch('/api/posts/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          description,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Fetch error');
        })
        .then((data) => {
          alert(data.message);
          router.push('/');
        })
        .catch((error) => alert(`request error: ${error}`));
    }
  };

  return (
    <Layout>
      <div className="prose m-auto my-4 sm:my-16 lg:prose-xl">
        <div>
          <h2 className="mt-0 mb-2 text-5xl font-normal leading-normal text-rose-800">
            블로그 글쓰기
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm
        invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
        focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
        disabled:border-slate-200 disabled:bg-slate-50
        disabled:text-slate-500 disabled:shadow-none"
            type={'text'}
            name={'title'}
            placeholder={'title'}
            required
            ref={titleRef}
          />
          <br />
          <input
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm
        invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
        focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
        disabled:border-slate-200 disabled:bg-slate-50
        disabled:text-slate-500 disabled:shadow-none"
            type={'text'}
            name={'description'}
            placeholder={'description'}
            required
            ref={descriptionRef}
          />
          <br />
          <textarea
            className="mt-1 block h-96 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400
        shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500
        focus:outline-none focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500
        focus:invalid:ring-pink-500 disabled:border-slate-200
        disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
            name={'content'}
            placeholder={'content'}
            required
            ref={contentRef}
          />
          <br />
          <input
            type="submit"
            value={'제출'}
            className="w-full cursor-pointer bg-pink-500/75 p-2 hover:bg-pink-700 hover:text-gray-50"
          />
        </form>
      </div>
    </Layout>
  );
};

export default Write;
