import { useEffect, useMemo, useState } from 'react';
import { ICatalog } from '../../../models/catalog.models';
import { IMapFunction, IValueCallback } from '../../../models/common.model';
import { useRequestedState } from '../../../utils/hooks/use-requested-state.hook';
import { ROOT_CATALOG_ID, rootCatalogItem } from '../../../utils/path.utils';
import { CatalogList } from '../../home/catalog-list/catalog-list.component';
import { CatalogPath } from '../../home/catalog-list/catalog-path/catalog-path.component';
import styles from './select-catalog.module.scss';

interface ISelectCatalogProps {
  startFrom: ICatalog;
  selectedCatalogId: string | null;
  onSelectedCatalogChange: IValueCallback<string | null>;
  transformCurrentCatalog?: IMapFunction<ICatalog, ICatalog>;
  canGoIntoCatalog?: IMapFunction<ICatalog, boolean>;
}

const noTransform = (catalog: ICatalog) => catalog;
const heCan = () => true;

export function SelectCatalog(
  { startFrom, selectedCatalogId, onSelectedCatalogChange, transformCurrentCatalog, canGoIntoCatalog }: ISelectCatalogProps,
) {
  const [currentCatalogId, setCurrentCatalogId] = useState(startFrom.parent?._id || ROOT_CATALOG_ID);
  const { state: catalog } = useRequestedState<ICatalog>({
    requestPath: `/catalog/one/${currentCatalogId}`,
    initialState: rootCatalogItem,
  });

  const transform = transformCurrentCatalog || noTransform;
  const canGoInto = canGoIntoCatalog || heCan;

  const transformedCatalog = useMemo(() => transform(catalog), [transform, catalog]);

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (!initial) {
      console.log('set null');
      onSelectedCatalogChange(null);
    }
    
    setInitial(false);
  }, [currentCatalogId]);

  return <>
    <CatalogPath className={styles.catalog__path}
                 catalog={transformedCatalog}
                 onItemClick={item => {
                   setCurrentCatalogId(item._id);
                 }}/>

    <div className={styles.catalog__list}>
      <CatalogList catalogs={transformedCatalog.children}
                   onCatalogClick={catalog => {
                     onSelectedCatalogChange(catalog._id);
                   }}
                   onCatalogDoubleClick={selectedCatalog => {
                     if (canGoInto(selectedCatalog)) {
                       setCurrentCatalogId(selectedCatalog._id);
                     }
                   }}
                   getCatalogClass={anyCatalog => anyCatalog._id === selectedCatalogId && styles.catalog_selected}
      />
    </div>
  </>;
}