import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
