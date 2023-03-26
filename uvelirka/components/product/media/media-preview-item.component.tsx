import { useMemo } from 'react';
import { IPropsWithClassname } from '../../../models/common.model';
import { c } from '../../../utils/classname.utils';
import { isFileImage, isFileImageOrVideo, isFileVideo, isImageUrl, isVideoUrl } from '../../../utils/media.utils';
import styles from './media-preview-item.module.scss';
import noImage from '../../../public/image.webp';

export interface IMediaViewItemProps extends IPropsWithClassname {
  readonly mediaUrl: string;
  readonly alt: string;
  readonly file?: File;
}

export function MediaViewItem({ mediaUrl, alt, file, className }: IMediaViewItemProps) {
  const fileUrl = useMemo(() => file && URL.createObjectURL(file), [file]);

  const placeholder = <img className={c(styles.image, className)}
                           src={noImage.src}
                           alt={alt}/>;

  if (file && !isFileImageOrVideo(file)) {
    return placeholder
  }

  if (isFileImage(file) || isImageUrl(mediaUrl)) {
    return <img className={c(styles.image, className)}
                  src={fileUrl || mediaUrl}
                  alt={alt}/>;
  }

  if (isFileVideo(file) || isVideoUrl(mediaUrl)) {
    return <video className={c(className)} controls={false}
                  autoPlay={true}>
      <source src={fileUrl || mediaUrl}/>
    </video>;
  }

  return placeholder;
}
