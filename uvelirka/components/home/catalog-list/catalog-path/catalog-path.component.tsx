import { Fragment, MouseEvent } from 'react';
import styles from './catalog-path.module.scss';
import Link from 'next/link';
import { ICatalog } from '../../../../models/catalog.models';
import { IPropsWithClassname, IValueCallback } from '../../../../models/common.model';
import { c } from '../../../../utils/classname.utils';
import { catalogPath, rootCatalog, ROOT_CATALOG_ID, rootCatalogItem } from '../../../../utils/path.utils';

interface ICatalogPathComponentProps extends IPropsWithClassname {
  readonly catalog: ICatalog;
  readonly onItemClick?: IValueCallback<ICatalog>;
}

export const CatalogPath = (
  {
    catalog: { path, name, _id },
    className,
    onItemClick,
  }: ICatalogPathComponentProps,
) => {
  const handleItemClick = (event: MouseEvent, item: ICatalog) => {
    if (onItemClick) {
      event.stopPropagation();
      event.preventDefault();
      onItemClick(item);
    }
  };

  const isRoot = _id === ROOT_CATALOG_ID;

  return <div className={c(styles.path, className)}>
    <Link className={c({ [styles.path__item]: !isRoot })}
          onClick={event => handleItemClick(event, rootCatalogItem)}
          href={rootCatalog}>
      Каталог
    </Link>
    {path.map(item =>
      <Fragment key={item._id}>
        <div className={styles.path__separator}>/</div>
        <Link onClick={event => handleItemClick(event, item)}
              className={styles.path__item}
              href={catalogPath(item._id)}>
          {item.name}
        </Link>
      </Fragment>,
    )}
    {!isRoot && <>
      <div className={styles.path__separator}>/</div>
      <div className={styles.path__item_last}>{name}</div>
    </>}
  </div>;
};