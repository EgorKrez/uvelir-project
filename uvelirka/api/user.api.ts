import { getRequest, postRequest } from '../utils/axios.utils';

export interface IUser {
  readonly name: string;
  readonly avatar: string;
  readonly email: string;
  readonly favouriteProducts: string[];
}

export const getUser = async () => getRequest<IUser>('auth/user');
export const logout = async () => postRequest('auth/logout', {});

// export async function provideUserInServerResponse<T>(
//   response
// ) {
//
// }