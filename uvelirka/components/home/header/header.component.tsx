import Link from 'next/link';
import { IPropsWithClassname } from '../../../models/common.model';
import { SearchIcon } from '../../../svg/search.icon';
import { c } from '../../../utils/classname.utils';
import { useCurrentHref } from '../../../utils/hooks/current-href.hook';
import { useUser } from '../../../utils/hooks/user.hook';
import { googleLoginPath, rootCatalog } from '../../../utils/path.utils';
import styles from './header.module.scss';

interface IHeaderProps extends IPropsWithClassname {
}

export const Header = ({ className }: IHeaderProps) => {
  const { user } = useUser();

  return <div className={c(styles.header, className)}>
    <div/>

    <Link href={rootCatalog}>
      Каталог
    </Link>

    <Link href="/contacts">
      Контакты
    </Link>

    <Link href="/"
          className={styles.header__title}>
      jojo
    </Link>

    <div className={styles.search}>
      <div>
        <SearchIcon/>
      </div>
      <input className={c('transparent', styles.search__input)}
             placeholder="Поиск"/>
    </div>

    <div>
      <div>
        Войти
      </div>

      <div>
        <Link href={googleLoginPath(useCurrentHref().currentHref)}>
          Гугл {user?.name}
        </Link>
      </div>
    </div>
    <div/>
  </div>;
};