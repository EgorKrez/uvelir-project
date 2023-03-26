import { IProduct } from '../../models/product.model';
import { productPath } from '../../utils/path.utils';
import styles from './product-item.module.scss';

interface IProductItemProps {
  readonly product: IProduct;
}

export const ProductItem = ({ product }: IProductItemProps) => {
  return <a className={styles.productitem}
            href={productPath(product._id)}>
    <div className={styles.productitem__imagewrapper}>
      <img className={styles.productitem__image}
           // src="https://storage.googleapis.com/lamp-chat.appspot.com/amswLxDrf5_kapra.jpg"
        src={product.mediaUrls[0]}
           alt={product.name}/>
      <div className={styles.productitem__imagewrapperoverlay}/>
    </div>

    <div className={styles.productitem__name}>
      {product.name}
    </div>

    <div className={styles.productitem__pricecontainer}>
      <div className={styles.productitem__price}>
        {product.price} <span>₽</span>
      </div>
    </div>
  </a>;
};