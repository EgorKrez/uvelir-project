import Link from 'next/link';
import React from 'react';
import { ICatalog } from '../../models/catalog.models';
import { EditIcon } from '../../svg/edit.icon';
import { catalogPath } from '../../utils/path.utils';
import { EditPrimaryDialog } from './catalog-list/edit-primary-dialog/edit-primary-dialog.component';
import EditButton from './catalog-list/edit/edit-button.component';
import styles from './secondary-catalog.module.scss';

interface ISecondaryCatalogProps {
  secondaryCatalogId: string;
  catalog: ICatalog;
}

export const SecondaryCatalog = ({ secondaryCatalogId, catalog }: ISecondaryCatalogProps) => {
  return <Link href={catalogPath(catalog._id)}
               className={styles.secondarycatalog}>
    <EditButton dialogTitle="Изменить заглавный каталог"
                button={<EditIcon />}>
      <EditPrimaryDialog catalog={catalog}
                         primaryItemId={secondaryCatalogId} />
    </EditButton>

    {catalog.name}

    <div className={styles.secondarycatalog__shadow}>
      {catalog.name}
    </div>
  </Link>;
};