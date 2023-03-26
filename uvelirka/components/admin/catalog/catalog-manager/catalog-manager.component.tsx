// 'use client';

import FormData from 'form-data';
import { useState } from 'react';
import catalog from '../../../../pages/catalog';
import { deleteRequest, postRequest } from '../../../../utils/axios.utils';
import { useRequestedState } from '../../../../utils/hooks/use-requested-state.hook';
import { MediaInput } from '../../../client';
import { DialogActions } from '../../../common/dialog/dialog.component';
import { CatalogInput } from '../catalog-input/catalog-input.component';
import styles from './catalog-manager.module.scss';


interface ICatalog {
  _id: string;
  path: string[];
  imageUrl: string;
}

const Catalog = ({ catalog, onDelete }: { catalog: ICatalog, onDelete: () => void }) => {
  return <div className={styles.catalog}>
    <img className={styles.catalog__image}
         src={catalog.imageUrl}
         alt="Изображение каталога"/>

    <div className={styles.catalog__path}>
      {catalog.path.join(' / ')}
    </div>

    <div onClick={onDelete}
         className={styles.catalog__delete}>
      удалить
    </div>
  </div>;
};

export default function CatalogManager() {
  const [folders, setFolders] = useState<string[]>(['']);
  const [file, setFile] = useState<File>();
  const { state: catalogs, setState: setCatalogs } = useRequestedState<ICatalog[]>({
    initialState: [],
    requestPath: 'catalog',
  });

  const saveCatalog = async () => {
    const form = new FormData();

    folders.forEach(folder => {
      form.append('path[]', folder);
    });

    form.append('file', file);

    setCatalogs([await postRequest('catalog', form), ...catalogs]);
  };

  const onDelete = async (catalog: ICatalog) => {
    await deleteRequest(`catalog/${catalog._id}`);

    setCatalogs(catalogs.filter(c => c !== catalog));
  };

  return <div>
    <CatalogInput folders={folders}
                  setFolders={setFolders}/>

    <MediaInput className={styles.media}
                file={file}
                setFile={setFile}/>

    <DialogActions onClose={() => void 0}
                   onSubmit={saveCatalog}
                   submitLabel="Сохранить"
                   cancelLabel="Отменить"/>

    <div className={styles.catalogs}>
      {catalogs.map(catalog => <Catalog key={catalog._id}
                                        catalog={catalog}
                                        onDelete={() => onDelete(catalog)}/>)}
    </div>
  </div>;
}