import React, { useMemo } from 'react';
import styles from './product-tags-mobile.module.scss';
import { reduceTags } from '../../../../utils/tags.utils';
import { IProductsTagsTableProps } from '../product-tags.component';

export const ProductTagsTableMobile = ({ tags }: IProductsTagsTableProps) => {
    const t = useMemo(() => reduceTags(tags), [tags]);
    const titles = useMemo(() => Object.keys(t), [t]);
    const values = useMemo(() => Object.values(t), [t]);

    return (
        <div className={styles.productpage__mobile__tags_container}>
            <div className={styles.productpage__mobile__tags_titles}>
                {titles.map(title => <div key={title}>{title}</div>)}
            </div>

            <div className={styles.productpage__mobile__tags_values}>
                {values.map((valueVariant, index) =>
                    <div key={index}>{valueVariant.join(' , ')}</div>,
                )}
            </div>
        </div>
    );
};

