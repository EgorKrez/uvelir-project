import { useCallback, useState } from 'react';
import { ICatalog } from '../../../../models/catalog.models';
import { putRequest } from '../../../../utils/axios.utils';
import { ROOT_CATALOG_ID, rootCatalogItem } from '../../../../utils/path.utils';
import { DialogActions, useDialogActions } from '../../../common/dialog/dialog.component';
import { SelectCatalog } from '../../select/select-catalog.component';
import styles from './move-catalog.module.scss';

interface IMoveCatalogProps {
  readonly catalogId: string;
}

const cannotGoIntoRoot = (catalog: ICatalog) => catalog._id !== ROOT_CATALOG_ID;

export const MoveCatalog = ({ catalogId }: IMoveCatalogProps) => {
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(null);

  const { close } = useDialogActions();

  const save = async () => {
    await putRequest(`/catalog/edit/move/${catalogId}/${selectedCatalogId}`, {});

    location.reload();
  };

  const noCurrentCatalog = useCallback((catalogs: ICatalog[]): ICatalog[] => {
    return catalogs.filter(c => c._id !== catalogId);
  }, [catalogId]);

  const noCurrentCatalogAndAddRoot = useCallback((catalog: ICatalog): ICatalog => {
    if (catalog._id === ROOT_CATALOG_ID) {
      return {
        ...catalog,
        children: [
          rootCatalogItem,
          ...noCurrentCatalog(catalog.children),
        ],
      };
    }

    return {
      ...catalog,
      children: noCurrentCatalog(catalog.children)
    };
  }, [catalogId]);

  return <>
    <div className={styles.movecatalog__title}>
      Выберите каталог, в который будет перемещён текущий каталог
    </div>
    <SelectCatalog startFrom={rootCatalogItem}
                   selectedCatalogId={selectedCatalogId}
                   transformCurrentCatalog={noCurrentCatalogAndAddRoot}
                   canGoIntoCatalog={cannotGoIntoRoot}
                   onSelectedCatalogChange={setSelectedCatalogId}/>

    <DialogActions onClose={close}
                   onSubmit={save}
                   submitDisabled={!selectedCatalogId}
                   submitLabel="Переместить"
                   cancelLabel="Отмена"/>
  </>;
};