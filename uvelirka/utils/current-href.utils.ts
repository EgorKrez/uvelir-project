import { GetServerSidePropsContext } from 'next';
import { ICurrentHref } from '../models/current-url.model';

export const getCurrentHref = (c: GetServerSidePropsContext): ICurrentHref => {
  const host = c.req.headers.host!;
  const protocol = host.includes('localhost') ? 'http' : 'https';

  return ({
    currentHref: `${protocol}://${host}/${c.req.url}`,
  });
};