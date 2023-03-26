import Link from 'next/link';
import { PropsWithChildren, useMemo } from 'react';
import { IPropsWithClassname } from '../../../models/common.model';
import { c } from '../../../utils/classname.utils';
import { pathToCatalogPaginated } from '../../../utils/path.utils';
import { range } from '../../../utils/range.utils';
import styles from './paginator.module.scss';

export interface IPaginatorProps extends IPropsWithClassname {
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly catalogId: string;
  readonly paginatorSize: number;
}

interface IPaginatorItemProps extends PropsWithChildren {
  readonly selected: boolean;
  readonly href: string;
}

const PaginatorItem = ({ selected, href, children }: IPaginatorItemProps) => {
  return <Link className={c(styles.paginator__item, { [styles.paginator__item_current]: selected })}
               href={href}>
    {children}
  </Link>;
};

export const Paginator = (
  { page, total, limit, catalogId, paginatorSize, className }: IPaginatorProps,
) => {
  const half = Math.ceil(paginatorSize / 2) - 1;
  const start = Math.max(0, page - half);
  const end = Math.min(
    total - 1,
    page + (start - (page - half)) + paginatorSize - half - 1,
  );

  const pages = useMemo(() => range(start, end), [start, end]);

  return <div className={c(styles.paginator, className)}>
    {start !== 0 &&
      <>
        <PaginatorItem selected={false}
                       href={pathToCatalogPaginated(catalogId, 0, limit)}>
          1
        </PaginatorItem>
        <PaginatorItem selected={false}
                       href="#">
          ...
        </PaginatorItem>
      </>
    }

    {pages.map(pageNumber =>
      <PaginatorItem key={pageNumber}
                     selected={pageNumber === page}
                     href={pathToCatalogPaginated(catalogId, pageNumber, limit)}>
        {pageNumber + 1}
      </PaginatorItem>,
    )}

    {end !== total - 1 &&
      <>
        <PaginatorItem selected={false}
                       href="#">
          ...
        </PaginatorItem>
        <PaginatorItem selected={false}
                       href={pathToCatalogPaginated(catalogId, total - 1, limit)}>
          {total}
        </PaginatorItem>
      </>
    }
  </div>;
};