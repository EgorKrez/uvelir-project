import { useMemo } from 'react';
import { ITag } from '../../../models/tag.model';
import styles from './product-tags.module.scss';
import { reduceTags } from '../../../utils/tags.utils';

export interface IProductsTagsTableProps {
    tags: ITag[];
}

export const ProductTagsTable = ({ tags }: IProductsTagsTableProps) => {
    const t = useMemo(() => reduceTags(tags), [tags]);
    const titles = useMemo(() => Object.keys(t), [t]);
    const values = useMemo(() => Object.values(t), [t]);

    return (
        <div className={styles.productpage__tags_container}>
            <div className={styles.productpage__tags_titles}>
                {titles.map(title => <div key={title}>{title}</div>)}
            </div>

            <div className={styles.productpage__tags_values}>
                {values.map((valueVariant, index) =>
                    <div key={index}>{valueVariant.join(' , ')}</div>,
                )}
            </div>
        </div>
    );
};