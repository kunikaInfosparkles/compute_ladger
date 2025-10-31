import { Outlet } from 'react-router-dom';
import Header from './header/index';
import ScrollToTop from '../common/scrolltop';

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <div className='layout-wrapper'>
        <Header />
        <div className='content-outlet'>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;