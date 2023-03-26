import { useState } from 'react';
import { IPropsWithClassname } from '../../../models/common.model';
import { c } from '../../../utils/classname.utils';
import { useProgress } from '../../../utils/hooks/use-progress.hook';
import { IMediaViewItemProps, MediaViewItem } from './media-preview-item.component';
import styles from './media-preview.module.scss';
import { MediaViewControls } from './media-view-controls.component';

interface IMediaViewProps extends IPropsWithClassname {
  items: IMediaViewItemProps[];
}

export function MediaView({ items, className }: IMediaViewProps) {
  const [hovered, setHovered] = useState(false);
  const { progress, selected, setSelected, setProgress } = useProgress(0.5, 50, items.length, hovered);

  return <div onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={c(styles.mediapreview, className)}>
    <div style={{ transform: `translateX(-${selected * 100}%)` }}
         className={styles.mediapreview__rail}>
      {items.map((item, index) =>
        <MediaViewItem key={index}
                       mediaUrl={item.mediaUrl}
                       alt={item.alt}/>,
      )}
    </div>
    <div className={styles.mediapreview__controls}>
      <MediaViewControls count={items.length}
                         selected={selected}
                         onSelect={item => {
                           setSelected(item);
                           setProgress(0);
                         }}
                         progress={progress}/>
    </div>
  </div>;
}
