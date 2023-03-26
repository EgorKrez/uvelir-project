import Link from 'next/link';
import { ICatalog } from '../../../../models/catalog.models';
import { createProductPath, ROOT_CATALOG_ID } from '../../../../utils/path.utils';
import EditButton from '../../../home/catalog-list/edit/edit-button.component';
import { EditCatalogImage } from '../image/edit-catalog-image.component';
import { MoveCatalog } from '../move/move-catalog.component';
import { EditCatalogName } from '../name/edit-catalog-name.component';
import styles from './catalog-toolbar.module.scss';

export const CatalogToolbar = ({ catalog }: { catalog: ICatalog }) => {
  return <div className={styles.toolbar}>
    Панель управления каталогом

    {catalog._id !== ROOT_CATALOG_ID && <>
      <EditButton button="Изменить изображение"
                  dialogTitle="Изменить изображение">
        <EditCatalogImage catalogId={catalog._id}
                          currentImage={catalog.imageUrl} />
      </EditButton>

      <EditButton button="Изменить названиие"
                  dialogTitle="Изменить названиие">
        <EditCatalogName catalogId={catalog._id}
                         name={catalog.name} />
      </EditButton>

      <EditButton button="Переместить каталог"
                  dialogTitle="Переместить каталог">
        <MoveCatalog catalogId={catalog._id} />
      </EditButton>

      <Link className="like-a-button"
            href={createProductPath}>
        Создать продукт
      </Link>
    </>}
  </div>;
};