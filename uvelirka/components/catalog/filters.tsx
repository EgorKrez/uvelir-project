import { IProductTagVariant } from '../../models/product-tag-variant.model';
import { FilterTagVariant } from './filter-tag-variant.component';
import styles from './filters.module.scss';

interface IFiltersProps {
  readonly tags: IProductTagVariant[];
  readonly currentUrl: string;
}

export function Filters(
  { tags, currentUrl }: IFiltersProps,
) {
  return <div className={styles.filters}>
    {tags.map(tag =>
      <div key={tag.name}
           className={styles.filter}>
        <div className={styles.filter__header}>
          {tag.name}
        </div>

        {tag.values.map(tagVariant =>
          <FilterTagVariant key={tagVariant}
                            name={tag.name}
                            value={tagVariant}
                            currentUrl={currentUrl}/>,
        )}
      </div>,
    )}
  </div>;
}