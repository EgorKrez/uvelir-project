import { Fragment } from 'react';
import { CloseIcon } from '../../../../svg/close.icon';
import { Button } from '../../../common/button/button.component';
import styles from './catalog-input.module.scss';

interface ICatalogInputProps {
  readonly folders: string[];
  readonly setFolders: (newFolders: string[]) => void;
}

export const CatalogInput = ({ folders, setFolders }: ICatalogInputProps) => {
  const removeAt = (index: number) => {
    setFolders(folders.filter((_, i) => i !== index));
  };

  const setFolderValueAt = (index: number, value: string) => {
    folders[index] = value;

    setFolders([...folders]);
  };

  return <div className={styles.row}>
    {folders.map((folder, index) => <Fragment key={index}>
      <div className={styles.separator}>/</div>
      <input value={folder}
             className={styles.input}
             onChange={event => setFolderValueAt(index, event.target.value)}
             placeholder="Категория"/>
      <div className={styles.delete}>
        <CloseIcon onClick={() => removeAt(index)}/>
      </div>
    </Fragment>)}
    <Button className={styles.addbutton}
            text="Добавить"
            onClick={() => setFolders([...folders, ''])}/>
  </div>;
};