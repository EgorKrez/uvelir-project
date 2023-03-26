import FormData from 'form-data';
import { ChangeEvent, useRef, useState } from 'react';
import { FileUploadIcon } from '../../../../svg/file-upload.icon';
import { putRequest } from '../../../../utils/axios.utils';
import { isFileImageOrVideo } from '../../../../utils/media.utils';
import { DialogActions, useDialogActions } from '../../../common/dialog/dialog.component';
import { MediaViewItem } from '../../../product/media/media-preview-item.component';
import styles from './edit-catalog-image.module.scss';

export const EditCatalogImage = ({ catalogId, currentImage }: { catalogId: string, currentImage: string }) => {
  const input = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();

  const { close } = useDialogActions();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0]);
    event.target.files = new DataTransfer().files;
  };

  const save = async () => {
    const form = new FormData();

    form.append('file', file);

    await putRequest(`/catalog/edit/image/${catalogId}`, form);

    location.reload();
  };

  return <div className={styles.editcatalogimage}>
    <input ref={input}
           onChange={handleFileSelect}
           type="file"/>
    <FileUploadIcon onClick={() => input.current!.click()}
                    className={styles.editcatalogimage__upload}/>
    <MediaViewItem className={styles.editcatalogimage__preview}
                   mediaUrl={currentImage}
                   file={file}
                   alt="Выберите изображение"/>

    <DialogActions submitDisabled={!isFileImageOrVideo(file)}
                   onClose={close}
                   onSubmit={save}
                   submitLabel="Сохранить"
                   cancelLabel="Отмена"/>
  </div>;
};