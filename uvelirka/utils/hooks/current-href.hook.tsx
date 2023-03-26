import { createContext, useContext, useEffect, useState } from 'react';
import { IPropsWithChildren } from '../../models/common.model';
import { ICurrentHref } from '../../models/current-url.model';

const CurrentHrefContext = createContext<ICurrentHref>({
  currentHref: '',
});

export const ProvideCurrentHref = ({ children }: IPropsWithChildren) => {
  const [currentHref, setCurrentHref] = useState('');

  useEffect(() => {
    if (process.browser) {
      const timeout = setTimeout(() => {
        setCurrentHref(location.href);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, []);

  return <CurrentHrefContext.Provider value={{ currentHref }} children={children}/>;
};

export const useCurrentHref = () => useContext(CurrentHrefContext);