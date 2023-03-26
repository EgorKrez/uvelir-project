import { useMemo } from 'react';
import { IImage } from '../../../models/image.model';
import defaultImage from '../../../public/image.webp';
import styles from './image-select.module.scss';

export const ImageSelect = (
  { images, onImageSelect, selectedImageId }: {
    images: IImage[],
    selectedImageId: string,
    onImageSelect: (selectedImageId: string) => void
  },
) => {
  const image = useMemo(() => images.find(
    image => image._id === selectedImageId,
  ), [selectedImageId]);

  return <div className={styles.select}>
    <select className={styles.select}
            value={selectedImageId}
            onChange={e => onImageSelect(e.target.value)}>
      {images.map(image =>
        <option value={image._id}
                key={image._id}>
          {image.name || 'Без имени'}
        </option>,
      )}
    </select>

    <div className={styles.image}
         style={{ backgroundImage: `url(${image?.imageUrl || defaultImage})` }}/>
  </div>;
};