import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative h-screen dark:bg-slate-800 dark:text-white">
        <Header />
        <div>
          <main className="m-auto my-4 h-full dark:bg-slate-800 dark:text-white sm:my-16">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
