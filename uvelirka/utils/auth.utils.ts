import { IToken } from '../models/token.model';
import { getRequest } from './axios.utils';

export const fetchJwt = async () => {
  try {
    console.log(await getRequest('auth/user'));

    const { token } = await getRequest<IToken>('auth/token');

    document.cookie = `token=${token}`;

    location.reload();
  } catch (e) {
  }
};

