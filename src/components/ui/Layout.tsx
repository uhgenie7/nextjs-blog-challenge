import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="relative">
        <Header />
        <div>
          <main className="m-auto my-4 sm:my-16">{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
