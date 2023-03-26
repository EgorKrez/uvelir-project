import { PropsWithChildren } from 'react';
import { ICatalog } from '../../../../models/catalog.models';
import styles from './catalog-header.module.scss';
import background from '../../../../public/background.png';
import { backgroundImage } from '../../../../utils/path.utils';
import { CatalogList } from '../../catalog-list/catalog-list.component';
import { CatalogPath } from '../../catalog-list/catalog-path/catalog-path.component';
import { Header } from '../header.component';

interface ICatalogHeaderProps extends PropsWithChildren {
  readonly catalog: ICatalog;
  readonly hideCatalogList?: boolean;
}

export const CatalogHeader = ({ catalog, hideCatalogList, children }: ICatalogHeaderProps) => {
  return <div className={styles.catalogpage__head}
              style={{ backgroundImage: backgroundImage(catalog.imageUrl || background.src) }}>
    <Header/>

    <CatalogPath className={styles.catalogpage__path}
                 catalog={catalog}/>

    {!hideCatalogList && <CatalogList className={styles.catalogpage__catalogs}
                                      catalogs={catalog.children}/>}

    {children}
  </div>;
};