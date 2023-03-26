import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import { CatalogToolbar } from '../../components/catalog/edit/toolbar/catalog-toolbar.component';
import { Filters } from '../../components/catalog/filters';
import { Paginator } from '../../components/common/paginator/paginator.component';
import { CatalogHeader } from '../../components/home/header/catalog-header/catalog-header.component';
import { ProductItem } from '../../components/product/product-item.component';
import { IProductPageFromCatalogProps } from '../../models/catalog-product-page.model';
import { ICatalog } from '../../models/catalog.models';
import { IGetByCatalogDto } from '../../models/get-by-catalog-dto.model';
import { IProductPage } from '../../models/product-page.model';
import { ITag } from '../../models/tag.model';
import { getRequest, postRequest } from '../../utils/axios.utils';
import { addMultipleQueryParam, createTagQuery, tagQueryParam } from '../../utils/path.utils';
import { getUser } from '../../api/user.api';
import styles from './catalog.module.scss';

export interface ISubCatalogParams extends ParsedUrlQuery {
  readonly id: string;
  readonly page: string;
  readonly limit: string;
}

const gradient = 'linear-gradient(0deg, rgba(180, 180, 180, 0) 20.31%, #333333 100%)';

function splitInto<T>(items: T[], into: number): T[][] {
  const splitted: T[][] = [];

  for (let i = 0; i < items.length; i++) {
    const row = Math.floor(i / into);
    const column = i % into;

    splitted[row] = splitted[row] || [];

    splitted[row][column] = items[i];
  }

  return splitted;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IProductPageFromCatalogProps>> {
  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );

  const query = context.query as ISubCatalogParams;
  const limit = parseInt(query.limit) || 9;
  const pageIndex = parseInt(query.page) || 0;
  const tagsRaw = typeof context.query.filters === 'string'
    ? [context.query.filters]
    : context.query.filters === undefined
      ? []
      : context.query.filters instanceof Array
        ? context.query.filters as string[]
        : [];
  const user = await getUser();

  const tags: ITag[] = tagsRaw
    .filter(tag => tag.includes('--'))
    .map(rawTag => ({
      name: rawTag.split('--')[0],
      value: rawTag.split('--')[1],
    }));

  const catalog = await getRequest<ICatalog>(
    `catalog/one/${query.id}`,
  );
  const page = await postRequest<IGetByCatalogDto, IProductPage>(
    `product/by/catalog`,
    {
      page: pageIndex,
      limit,
      catalogId: catalog._id,
      tags,
    },
  );

  const validatedTags = tags.filter(tag => page.tags.find(
    t => t.name === tag.name && t.values.includes(tag.value),
  ));

  if (tagsRaw.length != validatedTags.length) {
    return {
      redirect: {
        destination: addMultipleQueryParam(
          `/catalog/${catalog._id}`,
          tagQueryParam,
          validatedTags.map(t => createTagQuery(t.name, t.value)),
        ),
        permanent: true,
      },
    };
  }

  return {
    props: {
      catalog,
      page,
      currentUrl: context.resolvedUrl,
      user,
    },
  };
}

export default function CatalogById(
  {
    catalog,
    page: { page, limit, total, items, tags }, currentUrl,
  }: IProductPageFromCatalogProps,
) {
  const rows = useMemo(() => splitInto(items, 3), [items]);

  return <div>
    <CatalogToolbar catalog={catalog}/>

    <CatalogHeader catalog={catalog}/>

    <div className={styles.content}>
      <Filters tags={tags}
               currentUrl={currentUrl}/>

      <div className={styles.catalogpage__productssection}>
        {rows.map((row, index) =>
          <div className={styles.productrow}
               key={index}>
            {row.map(item =>
              <ProductItem key={item._id}
                           product={item}/>,
            )}
          </div>)}

        <div className={styles.catalogpage__paginatorsection}>
          <Paginator total={total}
                     paginatorSize={9}
                     page={page}
                     limit={limit}
                     catalogId={catalog._id}/>
        </div>
      </div>
    </div>
  </div>;
}