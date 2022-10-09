import Header from './Header';
import Meta from '../Meta';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Meta />
      <div className="relative">
        <Header />
        <div>
          <main className="m-auto my-4 flex items-center justify-center px-8 sm:my-16">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
