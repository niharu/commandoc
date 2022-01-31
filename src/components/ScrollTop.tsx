import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};
export const ScrollToTop: React.VFC<Props> = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return <>{children}</>
} 