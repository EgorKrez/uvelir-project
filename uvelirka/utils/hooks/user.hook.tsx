import { createContext, useContext } from 'react';
import { IPropsWithChildren } from '../../models/common.model';
import { getUser, IUser } from '../../api/user.api';

export interface IWithUser {
  readonly user: IUser;
}

const UserContext = createContext<IWithUser>({
  user: {},
});

export const ProvideUser = UserContext.Provider;

export const useUser = () => useContext(UserContext);

export const UserScope = ({ children }: IPropsWithChildren) => {
  const { user } = useUser();

  return user ? children : null;
};

export const provideUserFromApi = async (): IWithUser => ({
  user: await getUser(),
});