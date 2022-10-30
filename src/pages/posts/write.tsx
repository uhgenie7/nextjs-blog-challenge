import { useRef, FormEvent } from 'react';
import Layout from '@src/components/ui/Layout';

const Write = () => {
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
        .then((data) => alert(data.message))
        .catch((error) => alert(`request error: ${error}`));
    }
  };

  return (
    <Layout>
      <h2>Write</h2>
      <form onSubmit={handleSubmit}>
        <input
          type={'text'}
          name={'title'}
          placeholder={'title'}
          required
          ref={titleRef}
        />
        <br />
        <input
          type={'text'}
          name={'description'}
          placeholder={'description'}
          required
          ref={descriptionRef}
        />
        <br />
        <textarea
          name={'content'}
          placeholder={'content'}
          required
          ref={contentRef}
        />
        <br />
        <input type="submit" value={'제출'} />
      </form>
    </Layout>
  );
};

export default Write;
