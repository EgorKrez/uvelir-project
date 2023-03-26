// 'use client';

import Link from 'next/link';
import { IImage } from '../../../../models/image.model';
import { CloseIcon } from '../../../../svg/close.icon';
import { deleteRequest } from '../../../../utils/axios.utils';
import { useRequestedState } from '../../../../utils/hooks/use-requested-state.hook';
import styles from './product-manager.module.scss';


export default function ProductManagerComponent() {
  const { state, setState } = useRequestedState<IImage[]>({
    initialState: [],
    requestPath: 'product'
  });

  const deleteImage = async (_id: string) => {
    await deleteRequest(`product/${_id}`);

    setState(state.filter(image => image._id !== _id));
  };

  return <div>
    <div className={styles.actions}>
      <Link href="/admin/product/create">Создать продукт</Link>
    </div>

    <div className={styles.imagelist}>
      {state.map(image => <div style={{ backgroundImage: `url(${image.imageUrl})` }}
                                className={styles.image}
                                key={image._id}>
        <img className={styles.image__preview}
             src={image.imageUrl}
             alt={image.description}/>

        <div className={styles.image__title}>
          {image.name || 'Нет названия'}
        </div>
        <div className={styles.image__description}>
          {image.description || 'Нет описания'}
        </div>

        <div onClick={() => deleteImage(image._id)}
             className={styles.delete}>
          <CloseIcon />
        </div>
      </div>)}
    </div>
  </div>;
};

