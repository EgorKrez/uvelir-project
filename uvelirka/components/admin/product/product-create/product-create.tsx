// 'use client'

import FormData from 'form-data';
import { ChangeEvent, useState } from 'react';
import { IImage } from '../../../../models/image.model';
import defaultImage from '../../../../public/image.webp';
import { postRequest } from '../../../../utils/axios.utils';
import { DialogActions } from '../../../common/dialog/dialog.component';
import styles from './product-create.module.scss';
import { ProductGenerator } from '../product-generator.component';


function handleInputChange(setState: (value: any) => unknown) {
  return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState(event.target.value);
  };
}

export default function ProductCreate() {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File>();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const onSaveClick = async () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    const product = await postRequest<FormData, IImage>('product', formData);
  };

  return <div>
    <ProductGenerator />

    <div className={styles.imagecreate__container}>
      <div className={styles.imagecreate__form}>
        <input onChange={onChange}
               type="file"
               placeholder="Выберите изображение"/>
        <input onChange={handleInputChange(setName)}
               type="text"
               placeholder="Имя изображения"/>
        <textarea onChange={handleInputChange(setDescription)}
                  rows={7}
                  placeholder="Описание изображения"></textarea>
      </div>

      {<img className={styles.imagecreate__image}
            src={imageUrl || defaultImage.src}/>}
    </div>

    <DialogActions onClose={() => void 0}
                   onSubmit={onSaveClick}
                   submitLabel="Сохранить"
                   cancelLabel="Отменить"/>
  </div>;
};