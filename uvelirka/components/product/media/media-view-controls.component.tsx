import { IValueCallback } from '../../../models/common.model';
import { range } from '../../../utils/range.utils';
import styles from './media-view-controls.module.scss';

interface IMediaViewControlsProps {
  readonly count: number;
  readonly selected: number;
  readonly onSelect: IValueCallback<number>;
  readonly progress: number;
}

export function MediaViewControls(
  { count, selected, onSelect, progress }: IMediaViewControlsProps,
) {
  return <div className={styles.mediaviewcontrols}>
    {range(0, count - 1).map(item =>
      <div key={item}
           onMouseEnter={() => onSelect(item)}
           className={styles.mediaviewcontrols__itemcontainer}>
       <div className={styles.mediaviewcontrols__item}>
         {item === selected && <div style={{ left: `${progress}%` }}
                                    className={styles.mediaviewcontrols__itemoverlay}/>}
       </div>
      </div>,
    )}
  </div>;
}